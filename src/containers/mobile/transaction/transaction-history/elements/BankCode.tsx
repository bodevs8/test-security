import type { TransactionDataType } from '@/types/transaction';
import { MAPPING_CRYPTO } from '@/constant/transaction';
import { getBankCodeDataView, getCryptoIcon } from '@/utils/transaction';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  data: TransactionDataType;
};

export const BankCode = ({ data }: Props) => {
  const t = useTranslations('Pages.Account.transaction_history');
  const { isCryptoMethod, cryptoName, bankIcon, bankName, toBankCode } =
    getBankCodeDataView(data);

  return (
    <div className="flex items-center gap-1">
      <span className="text-dark-200 text-[12px] leading-[140%]">
        {t('table.bank_code')}:
      </span>
      <span className="text-dark-700 text-[12px] leading-[140%] font-medium">
        {isCryptoMethod && (
          <div
            className={clsx(
              'crypto-provider flex flex-row-reverse items-center gap-1',
              MAPPING_CRYPTO[toBankCode as keyof typeof MAPPING_CRYPTO],
            )}
          >
            <Image
              src={getCryptoIcon(toBankCode)}
              alt={toBankCode}
              width={20}
              height={20}
              className={clsx('aspect-[20/20]')}
            />
            {data.live_check && (
              <Link
                target="_blank"
                href={data.live_check}
                prefetch={false}
                className="leading-[140%] font-medium text-[12px] underline text-blue-500 whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {cryptoName}
              </Link>
            )}
            {!data.live_check && (
              <span className="text-dark-700 leading-[140%] font-medium text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
                {cryptoName}
              </span>
            )}
          </div>
        )}
        {!isCryptoMethod && (
          <div className="flex flex-row-reverse items-center gap-1">
            {bankIcon && (
              <Image
                src={bankIcon}
                alt={toBankCode}
                width={20}
                height={20}
                className={clsx('aspect-[20/20]')}
              />
            )}
            <span className="text-dark-700 leading-[140%] font-medium text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
              {bankName}
            </span>
          </div>
        )}
      </span>
    </div>
  );
};
