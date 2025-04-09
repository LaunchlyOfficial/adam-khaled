import { useCallback } from 'react';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../config/firebase';

export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, eventParams?: { [key: string]: any }) => {
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    }
  }, []);

  return { trackEvent };
}