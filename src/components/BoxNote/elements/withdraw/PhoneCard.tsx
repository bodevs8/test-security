import NOTE_IMG from '@/public/images/account/deposit/note.webp';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

const PhoneCardWithdraw = () => {
  const t = useTranslations();

  return (
    <div>
      <div className="flex flex-col gap-2 tutorial-deposit pl-4 pt-4 rounded-2 transaction-note">
        <div className="tutorial-deposit-title flex gap-2">
          <Image src={NOTE_IMG} alt="" width={20} height={20.5} />
          <span className="font-bold text-base text-orange-50">
            {t('Pages.Account.deposit.crypto.note_text')}
          </span>
        </div>
        <div className="tutorial-deposit-content pb-4">
          <p className="text-xs leading-[18px] text-dark-700">
            {t('Pages.Account.withdraw.phone_card.note_text_1')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhoneCardWithdraw;
