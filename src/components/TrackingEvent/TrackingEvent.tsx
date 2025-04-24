'use client';
import { TIMEOUT_TRACKING_EVENT } from '@/constant/app';
import { useTrackingGame } from '@/hooks/tracking';
import { useEffect } from 'react';

type TrackingEventProps = {
  gameId: string;
  gameType: string;
  gameName: string;
};

export const TrackingEvent = ({
  gameId,
  gameType,
  gameName,
}: TrackingEventProps) => {
  const { trackGameStarted } = useTrackingGame();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      trackGameStarted({
        gameId,
        gameType,
        gameName,
      });
    }, TIMEOUT_TRACKING_EVENT);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};
