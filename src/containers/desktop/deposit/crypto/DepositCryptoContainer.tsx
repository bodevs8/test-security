'use client';

// Types
import type {
  CryptoDataType,
  CryptoDetailDataType,
  DepositCryptoContainerProps,
} from '@/types/deposit';

// Internal imports (alphabetical order)
import { BaseSelect } from '@/components/BaseSelect';
import { ClipboardCopy } from '@/components/ClipboardCopy';
import { TIMEOUT_TRACKING_EVENT } from '@/constant/app';

import { DepositStoreContext } from '@/contexts/deposit-context';
import { ResponseStatusEnum } from '@/enums';
import { useTrackingTransaction } from '@/hooks/tracking';
import { getCryptoByNetwork } from '@/services/client';
import { getCryptoLink, getCryptoLogo } from '@/utils/deposit';
import { formatAmount } from '@/utils/format-currency';
import clsx from 'clsx';
// External imports
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useMemo, useRef, useState } from 'react';

const defaultCryptoList: CryptoDataType[] = [];
const defaultCryptoDetail: CryptoDetailDataType[] = [];

const DepositCryptoContainer = ({
  data = defaultCryptoList,
  cryptoByNetwork: initialCryptoByNetwork = defaultCryptoDetail,
  isMobile,
}: DepositCryptoContainerProps) => {
  const t = useTranslations();
  const { trackDepositInitiated } = useTrackingTransaction();
  const depositContext = use(DepositStoreContext);
  const setSelectedCrypto = depositContext?.setSelectedCrypto;
  const [cryptoByNetwork, setCryptoByNetwork] = useState(
    initialCryptoByNetwork,
  );
  const mounted = useRef(false);

  useEffect(() => {
    if (
      setSelectedCrypto &&
      data?.[0]?.currency &&
      cryptoByNetwork?.[0]?.network &&
      !mounted.current
    ) {
      setSelectedCrypto(
        `(${data[0].currency} - ${cryptoByNetwork[0].network}).`,
      );
      mounted.current = true;
    }
  }, [cryptoByNetwork, data, setSelectedCrypto]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (data?.[0]?.currency && cryptoByNetwork?.[0]?.network) {
      timeoutId = setTimeout(() => {
        trackDepositInitiated({
          amount: 0,
          currency: data[0]?.currency || '',
          method: 'crypto',
        });
      }, TIMEOUT_TRACKING_EVENT);
    }
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const option = useMemo(() => {
    return data.map((item) => ({
      label: (
        <div className="flex items-center gap-2">
          <Image
            src={getCryptoLogo(item.currency)}
            alt=""
            width={24}
            height={24}
          />
          <span className="font-medium text-[14px] leading-[140%] [.select-value_&]:!font-normal">
            {`${item.currency} (${item.network[0]}) Tỷ giá ${formatAmount(item.price, 'VND')}`}
          </span>
        </div>
      ),
      value: item.network[0] || '',
    }));
  }, [data]);

  const onChange = (value: string | number | (string | number)[]) => {
    getCryptoByNetwork(value as string)
      .then((res) => {
        setCryptoByNetwork(
          Array.isArray(res.data) && res.status === ResponseStatusEnum.Ok
            ? res.data
            : [],
        );
        const selectedCrypto = data.find((item) => item.network[0] === value);
        if (setSelectedCrypto && selectedCrypto) {
          setSelectedCrypto(
            `(${selectedCrypto.currency} - ${selectedCrypto.network[0]}).`,
          );
          trackDepositInitiated({
            amount: 0,
            currency: selectedCrypto.currency,
            method: 'crypto',
          });
        }
      })
      .catch((error) => {
        console.error('Failed to fetch crypto details:', error);
      });
  };

  return (
    <div
      className={clsx(
        'bg-neutral sm:pb-4 md:p-4 md:!pb-0 2xl:p-6 deposit-form-container relative h-fit min-h-[320px] md:min-h-[460px]',
        isMobile && '!bg-transparent',
      )}
    >
      <div className="deposit-form__title text-[14px] font-medium leading-[140%] tracking-[0] text-dark-700 capitalize">
        {t('Pages.Account.deposit.crypto.title')}
      </div>
      <div className="flex flex-wrap pt-1">
        <BaseSelect
          className="base-select-deposit"
          optionClassName="border-b-0 border-neutral-400"
          initialValues={option[0] && option[0].value}
          options={option}
          onChange={onChange}
          drawerTitle={t('Pages.Account.deposit.crypto.title')}
          contentClassName="!z-[54]"
          renderNode={(_option) => {
            return _option?.label || '';
          }}
        />
      </div>

      <div
        className={clsx(
          'bg-secondary-light-200 pb-6 pt-0 mt-6 md:mt-8',
          isMobile && '!bg-transparent !pt-6 !pb-0 !mt-0 !px-0',
        )}
      >
        <div className="deposit-form__qr">
          <div className="deposit-form__qr-title flex justify-center font-medium text-[14px] leading-[21px] text-center text-dark-700">
            {t('Pages.Account.deposit.crypto.note_qr')}
          </div>
          <div className="deposit-form__qr-image flex justify-center md:pt-3 md:pb-3">
            <Image
              src={String(cryptoByNetwork[0]?.qrcode || '')}
              alt="qr-code"
              width={266}
              height={262}
              className="aspect-[266/262] border border-secondary-light-400"
            />
          </div>
        </div>
        <div className="deposit-form__address">
          <div className="deposit-form__address-title text-[14px] leading-[140%] text-dark-700 capitalize">
            {t('Pages.Account.deposit.crypto.address_text')}
          </div>
          <ClipboardCopy
            label=""
            value={cryptoByNetwork[0]?.address || ''}
            className="h-[44px] bg-click-light-300 px-[14px] py-3"
            containerClassName="mt-1 bg-primary-light-100"
            useCopyIcon={false}
            showSendIcon
            iconBefore="icon-link"
            textButton={t('Pages.Account.deposit.crypto.copy_address')}
            textButtonSuccess={t('Pages.Account.deposit.crypto.copied')}
            wrapperClassName="referral-link-item-wrapper referral-link-item"
            valueClassName="!text-dark-200 !font-medium"
          />
          <div className="deposit-form__address-value rounded-lg flex items-center"></div>
        </div>
        <div className="deposit-form__note text-sm mt-6 leading-[140%] flex justify-center text-dark-700 pb-6 md:pb-0">
          <div className="break-all">
            {t('Pages.Account.deposit.crypto.check_status')}
          </div>
          <Link
            prefetch={false}
            target="_blank"
            href={`${getCryptoLink(cryptoByNetwork[0]?.network || '', cryptoByNetwork[0]?.address || '')}`}
            className="flex items-center cursor-pointer text-green-500 ml-2 font-medium"
          >
            <span className="underline">
              {t('Pages.Account.deposit.crypto.here')}
            </span>
            <i className="icon-arrow-square-in ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export { DepositCryptoContainer };
