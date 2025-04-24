import type { TrackingButtonClickParams } from '@/types/tracking';
import { TrackingEventNameEnum } from '@/enums';
import { useUserStore } from '@/hooks/stores';
import { useTrackingEvent } from './use-tracking-event';

export const useTrackingButton = () => {
  const { trackEvent } = useTrackingEvent();
  const getUserId = useUserStore((state) => state.getUserId);

  const trackButtonClick = (values: TrackingButtonClickParams) => {
    const params = {
      user_id: getUserId(),
      button_id: values.buttonId,
      button_name: values.buttonName,
      page_url: window.location.href,
    };
    trackEvent(TrackingEventNameEnum.ButtonClick, params);
  };

  return { trackButtonClick };
};
