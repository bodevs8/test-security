import { TRACKING_PARAMS } from '@/constant/affiliate';

export const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
};

export const getGACookie = () => {
  return getCookie('_ga');
};

export const getTrackingParams = () => {
  const trackingParams: Record<string, string> = {};
  TRACKING_PARAMS.forEach((param) => {
    const value = getCookie(param);
    if (value) {
      trackingParams[param] = value;
    }
  });
  return trackingParams;
};
