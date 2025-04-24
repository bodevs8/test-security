'use client';
import { useDevice } from './use-device';

export const useLiveChat = () => {
  const { isDesktop } = useDevice();

  const openLiveChat = () => {
    if (isDesktop) {
      const newWindow: any = window;
      newWindow.LiveChatWidget?.call('maximize');
    } else {
      const openNewTab = window.open('about:blank', '_blank');
      if (openNewTab) {
        openNewTab.location.href = process.env.NEXT_PUBLIC_LIVE_CHAT_LINK ?? '';
      }
    }
  };

  return { openLiveChat };
};
