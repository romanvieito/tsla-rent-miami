import Mixpanel from 'mixpanel';

let mixpanel: Mixpanel.Mixpanel | null = null;

const initMixpanelServer = () => {
  if (!mixpanel) {
    const token = process.env.MIXPANEL_TOKEN;

    if (!token) {
      console.warn('Server-side Mixpanel token not found. Please set MIXPANEL_TOKEN environment variable.');
      return;
    }

    mixpanel = Mixpanel.init(token);
  }
  return mixpanel;
};

export const trackServerEvent = (eventName: string, properties?: Record<string, any>, distinctId?: string) => {
  const instance = initMixpanelServer();
  if (instance) {
    try {
      if (distinctId) {
        instance.track(eventName, {
          distinct_id: distinctId,
          ...properties,
        });
      } else {
        if (properties) {
          instance.track(eventName, properties);
        } else {
          instance.track(eventName);
        }
      }
    } catch (error) {
      console.error('Server-side Mixpanel tracking error:', error);
    }
  }
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
  trackServerEvent('Booking Created', {
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
  trackServerEvent('Payment Session Created', {
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
  trackServerEvent('Payment Verified', {
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
  trackServerEvent('Webhook Received', {
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
  trackServerEvent('Payment Completed Server', {
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
  trackServerEvent('API Error', {
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
  trackServerEvent('Notification Sent', {
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
  trackServerEvent('Location API Call', {
    endpoint: apiData.endpoint,
    query: apiData.query,
    result_count: apiData.resultCount,
    user_email: apiData.userEmail,
  }, apiData.userEmail);
};
