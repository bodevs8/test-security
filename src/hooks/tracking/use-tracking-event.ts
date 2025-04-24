import { sendGAEvent } from '@next/third-parties/google';

export const useTrackingEvent = () => {
  const trackEvent = (eventName: string, params: Record<string, any>) => {
    const timestamp = new Date().toISOString();

    sendGAEvent('event', eventName, {
      ...params,
      userId: params.user_id,
      timestamp,
    });
  };

  return { trackEvent };
};
