import { useCallback } from 'react';
import { logEvent, Analytics } from 'firebase/analytics';
import { analytics } from '../config/firebase';

type EventParams = {
  [key: string]: string | number | boolean | null | undefined;
};

export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, eventParams?: EventParams) => {
    if (analytics) {
      logEvent(analytics as Analytics, eventName, eventParams);
    }
  }, []);

  return { trackEvent };
}