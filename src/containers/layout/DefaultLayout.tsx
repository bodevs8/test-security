import type { UserData } from '@/types/auth';
import { getDeviceInfo } from '@/utils/device';
import AppFooter from './elements/Footer';
import AppHeader from './elements/Header/Header';
import BottomMenu from './elements/MobileMenu/BottomMenu';

type DefaultLayoutProps = {
  children?: React.ReactNode;
  user?: UserData;
};

export const DefaultLayout = async ({ children, user }: DefaultLayoutProps) => {
  const { isMobile, isIpad } = await getDeviceInfo();

  return (
    <>
      <AppHeader isMobile={isMobile} isIpad={isIpad} user={user} />
      {children}
      {!isMobile && <AppFooter />}
      {isMobile && <BottomMenu />}
    </>
  );
};
