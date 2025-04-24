import NOTE_IMG from '@/public/images/account/deposit/note.webp';
import TUTORIAL_NOTE_IMG from '@/public/images/account/deposit/tutorial.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Flexpay = () => {
  const t = useTranslations();
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 rounded-[8px] transaction-note-top">
        <div className="flex gap-2 items-center">
          <Image src={TUTORIAL_NOTE_IMG} alt="faq" width={24} height={24} />
          <span className="text-green-500 text-[14px] font-bold leading-[20px] uppercase">
            {t('Pages.Account.deposit.flexpay.note.guideline.title')}
          </span>
        </div>
        <div className="mt-2 text-dark-700 text-[12px] font-medium leading-[18px]">
          <div>
            <span className="font-bold text-dark-700">
              {t('Common.step', { step: 1 })}:&nbsp;
            </span>
            <span>
              {t('Pages.Account.deposit.flexpay.note.guideline.step_1')}
            </span>
          </div>
          <div className="mt-2">
            <span className="font-bold text-dark-700">
              {t('Common.step', { step: 2 })}:&nbsp;
            </span>
            <span>
              {t('Pages.Account.deposit.flexpay.note.guideline.step_2')}
            </span>
          </div>
          <div className="mt-2">
            <span className="font-bold text-dark-700">
              {t('Common.step', { step: 3 })}:&nbsp;
            </span>
            <span>
              {t('Pages.Account.deposit.flexpay.note.guideline.step_3')}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-[8px] transaction-note">
        <div className="flex gap-2 items-center">
          <Image src={NOTE_IMG} alt="warning" width={24} height={24} />
          <span className="text-orange-50 text-[14px] font-bold leading-[20px] uppercase">
            {t('Pages.Account.deposit.flexpay.note.warning.title')}
          </span>
        </div>
        <div className="mt-2 text-dark-700 text-[12px] font-normal leading-[18px]">
          <div>
            {t('Pages.Account.deposit.flexpay.note.warning.require_input')}
          </div>
          <div className="mt-2">
            {t('Pages.Account.deposit.flexpay.note.warning.deposit', {
              brandName,
            })}
          </div>
          <div className="mt-2">
            {t('Pages.Account.deposit.flexpay.note.warning.not_applied')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flexpay;
