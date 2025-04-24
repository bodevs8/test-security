'use client';

import type { DepositMethodEnum } from '@/enums';
import { TabLineMenu } from '@/components/TabLineMenu';
import { DEPOSIT_MENU } from '@/constant/app';
import { AccountLinkEnum, CategoryTypeEnum, TabVariantEnum } from '@/enums';
import { useDepositContext } from '@/hooks/contexts';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const TopMenu = () => {
  const t = useTranslations();
  const { isMaintainDeposit } = useDepositContext();
  const currentPath = usePathname();
  const router = useRouter();

  const defaultActive = useMemo(() => {
    return DEPOSIT_MENU.find((item) => item.url === currentPath)?.id;
  }, [currentPath]);

  const transformedAccountMenu = useMemo(() => {
    return DEPOSIT_MENU.map((item) => {
      const isMaintained = isMaintainDeposit[item.id as DepositMethodEnum];
      return {
        id: item.id,
        title: t(item.label),
        href: item.url,
        tag: isMaintained ? CategoryTypeEnum.Maintain : item.tag,
        disabled: isMaintained,
      };
    }).sort((a, b) => {
      return a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1;
    });
  }, [t, isMaintainDeposit]);

  useEffect(() => {
    const currentItem = transformedAccountMenu.find(
      (item) => item.href === currentPath,
    );

    if (currentPath === AccountLinkEnum.Deposit || currentItem?.disabled) {
      const firstEnabledItem = transformedAccountMenu.find(
        (item) => !item.disabled,
      );
      if (firstEnabledItem) {
        router.push(firstEnabledItem.href);
      }
    }
  }, [currentPath, transformedAccountMenu, router]);

  return (
    <div className="">
      <TabLineMenu
        items={transformedAccountMenu}
        variant={TabVariantEnum.Gradient}
        className="!h-12"
        tabClassName="!h-12"
        defaultActive={defaultActive}
        isFillContainer
      />
    </div>
  );
};

export default TopMenu;
