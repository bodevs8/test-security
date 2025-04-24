'use client';

import { useDevice } from './use-device';

export function useTelegramDownload() {
  const { isAndroid, isIOS, isMac } = useDevice();

  const getDownloadLink = () => {
    if (isAndroid)
      return (
        process.env.NEXT_PUBLIC_LINK_DOWNLOAD_ANDROID ||
        'https://telegram.org/dl/android'
      );
    if (isIOS)
      return (
        process.env.NEXT_PUBLIC_LINK_DOWNLOAD_IOS ||
        'https://telegram.org/dl/ios'
      );
    if (isMac)
      return (
        process.env.NEXT_PUBLIC_LINK_DOWNLOAD_MAC ||
        'https://macos.telegram.org'
      );
    // Default to Windows link
    return (
      process.env.NEXT_PUBLIC_LINK_DOWNLOAD_WINDOWS ||
      'https://desktop.telegram.org'
    );
  };

  const downloadLinks = {
    WINDOWS:
      process.env.NEXT_PUBLIC_LINK_DOWNLOAD_WINDOWS ||
      'https://desktop.telegram.org',
    MAC:
      process.env.NEXT_PUBLIC_LINK_DOWNLOAD_MAC || 'https://macos.telegram.org',
    IOS:
      process.env.NEXT_PUBLIC_LINK_DOWNLOAD_IOS ||
      'https://telegram.org/dl/ios',
    ANDROID:
      process.env.NEXT_PUBLIC_LINK_DOWNLOAD_ANDROID ||
      'https://telegram.org/dl/android',
  };

  return {
    downloadLink: getDownloadLink(),
    downloadLinks,
  };
}
