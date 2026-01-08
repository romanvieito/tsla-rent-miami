import mixpanel from 'mixpanel-browser';

let isInitialized = false;

const isDev = process.env.NODE_ENV === 'development';

export const initMixpanel = () => {
  if (typeof window !== 'undefined' && !isInitialized) {
    const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

    if (!token) {
      console.warn('Mixpanel token not found. Please set NEXT_PUBLIC_MIXPANEL_TOKEN environment variable.');
      return;
    }

    try {
      mixpanel.init(token, {
        debug: process.env.NODE_ENV === 'development',
        track_pageview: false, // We'll handle page views manually
        persistence: 'localStorage'
      });
      isInitialized = true;
      if (isDev) console.log('Mixpanel initialized');
    } catch (error) {
      console.error('Mixpanel initialization failed:', error);
    }
  }
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && isInitialized) {
    try {
      mixpanel.track(eventName, properties);
      if (isDev) console.log('Mixpanel track:', eventName, properties);
    } catch (error) {
      console.error('Mixpanel tracking failed:', eventName, error);
    }
  } else {
    if (isDev) console.warn('Mixpanel not initialized; skipped event:', eventName);
  }
};

export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  trackEvent('Page View', {
    page: pageName,
    ...properties
  });
};

export const identifyUser = (userId: string, userProperties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && isInitialized) {
    mixpanel.identify(userId);
    if (userProperties) {
      mixpanel.people.set(userProperties);
    }
  }
};

export const trackCarSelection = (carId: number | string, carName: string) => {
  trackEvent('Car Selected', {
    car_id: carId,
    car_name: carName
  });
};

export const trackFormSubmission = (formType: string, formData?: Record<string, any>) => {
  trackEvent('Form Submitted', {
    form_type: formType,
    ...formData
  });
};

export const trackBookingInquiry = (bookingData: {
  car_id: number | string;
  car_name: string;
  start_date: string;
  end_date: string;
  pickup_location: string;
  dropoff_location: string;
  contact_info?: {
    name: string;
    email: string;
    phone: string;
  };
}) => {
  trackEvent('Booking Inquiry', bookingData);
};

export const trackPaymentInitiated = (totalAmount: number, depositAmount?: number) => {
  trackEvent('Payment Initiated', {
    total_amount: totalAmount,
    deposit_amount: depositAmount || Math.max(50, Math.round(totalAmount * 0.25)),
    currency: 'USD'
  });
};

export const trackPaymentCompleted = (totalAmount: number, paidAmount: number) => {
  trackEvent('Payment Completed', {
    total_amount: totalAmount,
    paid_amount: paidAmount,
    remaining_balance: totalAmount - paidAmount,
    currency: 'USD'
  });
};

export const trackNavigation = (fromPage: string, toPage: string) => {
  trackEvent('Navigation', {
    from_page: fromPage,
    to_page: toPage
  });
};
