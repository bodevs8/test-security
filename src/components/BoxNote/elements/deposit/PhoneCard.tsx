import NOTE_IMG from '@/public/images/account/deposit/note.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const PhoneCard = () => {
  const t = useTranslations();

  return (
    <div>
      <div className="flex flex-col gap-2 tutorial-deposit pl-4 pt-4 rounded-2 transaction-note pr-4 sm:pr-0">
        <div className="tutorial-deposit-title flex gap-2">
          <Image src={NOTE_IMG} alt="" width={20} height={20.5} />
          <span className="font-bold text-base text-orange-50">
            {t('Pages.Account.deposit.crypto.note_text')}
          </span>
        </div>
        <div className="tutorial-deposit-content">
          <p className="text-xs leading-[18px] text-dark-700">
            {t('Pages.Account.deposit.phone_card.note_text_1')}
          </p>
          <p className="text-xs leading-[18px] text-dark-700 mt-2">
            {t('Pages.Account.deposit.phone_card.note_text_2')}
          </p>
          <p className="text-xs leading-[18px] mt-2 text-dark-700 pb-4">
            {t('Pages.Account.deposit.phone_card.note_text_3')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;
