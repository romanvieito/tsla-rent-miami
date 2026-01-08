import { useEffect } from 'react';
import { initMixpanel, trackPageView } from './mixpanel';

export const useMixpanel = () => {
  useEffect(() => {
    // Only initialize on client side
    if (typeof window !== 'undefined') {
      initMixpanel();
    }
  }, []);
};

export const usePageTracking = (pageName: string, properties?: Record<string, any>) => {
  useEffect(() => {
    // Only track on client side
    if (typeof window !== 'undefined') {
      trackPageView(pageName, properties);
    }
  }, [pageName, properties]);
};
