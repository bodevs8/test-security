'use client';
import type { EwalletMethodEnum } from '@/enums';
import type { AccountOption } from '@/types/deposit';
import type { KeyboardEventHandler } from 'react';
import { BaseSelect } from '@/components/BaseSelect';
import { ClipboardCopy } from '@/components/ClipboardCopy';
import {
  EWALLET_MAPPING_ICON,
  EWALLET_MAPPING_WALLET,
} from '@/constant/deposit';
import { downloadQRCode } from '@/utils/deposit';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type SelectFromProps = {
  ewalletCode: string;
  walletName: EwalletMethodEnum;
  accounts: AccountOption[];
  isMobile: boolean;
};

export const SelectFrom = ({
  ewalletCode,
  walletName,
  accounts,
  isMobile,
}: SelectFromProps) => {
  const t = useTranslations();
  const [selectedAccount, setSelectedAccount] = useState<AccountOption | null>(
    null,
  );

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      downloadQRCode(selectedAccount?.qr_code as string);
    }
  };

  const options = accounts.map((account) => ({
    value: account.account_no,
    label: (
      <div className="flex items-center gap-2">
        <Image
          src={EWALLET_MAPPING_ICON[walletName]}
          alt={EWALLET_MAPPING_WALLET[walletName]}
          width={20}
          height={20}
        />
        <span className="font-medium text-[14px] leading-[140%] [.select-value_&]:!font-normal">
          {`${account.account_name} - ${account.account_no}`}
        </span>
      </div>
    ),
    data: account,
  }));

  const handleAccountChange = (value: any) => {
    const selected = accounts.find((account) => account.account_no === value);
    setSelectedAccount(selected || null);
  };

  useEffect(() => {
    handleAccountChange(accounts[0]?.account_no);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  return (
    <div
      className={clsx(
        'flex flex-col gap-6 w-full px-3 md:px-0 py-6 lg:p-6 !pt-2',
        isMobile &&
          '!pt-0 border border-secondary-light-400 !mx-3 !p-3 !w-[calc(100vw-24px)] !gap-4',
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="text-[14px] leading-[140%] tracking-[0] text-primary-blue-500 capitalize">
          {t('Pages.Account.deposit.ewallet.select_from', {
            walletName: EWALLET_MAPPING_WALLET[walletName],
          })}
        </div>
        <BaseSelect
          initialValues={accounts[0] && accounts[0].account_no}
          options={options}
          onChange={handleAccountChange}
        />
      </div>

      {selectedAccount && (
        <div
          className={clsx(
            'flex flex-col items-center gap-6 p-6',
            isMobile && '!p-0 !gap-4',
          )}
        >
          <div
            className={clsx(
              'flex flex-col items-center gap-6',
              isMobile && '!gap-2',
            )}
          >
            <div className="border border-secondary-light-400">
              <Image
                src={selectedAccount.qr_code}
                alt={`QR Code - ${selectedAccount.account_name}`}
                width={160}
                height={160}
                className={clsx('mx-auto', isMobile && '!w-[120px] !h-[120px]')}
              />
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => downloadQRCode(selectedAccount.qr_code as string)}
              onKeyDown={(e) => handleKeyDown(e)}
              tabIndex={0}
              role="button"
            >
              <i className="icon-dowload text-[20px] text-primary-blue-500" />
              <span className="text-primary-blue-500 before:text-primary-blue-500 text-[14px] font-medium leading-[140%]">
                {t('Common.button.download')}
              </span>
            </div>
          </div>

          {isMobile && (
            <div className="w-full h-[1px] bg-secondary-light-400"></div>
          )}

          <div className="flex flex-col gap-2 w-full">
            {isMobile && <div className="h-[1px] w-full bg-neutral-300" />}
            <div className="w-full flex justify-between items-center h-[28px]">
              <span className="text-primary-dark-200 text-[14px] leading-[140%] font-medium">
                {t('Pages.Account.deposit.codepay.result.account_name')}
              </span>
              <ClipboardCopy
                label=""
                value={selectedAccount.account_name?.toString() ?? ''}
                className="!bg-transparent !p-0"
                wrapperClassName="!gap-1"
                valueClassName="!text-secondary-blue-400 text-[14px] leading-[140%] font-medium"
              />
            </div>
            <div className="h-[1px] w-full bg-neutral-300" />

            <div className="w-full flex justify-between items-center h-[28px] mt-2">
              <span className="text-primary-dark-200 text-[14px] leading-[140%] font-medium">
                {t('Pages.Account.deposit.codepay.result.account_number')}
              </span>
              <ClipboardCopy
                label=""
                value={selectedAccount.account_no?.toString() ?? ''}
                className="!bg-transparent !p-0"
                wrapperClassName="!gap-1"
                valueClassName="!text-secondary-blue-400 text-[14px] leading-[140%] font-medium"
              />
            </div>
            <div className="h-[1px] w-full bg-neutral-300" />
            <div className="w-full flex justify-between items-center h-[28px]">
              <span className="text-primary-dark-200 text-[14px] leading-[140%] font-medium">
                {t('Pages.Account.deposit.codepay.result.note')}
              </span>
              <ClipboardCopy
                label=""
                value={ewalletCode?.toString() ?? ''}
                className="!bg-transparent !p-0"
                wrapperClassName="!gap-1"
                valueClassName="text-[14px] leading-[140%] font-medium uppercase !text-success-green-200"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
