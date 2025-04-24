import type { AccountMenuItem } from '@/types/app';

const DEVELOPMENT_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.PORT!}`
    : 'http://localhost:3000';
const PRODUCTION_URL = process.env.NEXT_PUBLIC_APP_URL || '';

export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return DEVELOPMENT_URL;
  }

  return PRODUCTION_URL;
};

export const getApiPrefix = () => {
  if (process.env.NEXT_PUBLIC_API_PREFIX) {
    return process.env.NEXT_PUBLIC_API_PREFIX;
  }
  return '/api-main/v1';
};

export const getServerUrl = () => {
  if (process.env.API_BASE_URL) {
    return process.env.API_BASE_URL;
  }
  return DEVELOPMENT_URL;
};

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const formatTime = (time: number) => {
  return String(time).padStart(2, '0').split('');
};

export const scrollToTop = (timeout = 0) => {
  setTimeout(() => {
    window?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, timeout);
};

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const loadNanoPlayer = async () => {
  try {
    if (typeof window === 'undefined' || (window as any).NanoPlayer)
      return (window as any).NanoPlayer;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        process.env.NEXT_PUBLIC_NANO_PLAYER_URL! ||
        'https://tic88.com/assets/js/nanoplayer.4.min.js';
      script.async = true;
      script.onload = () => resolve((window as any).NanoPlayer);
      script.onerror = () => reject(new Error('Failed to load NanoPlayer.'));
      document.head.appendChild(script);
    });
  } catch (error) {
    console.error('Failed to load NanoPlayer', error);
  }
};

export const getIcon = (
  item: AccountMenuItem,
  active: string | null,
  hovered: string | null,
) => {
  if (active === item.id) {
    return item.iconActive ?? item.icon;
  }
  if (hovered === item.id) {
    return item.iconHover ?? item.iconActive ?? item.icon;
  }
  return item.icon;
};
