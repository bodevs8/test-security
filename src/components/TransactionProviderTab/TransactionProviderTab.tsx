import type { TransactionTabItem } from '@/types/component';
import { BrandingTag } from '@/components/Tag/BrandingTag';
import {
  CategoryTypeEnum,
  EwalletMethodEnum,
  EWalletTabEnum,
  SizeEnum,
} from '@/enums';
import clsx from 'clsx';
import Image from 'next/image';

type TransactionProviderTabProps = {
  tabs: TransactionTabItem[];
  activeTab: string;
  wrapperClassName?: string;
  onChange: (value: string) => void;
  labelClassName?: string;
  isMobile?: boolean;
  type?: EWalletTabEnum;
};

export const TransactionProviderTab = ({
  tabs,
  onChange,
  activeTab,
  wrapperClassName,
  labelClassName,
  type = EWalletTabEnum.PRIMARY,
}: TransactionProviderTabProps) => {
  const handleClick = (tab: TransactionTabItem) => {
    if (!tab.isMaintain && tab.value !== activeTab) {
      onChange(tab.value);
    }
  };

  return (
    <div className={clsx('w-full flex items-center gap-2', wrapperClassName)}>
      {tabs.map((tab) => (
        <button
          data-value={tab.value}
          key={tab.value}
          onClick={() => handleClick(tab)}
          type="button"
          className={clsx(
            'w-full group flex items-center justify-center relative font-bold transaction-provider-tab h-[40px] text-[14px] text-dark-700 outline outline-primary-light-400 bg-neutral cursor-pointer uppercase',
            {
              'rounded-[4px]': type === EWalletTabEnum.SECONDARY,
              'active !border-[2px]':
                tab.value === activeTab && type === EWalletTabEnum.PRIMARY,
              'hover:!outline hover:!outline-green-500 !text-green-500':
                type === EWalletTabEnum.SECONDARY &&
                !tab.isMaintain &&
                tab.value !== activeTab,
              'active !border-0 !outline !outline-green-500 bg-green-80 text-green-500':
                type === EWalletTabEnum.SECONDARY && tab.value === activeTab,
              'disabled !bg-disabled !text-disabled !cursor-not-allowed pointer-events-all':
                tab.isMaintain,
              'h-[54px] !border-0 !outline-0': tab.iconImage,
              '!text-dark-200 !bg-disabled !border-0 !outline-0 font-bold opacity-50':
                tab.isMaintain && !tab.iconImage,
            },
            tab.customClass,
          )}
        >
          {tab.iconImage && (
            <>
              {tab.value === activeTab && (
                <Image
                  width={92}
                  height={20}
                  src={tab.iconActive ?? ''}
                  alt={tab.label}
                  className={clsx(
                    'w-[92px] !h-auto !border-0',
                    tab.label === EwalletMethodEnum.ViettelPay && 'w-[100px]',
                  )}
                />
              )}
              {tab.value !== activeTab && (
                <>
                  {tab.isMaintain && (
                    <Image
                      width={92}
                      height={20}
                      src={tab.iconMaintain ?? ''}
                      alt={tab.label}
                      className={clsx(
                        'w-[92px] !h-auto !border-0',
                        tab.label === EwalletMethodEnum.ViettelPay &&
                          'w-[100px]',
                      )}
                    />
                  )}
                  {!tab.isMaintain && (
                    <Image
                      width={92}
                      height={20}
                      src={tab.icon ?? ''}
                      alt={tab.label}
                      className={clsx(
                        'w-[92px] !h-auto !border-0',
                        tab.label === EwalletMethodEnum.ViettelPay &&
                          'w-[100px]',
                      )}
                    />
                  )}
                </>
              )}
            </>
          )}
          {typeof tab.icon === 'string' && tab.icon.startsWith('icon-') && (
            <span
              className={clsx('text-[22px] !font-bold uppercase', tab.icon)}
            />
          )}
          {!tab.iconImage && (
            <span
              className={clsx(labelClassName, {
                '!text-dark-700': tab.isMaintain,
              })}
            >
              {tab.label}
            </span>
          )}
          {tab.isMaintain && (
            <BrandingTag
              className={clsx('absolute right-[2px] top-[3px]')}
              type={CategoryTypeEnum.Maintain}
              size={SizeEnum.Small}
            />
          )}
        </button>
      ))}
    </div>
  );
};
