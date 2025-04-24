import { TrackingEventNameEnum } from '@/enums';
import { useUserStore } from '@/hooks/stores';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useTrackingEvent } from './use-tracking-event';

export const useTrackingSignup = () => {
  const getUserId = useUserStore((state) => state.getUserId);
  const searchParams = useSearchParams();
  const { trackEvent } = useTrackingEvent();

  const userId = useMemo(() => getUserId(), [getUserId]);

  const trackSignUpInitiated = useCallback(() => {
    const params = {
      user_id: userId,
      referral_source: searchParams.get('utm_source'),
    };
    trackEvent(TrackingEventNameEnum.SignUpInitiated, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const trackSignUpCompleted = useCallback(
    (userId?: string | number) => {
      const params = {
        user_id: userId || userId,
      };
      trackEvent(TrackingEventNameEnum.SignUpCompleted, params);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId],
  );

  return {
    trackSignUpInitiated,
    trackSignUpCompleted,
  };
};
