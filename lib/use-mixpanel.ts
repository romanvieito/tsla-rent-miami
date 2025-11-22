import { useEffect } from 'react';
import { initMixpanel, trackPageView } from './mixpanel';

export const useMixpanel = () => {
  useEffect(() => {
    initMixpanel();
  }, []);
};

export const usePageTracking = (pageName: string, properties?: Record<string, any>) => {
  useEffect(() => {
    // Track page view on component mount
    trackPageView(pageName, properties);
  }, [pageName, properties]);
};
