import type { TrackingPromotionParams } from '@/types/tracking';
import { TrackingEventNameEnum } from '@/enums';
import { useUserStore } from '@/hooks/stores';
import { useCallback } from 'react';
import { useTrackingEvent } from './use-tracking-event';

export const useTrackingPromotion = () => {
  const { trackEvent } = useTrackingEvent();
  const getUserId = useUserStore((state) => state.getUserId);

  const trackPromotionViewed = useCallback(
    (values: TrackingPromotionParams) => {
      const userId = getUserId();
      if (userId) {
        const params = {
          user_id: userId,
          promotion_id: values.promotionId,
          promotion_name: values.promotionName,
        };
        trackEvent(TrackingEventNameEnum.PromotionViewed, params);
      }
    },
    [getUserId, trackEvent],
  );

  const trackPromotionClicked = useCallback(
    (values: TrackingPromotionParams) => {
      const userId = getUserId();
      if (userId) {
        const params = {
          user_id: userId,
          promotion_id: values.promotionId,
          promotion_name: values.promotionName,
        };
        trackEvent(TrackingEventNameEnum.PromotionClicked, params);
      }
    },
    [getUserId, trackEvent],
  );

  return {
    trackPromotionViewed,
    trackPromotionClicked,
  };
};
