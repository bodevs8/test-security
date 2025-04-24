'use client';

import type { UserData } from '@/types/auth';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigaton-menu';
import { HEADER_MENU_ITEMS } from '@/constant/app';
import { GUIDELINE_LINKS } from '@/constant/guidelines/guideline';
import { AccountLinkEnum } from '@/enums';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { HeaderMenuItem } from './HeaderMenuItem';

type HeaderMenuProps = {
  isMobile: boolean;
  isIpad?: boolean;
  user: UserData;
};

export const HeaderMenu = ({ isMobile, isIpad, user }: HeaderMenuProps) => {
  const pathname = usePathname();
  const menuListRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (menuListRef.current) {
      const activeItem = menuListRef.current.querySelector('.active');
      if (activeItem) {
        activeItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [pathname]);

  const isHideHeader = useMemo(() => {
    const hideHeaderPaths = [
      ...Object.values(AccountLinkEnum),
      ...Object.values(GUIDELINE_LINKS),
    ];

    return hideHeaderPaths.some(
      (path) => pathname.includes(path) || path === pathname,
    );
  }, [pathname]);

  return (
    <div className="sub-menu-container">
      <NavigationMenu
        viewportClassName="fixed top-[90px]"
        className={clsx('sub-menu header-menu', {
          '!hidden': isHideHeader && isMobile,
        })}
        viewportWrapperClassName="sub-menu__wrapper max-lg:hidden"
        onValueChange={(value) => setIsOpen(!!value)}
      >
        <NavigationMenuList
          className="overflow-x-auto hide-scrollbar -ml-3 lg:ml-0 pl-3 lg:pl-0 pr-[24px] lg:pr-0 max-xl:px-1"
          ref={menuListRef as any}
        >
          {HEADER_MENU_ITEMS.map((item, index) => {
            const isActive =
              pathname === item.to ||
              item.activeRoutes?.some((route) => pathname.includes(route)) ||
              item.children?.some((child) => child.to === pathname);
            return (
              <HeaderMenuItem
                key={item.id}
                item={item}
                index={index}
                isMobile={isMobile}
                isIpad={isIpad}
                isActive={isActive}
                isHidden={item.showOnLoggedIn && !user}
              />
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      {isOpen && (
        <div
          className={clsx('overlay fixed top-[95px] inset-0 0 z-[1]', {
            '!hidden': isHideHeader && isMobile,
          })}
        />
      )}
    </div>
  );
};
