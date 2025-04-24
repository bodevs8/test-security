'use client';

import { useMediaQuery } from './use-media-query';

export const SCREEN_BREAKPOINTS = {
  MOBILE: '(max-width: 767px)',
  TABLET: '(min-width: 768px) and (max-width: 1023px)',
  DESKTOP: '(min-width: 1024px)',
  LARGE_DESKTOP: '(min-width: 1280px)',
  IPAD: '(min-device-width: 768px) and (max-device-width: 1024px)',
} as const;

export function useDevice() {
  const isMobile = useMediaQuery(SCREEN_BREAKPOINTS.MOBILE);
  const isTablet = useMediaQuery(SCREEN_BREAKPOINTS.TABLET);
  const isDesktop = useMediaQuery(SCREEN_BREAKPOINTS.DESKTOP);
  const isLargeDesktop = useMediaQuery(SCREEN_BREAKPOINTS.LARGE_DESKTOP);
  const isIpad =
    useMediaQuery(SCREEN_BREAKPOINTS.IPAD) ||
    (typeof window !== 'undefined' &&
      /iPad|Macintosh/i.test(window.navigator.userAgent) &&
      window.navigator.maxTouchPoints > 1);

  const isAndroid =
    typeof window !== 'undefined' &&
    /Android/i.test(window.navigator.userAgent);
  const isIOS =
    typeof window !== 'undefined' &&
    (/iPhone|iPad|iPod/i.test(window.navigator.userAgent) ||
      (/Mac/i.test(window.navigator.userAgent) &&
        window.navigator.maxTouchPoints > 1));
  const isWindows =
    typeof window !== 'undefined' && /Win/i.test(window.navigator.userAgent);
  const isMac =
    typeof window !== 'undefined' &&
    /Mac/i.test(window.navigator.userAgent) &&
    window.navigator.maxTouchPoints <= 1;

  return {
    isMobile,
    isTablet: isTablet || isIpad,
    isDesktop: (isDesktop || isLargeDesktop) && !isIpad,
    isLargeDesktop,
    isIpad,
    isAndroid,
    isIOS,
    isWindows,
    isMac,
  };
}
