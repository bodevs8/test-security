'use client';

import type { DepositMethodEnum } from '@/enums';
import type { DepositTabItem } from '@/types/deposit';
import { TransactionMenuMobile } from '@/components/TransactionMenuMobile';
import { TransactionSlide } from '@/components/TransactionSlide';
import { DEPOSIT_MENU } from '@/constant/app';
import { AccountLinkEnum, CategoryTypeEnum, DepositLinkEnum } from '@/enums';
import { useDepositContext } from '@/hooks/contexts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

const DepositContainerMobile = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const { isMaintainDeposit } = useDepositContext();

  const transformedAccountMenu = useMemo(() => {
    return DEPOSIT_MENU.map((item) => {
      const isMaintained = isMaintainDeposit[item.id as DepositMethodEnum];
      return {
        id: item.id,
        title: t(item.label),
        subTitle: t(`Pages.Account.deposit.mobile.detail.${item.id}`),
        href: item.url,
        tag: isMaintained ? CategoryTypeEnum.Maintain : item.tag,
        disabled: isMaintained,
        icon: item.icon,
        iconMaintain: item.iconMaintain,
      };
    }).sort((a, b) => {
      return a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1;
    });
  }, [t, isMaintainDeposit]);

  const isMainDeposit = useMemo(() => {
    const isDisabled = transformedAccountMenu.find(
      (item) => item.href === pathname,
    )?.disabled;
    if (pathname !== AccountLinkEnum.Deposit && isDisabled) {
      setTimeout(() => {
        router.push(AccountLinkEnum.Deposit, {
          scroll: false,
        });
      }, 0);
      return true;
    }
    return pathname === AccountLinkEnum.Deposit;
  }, [pathname, transformedAccountMenu, router]);

  const title = useMemo(() => {
    if (isMainDeposit) {
      return '';
    }
    const activeMenu = transformedAccountMenu.find(
      (item) => item.href === pathname,
    );
    return activeMenu?.title ?? '';
  }, [pathname, isMainDeposit, transformedAccountMenu]);

  const isShowFooter = useMemo(() => {
    const showLink = [
      DepositLinkEnum.CodePay,
      DepositLinkEnum.Flexpay,
      DepositLinkEnum.Ewallet,
      DepositLinkEnum.Ewallet,
      DepositLinkEnum.PhoneCard,
    ];

    return showLink.includes(pathname as DepositLinkEnum);
  }, [pathname]);

  const handleCloseSlide = () => {
    router.replace(AccountLinkEnum.Deposit, {
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
        isOpen={!isMainDeposit}
        onClose={handleCloseSlide}
        title={title}
        isShowFooter={isShowFooter}
        containerClassName={clsx({
          '!pt-0 !px-0': pathname === DepositLinkEnum.Ewallet,
        })}
        boxNoteClassName={clsx({
          'border-t-[1px] border-primary-light-400':
            pathname === DepositLinkEnum.Crypto,
          'px-3': pathname === DepositLinkEnum.Ewallet,
        })}
      >
        {children}
      </TransactionSlide>
    </>
  );
};

export { DepositContainerMobile };
