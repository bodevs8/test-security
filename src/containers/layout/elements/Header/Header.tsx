import type { UserData } from '@/types/auth';
import { Logo } from '@/components/Logo';
import { TOP_MENU_ITEMS } from '@/constant/app';
import { LogoSizeEnum } from '@/enums';
import LogoMobile from '@/public/logo-mb.webp';
import clsx from 'clsx';
import { HeaderCarousel } from './HeaderCarousel';
import { HeaderMenu } from './HeaderMenu';
import { HeaderMenuLink } from './HeaderMenuLink';
import { HeaderModals } from './HeaderModals';
import { HeaderRightMenu } from './HeaderRightMenu';
import { HeaderSearch } from './HeaderSearch';
import { HeaderSearchMobile } from './HeaderSearchMobile';

type AppHeaderProps = {
  isMobile?: boolean;
  isIpad?: boolean;
  user?: UserData;
};

const AppHeader = async ({ isMobile, isIpad, user }: AppHeaderProps) => {
  return (
    <div>
      <div className="fixed top-0 z-[51] w-full bg-primary-light-0">
        <div
          className={clsx('flex h-[50px] lg:h-[56px]', {
            'pr-3 gap-2': isMobile,
            'container-full gap-4 !px-3': !isMobile,
          })}
        >
          <div
            className={clsx('h-full items-center', {
              'gap-1': isMobile,
              'flex md:flex-[1_0_auto] gap-2 2xl:gap-10 md:py-[10px]':
                !isMobile,
            })}
          >
            <Logo
              size={isMobile ? LogoSizeEnum.XSmall : LogoSizeEnum.Regular}
              logoSrc={isMobile ? LogoMobile : undefined}
              logoClassName={clsx('h-full w-auto', {
                'aspect-[126/50]': isMobile,
                'aspect-[122/36]': !isMobile,
              })}
              linkClassName={clsx('!block !h-full')}
            />

            <div className="gap-4 xl:gap-5 2xl:gap-[27px] ml-2 hidden md:flex">
              <HeaderMenuLink items={TOP_MENU_ITEMS} isMobile={isMobile} />
            </div>
          </div>

          <div className="flex flex-grow justify-end gap-2 items-center">
            <div className="lg:flex lg:items-center">
              <HeaderSearch />
            </div>
            <HeaderRightMenu user={user} isMobile={isMobile} />
          </div>
        </div>
        {/* todo: temporarily hide to avoid ugliness */}
        {!isMobile && (
          <div className="container-full bg-cta-primary h-10">
            <HeaderMenu isMobile={isMobile!} isIpad={isIpad} user={user!} />
          </div>
        )}

        <HeaderSearchMobile />
      </div>
      <HeaderCarousel isMobile={isMobile} />
      <HeaderModals user={user!} isMobile={isMobile} isIpad={isIpad} />
    </div>
  );
};

export default AppHeader;
