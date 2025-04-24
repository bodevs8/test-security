import type { TrackingProfileCompletionParams } from '@/types/tracking';
import { TrackingEventNameEnum } from '@/enums';
import { useUserStore } from '@/hooks/stores';
import { useCallback, useMemo } from 'react';
import { useTrackingEvent } from './use-tracking-event';

export const useTrackingProfile = () => {
  const getUserId = useUserStore((state) => state.getUserId);
  const { trackEvent } = useTrackingEvent();

  const userId = useMemo(() => getUserId(), [getUserId]);

  const calculateProfileCompletion = useCallback(
    (data: TrackingProfileCompletionParams) => {
      const criteria = [
        {
          key: 'Email',
          condition: data.hasEmail,
          weight: 0.1,
        },
        {
          key: 'OwnerBanks',
          condition: data.hasUserBanks,
          weight: 0.9,
        },
      ];

      const totalWeight = criteria.reduce((sum, { weight }) => sum + weight, 0);
      const achievedWeight = criteria.reduce(
        (sum, { condition, weight }) => sum + (condition ? weight : 0),
        0,
      );

      return totalWeight > 0 ? (achievedWeight / totalWeight) * 100 : 0;
    },
    [],
  );

  const trackProfileCompletion = useCallback(
    async (data: TrackingProfileCompletionParams) => {
      const params = {
        user_id: data.userId || userId,
        profile_completion_percentage: calculateProfileCompletion(data),
      };
      trackEvent(TrackingEventNameEnum.ProfileCompletion, params);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId, calculateProfileCompletion],
  );

  const trackLogin = useCallback(() => {
    const params = {
      user_id: userId,
    };
    trackEvent(TrackingEventNameEnum.Login, params);
  }, [userId, trackEvent]);

  return {
    trackProfileCompletion,
    trackLogin,
  };
};
