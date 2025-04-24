'use client';

import type { WithDrawMethodEnum } from '@/enums/withdraw';
import type { DepositTabItem } from '@/types/deposit';
import { TransactionMenuMobile } from '@/components/TransactionMenuMobile';
import { TransactionSlide } from '@/components/TransactionSlide';
import { WITHDRAW_MENU } from '@/constant/app';
import { AccountLinkEnum, CategoryTypeEnum, WithdrawLinkEnum } from '@/enums';
import { useWithdrawContext } from '@/hooks/contexts';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

const WithdrawContainerMobile = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const { isMaintainWithdraw } = useWithdrawContext();

  const transformedAccountMenu = useMemo(() => {
    return WITHDRAW_MENU.map((item) => {
      const isMaintained = isMaintainWithdraw[item.id as WithDrawMethodEnum];
      return {
        id: item.id,
        title: t(item.label),
        subTitle: t(`Pages.Account.withdraw.mobile.detail.${item.id}`),
        href: item.url,
        tag: isMaintained ? CategoryTypeEnum.Maintain : item.tag,
        icon: item.icon,
        iconMaintain: item.iconMaintain,
        disabled: isMaintained,
      };
    }).sort((a, b) => {
      return a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1;
    });
  }, [t, isMaintainWithdraw]);

  const isMainWithdraw = useMemo(() => {
    const isDisabled = transformedAccountMenu.find(
      (item) => item.href === pathname,
    )?.disabled;
    if (pathname !== AccountLinkEnum.Withdraw && isDisabled) {
      setTimeout(() => {
        router.push(AccountLinkEnum.Withdraw, {
          scroll: false,
        });
      }, 0);
      return true;
    }
    return pathname === AccountLinkEnum.Withdraw;
  }, [pathname, transformedAccountMenu, router]);

  const title = useMemo(() => {
    if (isMainWithdraw) {
      return '';
    }
    const activeMenu = transformedAccountMenu.find(
      (item) => item.href === pathname,
    );
    return activeMenu?.title ?? '';
  }, [pathname, isMainWithdraw, transformedAccountMenu]);

  const isShowFooter = useMemo(() => {
    const showLink = [
      WithdrawLinkEnum.Bank,
      WithdrawLinkEnum.Crypto,
      WithdrawLinkEnum.PhoneCard,
      WithdrawLinkEnum.Coin12,
    ];

    return showLink.includes(pathname as WithdrawLinkEnum);
  }, [pathname]);

  const handleCloseSlide = () => {
    router.replace(AccountLinkEnum.Withdraw, {
      scroll: false,
    });
  };

  return (
    <>
      <div className="w-full">
        <div className="flex justify-center flex-col gap-1 items-center deposit-title-mobile px-3 py-6">
          <div className="text-dark-700 text-[14px] font-bold leading-[140%] uppercase">
            {t('Pages.Account.deposit.mobile.title')}
          </div>
          <div className="text-dark-700 text-[14px] font-bold leading-[140%] uppercase">
            <span>{t('Pages.Account.deposit.mobile.description')}</span>&nbsp;
            <span className="text-green-500">
              {t('Pages.Account.deposit.mobile.one_minute')}
            </span>
          </div>
        </div>
        <div className="px-3 pb-4">
          <TransactionMenuMobile
            menu={transformedAccountMenu as DepositTabItem[]}
          />
        </div>
      </div>
      <TransactionSlide
        isOpen={!isMainWithdraw}
        onClose={handleCloseSlide}
        title={title}
        isShowFooter={isShowFooter}
        boxNoteClassName="border-t-[1px] border-neutral-400 mt-4"
        slideClassName="!bg-primary-light-0"
      >
        {children}
      </TransactionSlide>
    </>
  );
};

export { WithdrawContainerMobile };
