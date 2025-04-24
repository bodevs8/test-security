import type { DeviceInfo } from '@/types/app';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

export const isOldPhoneDevice = (
  userAgentStr: string,
  osInfo: { name?: string; version?: string },
): boolean => {
  // Extract OS versions if available
  const osName = osInfo.name?.toLowerCase() || '';
  const osVersion = osInfo.version || '';
  const osVersionNumber = Number.parseFloat(osVersion);

  // Detect older Android devices (Android 9 or lower)
  if (osName === 'android' && osVersionNumber > 0 && osVersionNumber < 10) {
    return true;
  }

  // Detect older iOS devices (iOS 12 or lower)
  if (osName === 'ios' && osVersionNumber > 0 && osVersionNumber < 13) {
    return true;
  }

  // Detect specific old device patterns
  const oldDevicePatterns = [
    // Old Samsung devices
    /Samsung.*SM-G9\d{2}/i, // Galaxy S5, S6, etc.
    /Samsung.*SM-J\d{3}/i, // Galaxy J series
    /Samsung.*GT-/i, // Very old Samsung models

    // Old LG devices
    /LG-[A-Z]\d{3}/i, // Old LG models

    // Old Motorola devices
    /moto\s+g(?!\s+power\s+\(202[3-9]\))/i, // Older Moto G models, but not newer ones
    /moto\s+e[1-5]/i, // Moto E models

    // Old HTC devices
    /HTC/i, // Most HTC devices are now considered old

    // Old Sony devices
    /Sony\sXperia\s[A-Z]\d/i, // Older Xperia models

    // Old Huawei devices
    /Huawei\s(Y|P8|P9|Mate\s7|Mate\s8)/i,

    // Old browser engines are a good indicator of old devices
    /Android 4/i,
    /Android 5/i,
    /Android 6/i,
    /Android 7/i,
    /Android 8/i,
    /Android 9/i,
  ];

  // Check against patterns for old devices
  return oldDevicePatterns.some((pattern) => pattern.test(userAgentStr));
};

// Server-side device detection
export async function getDeviceInfo(): Promise<DeviceInfo> {
  const headerRes = await headers();
  const userAgentStr = headerRes.get('user-agent') || '';
  const ua = userAgent({ headers: headerRes });

  // Get browser details
  const browserName = ua.browser?.name?.toLowerCase() || '';
  const deviceType = ua.device?.type || '';
  const osName = ua.os?.name?.toLowerCase() || '';

  // Detect Safari
  const isSafari =
    browserName.includes('safari') && !browserName.includes('chrome');

  // Enhanced iPad detection
  const isIpad =
    // Check device type and OS
    (deviceType === 'tablet' && osName === 'ios') ||
    // Check iPad in user agent (older iPads)
    /ipad/i.test(userAgentStr) ||
    // Check for iPad OS version (newer iPads)
    /iPad/i.test(userAgentStr) ||
    // Check for iPad simulator
    /iPad Simulator/i.test(userAgentStr);

  // Device type checks
  const isMobile = deviceType === 'mobile' || /iPhone|iPod/i.test(userAgentStr);
  const isTablet = deviceType === 'tablet' || isIpad;
  const isDesktop = !isMobile && !isTablet;

  // Check if the device is an old phone
  const isOldPhone = isOldPhoneDevice(userAgentStr, ua.os || {});

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSafari,
    isIpad,
    os: ua.os?.name || '',
    browser: ua.browser?.name || '',
    deviceType: ua.device?.type || '',
    userAgentStr,
    isOldPhone,
  };
}

// Server-side device detection methods
export async function isMobileDevice() {
  const device = await getDeviceInfo();
  return device.isMobile;
}

export async function isTabletDevice() {
  const device = await getDeviceInfo();
  return device.isTablet;
}

export async function isDesktopDevice() {
  const device = await getDeviceInfo();
  return device.isDesktop;
}

export async function isSafariDevice() {
  const device = await getDeviceInfo();
  return device.isSafari;
}

export async function isIpadDevice() {
  const device = await getDeviceInfo();
  return device.isIpad;
}
