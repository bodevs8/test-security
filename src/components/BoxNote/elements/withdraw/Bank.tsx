import NOTE_IMG from '@/public/images/account/deposit/note.webp';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

const BankWithdraw = () => {
  const t = useTranslations('Pages.Account.withdraw.bank.note');

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 rounded-[8px] transaction-note">
        <div className="flex gap-2 items-center">
          <Image src={NOTE_IMG} alt="warning" width={24} height={24} />
          <span className="text-orange-50 text-[14px] font-bold leading-[20px] uppercase">
            {t('warning.title')}
          </span>
        </div>
        <div className="mt-2 text-dark-700 text-[12px] font-normal leading-[18px]">
          <div>{t('warning.content')}</div>
        </div>
      </div>
    </div>
  );
};

export default BankWithdraw;
