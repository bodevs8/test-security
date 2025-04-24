'use client';
import { TIMEOUT_TRACKING_EVENT } from '@/constant/app';
import { useTrackingPromotion } from '@/hooks/tracking';
import { useEffect } from 'react';

type TrackingPromotionEventProps = {
  promotionId: string;
  promotionName: string;
};

export const TrackingPromotionEvent = ({
  promotionId,
  promotionName,
}: TrackingPromotionEventProps) => {
  const { trackPromotionViewed } = useTrackingPromotion();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      trackPromotionViewed({
        promotionId,
        promotionName,
      });
    }, TIMEOUT_TRACKING_EVENT);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};
