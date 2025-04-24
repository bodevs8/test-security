import type { TrackingGameStartedParams } from '@/types/tracking';
import { TrackingEventNameEnum } from '@/enums';
import { useUserStore } from '@/hooks/stores';
import { useTrackingEvent } from './use-tracking-event';

export const useTrackingGame = () => {
  const { trackEvent } = useTrackingEvent();
  const getUserId = useUserStore((state) => state.getUserId);

  const trackGameStarted = (values: TrackingGameStartedParams) => {
    const params = {
      user_id: getUserId(),
      game_id: values.gameId,
      game_type: values.gameType,
      game_name: values.gameName,
    };
    trackEvent(TrackingEventNameEnum.GameStarted, params);
  };

  return { trackGameStarted };
};
