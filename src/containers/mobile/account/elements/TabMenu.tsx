'use client';

import { TabLineMenu } from '@/components/TabLineMenu';
import { ACCOUNT_SIDE_MENU } from '@/constant/menu';
import { TabVariantEnum } from '@/enums';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const TabMenu = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);

  useEffect(() => {
    const activeItem = ACCOUNT_SIDE_MENU.find(
      (item) => item.id === pathname || pathname.startsWith(item.id),
    );
    if (activeItem) {
      setActive(activeItem.id);
    }
  }, [pathname]);

  const transformedAccountMenu = useMemo(() => {
    return ACCOUNT_SIDE_MENU.map((item) => ({
      id: item.id,
      title: t(item.label),
      href: item.url,
      iconPath: item.icon,
      iconPathActive: item.iconActive,
    }));
  }, [t]);

  return (
    <div className="w-full h-fit fixed top-[50px] z-[4] border-t border-neutral-400 bg-primary-light-0">
      <TabLineMenu
        items={transformedAccountMenu}
        defaultActive={active}
        className="!bg-primary-light-0"
        titleClassName="leading-[140%] !text-[14px] font-medium !capitalize"
        tabClassName="px-3 !h-[40px] !pt-1"
        isFillContainer={false}
        variant={TabVariantEnum.Gradient}
        isMobile
      />
    </div>
  );
};

export default TabMenu;
