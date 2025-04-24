import type { UserBankType } from '@/types/userbank';
import BgBankNotVerify from '@/public/images/bank/bg-bank-not-verify.webp';

import BgBankVerify from '@/public/images/bank/bg-bank-verify.webp';

import { getBankRoundedIcon } from '@/utils/bank';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Props = {
  userBank: UserBankType;
  className?: string;
};

const CardBank = ({ userBank, className }: Props) => {
  const t = useTranslations('Pages.Account.bank_information');
  const isVerified = !userBank.is_disable;

  return (
    <div
      className={clsx(
        'relative pt-8 px-4 pb-4 rounded-lg w-ful h-[110px] flex items-center justify-between overflow-hidden',
        className,
      )}
    >
      <Image
        src={isVerified ? BgBankVerify : BgBankNotVerify}
        alt="card bank"
        width={100}
        height={100}
        className={clsx('absolute left-0 top-0 w-full h-full object-cover', {
          'brightness-140': !isVerified,
        })}
      />
      <span
        className={clsx(
          'absolute left-0 top-0 py-1 px-2 text-white text-xs font-medium rounded-[6px] leading-[140%] z-10',
        )}
      >
        {isVerified && t('verified')}
        {!isVerified && t('not_verified')}
      </span>
      <div className="flex flex-col gap-1 z-10">
        <h4 className="text-white text-sm font-medium leading-[140%]">
          {userBank.bank_account_name}
        </h4>
        <span className="text-white text-sm font-bold leading-[140%]">
          {userBank.bank_account_no}
        </span>
      </div>
      <div className="flex flex-col gap-1 items-end z-10">
        <Image
          src={getBankRoundedIcon(userBank.bank_code, isVerified)}
          alt="bank icon"
          width={20}
          height={20}
          className={clsx('size-5 object-cover', {
            'bg-white rounded-full': isVerified,
          })}
        />
        <span className="text-white text-right text-sm font-medium leading-[140%]">
          {userBank.bank_name}
        </span>
      </div>
    </div>
  );
};

export { CardBank };
