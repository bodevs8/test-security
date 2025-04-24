import type { TransactionDataType } from '@/types/transaction';
import { MAPPING_CRYPTO } from '@/constant/transaction';
import { getBankCodeDataView, getCryptoIcon } from '@/utils/transaction';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

const BankCodeColumn = ({ data }: { data: TransactionDataType }) => {
  const { isCryptoMethod, cryptoName, bankIcon, bankName, toBankCode } =
    getBankCodeDataView(data);

  return (
    <div className="col-provider">
      {isCryptoMethod && (
        <div
          className={clsx(
            'crypto-provider flex items-center gap-2',
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
              className="leading-[140%] font-medium text-[14px] underline text-blue-500 whitespace-nowrap overflow-visible xspc:overflow-hidden text-ellipsis"
            >
              {cryptoName}
            </Link>
          )}
          {!data.live_check && (
            <span className="text-dark-700 leading-[140%] text-[14px] font-medium whitespace-nowrap overflow-visible xspc:overflow-hidden text-ellipsis">
              {cryptoName}
            </span>
          )}
        </div>
      )}
      {!isCryptoMethod && (
        <div className="flex items-center gap-2">
          {bankIcon && (
            <Image
              src={bankIcon}
              alt={toBankCode}
              width={20}
              height={20}
              className={clsx('aspect-[20/20]')}
            />
          )}
          <span className="text-dark-700 leading-[140%] text-[14px] font-medium whitespace-nowrap overflow-hidden text-ellipsis md:max-[1024px]:overflow-visible">
            {bankName}
          </span>
        </div>
      )}
    </div>
  );
};

export default BankCodeColumn;
