'use client';

import type { WithDrawMethodEnum } from '@/enums/withdraw';
import { TabLineMenu } from '@/components/TabLineMenu';
import { WITHDRAW_MENU } from '@/constant/app';
import { AccountLinkEnum, CategoryTypeEnum, TabVariantEnum } from '@/enums';
import { useWithdrawContext } from '@/hooks/contexts';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const TopMenuWithdraw = () => {
  const t = useTranslations();
  const { isMaintainWithdraw } = useWithdrawContext();
  const currentPath = usePathname();
  const router = useRouter();

  const defaultActive = useMemo(() => {
    return WITHDRAW_MENU.find((item) => item.url === currentPath)?.id;
  }, [currentPath]);

  const transformedAccountMenu = useMemo(() => {
    return WITHDRAW_MENU.map((item) => {
      const isMaintained = isMaintainWithdraw[item.id as WithDrawMethodEnum];
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
  }, [t, isMaintainWithdraw]);

  useEffect(() => {
    const currentItem = transformedAccountMenu.find(
      (item) => item.href === currentPath,
    );

    if (currentPath === AccountLinkEnum.Withdraw || currentItem?.disabled) {
      const firstEnabledItem = transformedAccountMenu.find(
        (item) => !item.disabled,
      );
      if (firstEnabledItem) {
        router.push(firstEnabledItem.href);
      }
    }
  }, [currentPath, transformedAccountMenu, router]);

  return (
    <div>
      <TabLineMenu
        items={transformedAccountMenu}
        variant={TabVariantEnum.Gradient}
        className="!h-11"
        tabClassName="!h-11"
        defaultActive={defaultActive}
        tagClassName="!text-[8px] !leading-[14px]"
        isFillContainer
      />
    </div>
  );
};

export { TopMenuWithdraw };
