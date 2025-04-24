import type { TrackingTimeSpentOnPageParams } from '@/types/tracking';
import { TIMEOUT_TRACKING_EVENT } from '@/constant/app';
import { TrackingEventNameEnum } from '@/enums';
import { useUserStore } from '@/hooks/stores';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { useTrackingEvent } from './use-tracking-event';

export const useTrackingPage = () => {
  const { trackEvent } = useTrackingEvent();
  const getUserId = useUserStore((state) => state.getUserId);
  const pathname = usePathname();

  const userId = useMemo(() => getUserId(), [getUserId]);

  const trackingTimeSpentOnPage = useCallback(
    (values: TrackingTimeSpentOnPageParams) => {
      const params = {
        user_id: userId,
        page_url: values.pageUrl,
        time_spent: values.timeSpent,
      };
      trackEvent(TrackingEventNameEnum.TimeSpentOnPage, params);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId],
  );

  const trackingPageView = useCallback(() => {
    const params = {
      user_id: userId,
      page_url: window.location.href,
    };
    trackEvent(TrackingEventNameEnum.PageView, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    const enterTime = Date.now();

    // Track page view when component mounts
    const timeout = setTimeout(() => {
      trackingPageView();
    }, TIMEOUT_TRACKING_EVENT);

    // Track time spent when component unmounts or page is closed
    const stopTracking = () => {
      const timeSpent = (Date.now() - enterTime) / 1000; // Time spent in seconds
      trackingTimeSpentOnPage({
        pageUrl: window.location.href,
        timeSpent,
      });
    };

    // Handle page unload
    window.addEventListener('beforeunload', stopTracking);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', stopTracking);
      stopTracking();
      clearTimeout(timeout);
    };
  }, [trackingPageView, trackingTimeSpentOnPage, pathname]);
};
