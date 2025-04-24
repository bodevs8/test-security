import { getDeviceInfo } from '@/utils/device';

type Props = {
  mobile: React.ReactNode;
  desktop: React.ReactNode;
};

export const ResponsiveView = async ({ mobile, desktop }: Props) => {
  const deviceInfo = await getDeviceInfo();

  if (deviceInfo.isMobile) {
    return mobile;
  }

  return desktop;
};
