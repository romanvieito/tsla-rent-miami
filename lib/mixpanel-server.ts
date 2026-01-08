import Mixpanel from 'mixpanel';

let mixpanel: Mixpanel.Mixpanel | null = null;

const initMixpanelServer = () => {
  if (!mixpanel) {
    const token = process.env.MIXPANEL_TOKEN;

    if (!token) {
      console.warn('Server-side Mixpanel token not found. Please set MIXPANEL_TOKEN environment variable.');
      return;
    }

    try {
      mixpanel = Mixpanel.init(token);
    } catch (error) {
      console.error('Server-side Mixpanel initialization failed:', error);
    }
  }
  return mixpanel;
};

const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number): Promise<T | undefined> => {
  let timeoutHandle: NodeJS.Timeout | undefined;
  const timeoutPromise = new Promise<undefined>((resolve) => {
    timeoutHandle = setTimeout(() => resolve(undefined), timeoutMs);
  });
  const result = await Promise.race([promise, timeoutPromise]);
  if (timeoutHandle) clearTimeout(timeoutHandle);
  return result as T | undefined;
};

const trackAsync = (
  instance: Mixpanel.Mixpanel,
  eventName: string,
  properties?: Record<string, any>
): Promise<void> => {
  return new Promise((resolve) => {
    try {
      instance.track(eventName, properties ?? {}, (err?: any) => {
        if (err && process.env.NODE_ENV === 'development') {
          console.error('Server-side Mixpanel track failed:', err);
        }
        resolve();
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Server-side Mixpanel track threw:', error);
      }
      resolve();
    }
  });
};

/**
 * IMPORTANT: In serverless (Vercel), "fire-and-forget" analytics calls may be dropped if the function
 * returns before the outbound request completes. This helper awaits delivery for up to `timeoutMs`.
 */
export const trackServerEvent = async (
  eventName: string,
  properties?: Record<string, any>,
  distinctId?: string,
  timeoutMs: number = 250
): Promise<void> => {
  const instance = initMixpanelServer();
  if (!instance) return;

  const payload: Record<string, any> = distinctId
    ? { distinct_id: distinctId, ...(properties ?? {}) }
    : (properties ?? {});

  await withTimeout(trackAsync(instance, eventName, payload), timeoutMs);
};

export const trackBookingCreated = (bookingData: {
  bookingId: string;
  carId: string;
  carName: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  totalPrice: number;
  depositAmount: number;
  userEmail?: string;
  userName?: string;
}) => {
  return trackServerEvent('Booking Created', {
    booking_id: bookingData.bookingId,
    car_id: bookingData.carId,
    car_name: bookingData.carName,
    start_date: bookingData.startDate,
    end_date: bookingData.endDate,
    pickup_location: bookingData.pickupLocation,
    dropoff_location: bookingData.dropoffLocation,
    total_price: bookingData.totalPrice,
    deposit_amount: bookingData.depositAmount,
    currency: 'USD',
    user_email: bookingData.userEmail,
    user_name: bookingData.userName,
  }, bookingData.userEmail);
};

export const trackPaymentSessionCreated = (sessionData: {
  bookingId: string;
  sessionId: string;
  totalAmount: number;
  depositAmount: number;
  userEmail?: string;
}) => {
  return trackServerEvent('Payment Session Created', {
    booking_id: sessionData.bookingId,
    session_id: sessionData.sessionId,
    total_amount: sessionData.totalAmount,
    deposit_amount: sessionData.depositAmount,
    currency: 'USD',
    user_email: sessionData.userEmail,
  }, sessionData.userEmail);
};

export const trackPaymentVerified = (paymentData: {
  bookingId: string;
  sessionId: string;
  totalAmount: number;
  paidAmount: number;
  paymentStatus: string;
  userEmail?: string;
}) => {
  return trackServerEvent('Payment Verified', {
    booking_id: paymentData.bookingId,
    session_id: paymentData.sessionId,
    total_amount: paymentData.totalAmount,
    paid_amount: paymentData.paidAmount,
    remaining_balance: paymentData.totalAmount - paymentData.paidAmount,
    payment_status: paymentData.paymentStatus,
    currency: 'USD',
    user_email: paymentData.userEmail,
  }, paymentData.userEmail);
};

export const trackWebhookReceived = (webhookData: {
  eventType: string;
  sessionId?: string;
  bookingId?: string;
  amount?: number;
  paymentStatus?: string;
  userEmail?: string;
}) => {
  return trackServerEvent('Webhook Received', {
    event_type: webhookData.eventType,
    session_id: webhookData.sessionId,
    booking_id: webhookData.bookingId,
    amount: webhookData.amount,
    payment_status: webhookData.paymentStatus,
    currency: webhookData.amount ? 'USD' : undefined,
    user_email: webhookData.userEmail,
  }, webhookData.userEmail);
};

export const trackPaymentCompleted = (paymentData: {
  bookingId: string;
  sessionId: string;
  totalAmount: number;
  paidAmount: number;
  userEmail?: string;
  userName?: string;
}) => {
  return trackServerEvent('Payment Completed Server', {
    booking_id: paymentData.bookingId,
    session_id: paymentData.sessionId,
    total_amount: paymentData.totalAmount,
    paid_amount: paymentData.paidAmount,
    remaining_balance: paymentData.totalAmount - paymentData.paidAmount,
    currency: 'USD',
    user_email: paymentData.userEmail,
    user_name: paymentData.userName,
  }, paymentData.userEmail);
};

export const trackApiError = (errorData: {
  endpoint: string;
  error: string;
  statusCode?: number;
  userEmail?: string;
}) => {
  return trackServerEvent('API Error', {
    endpoint: errorData.endpoint,
    error_message: errorData.error,
    status_code: errorData.statusCode,
    user_email: errorData.userEmail,
  }, errorData.userEmail);
};

export const trackNotificationSent = (notificationData: {
  type: string;
  bookingId?: string;
  recipient: string;
  subject?: string;
}) => {
  return trackServerEvent('Notification Sent', {
    notification_type: notificationData.type,
    booking_id: notificationData.bookingId,
    recipient: notificationData.recipient,
    subject: notificationData.subject,
  }, notificationData.recipient);
};

export const trackLocationApiCall = (apiData: {
  endpoint: string;
  query?: string;
  resultCount?: number;
  userEmail?: string;
}) => {
  return trackServerEvent('Location API Call', {
    endpoint: apiData.endpoint,
    query: apiData.query,
    result_count: apiData.resultCount,
    user_email: apiData.userEmail,
  }, apiData.userEmail);
};
