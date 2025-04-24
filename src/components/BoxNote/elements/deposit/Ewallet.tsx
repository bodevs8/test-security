import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Ewallet = () => {
  const t = useTranslations();

  return (
    <div className="pt-2">
      <div className="flex flex-col gap-2 tutorial-deposit p-4 rounded-[8px] transaction-note-top">
        <div className="tutorial-deposit-title flex gap-2 text-green-500">
          <Image
            src="/images/account/deposit/tutorial.webp"
            alt=""
            width={24}
            height={20.5}
          />
          <span className="font-bold text-[14px] leading-[19.6px] uppercase text-green-500">
            {t('Pages.Account.deposit.ewallet.tutorial_ewallet')}
          </span>
        </div>
        <div className="tutorial-deposit-content grid gap-2">
          <p className="text-dark-700 text-xs leading-4">
            <b className="text-dark-700">
              {t('Pages.Account.deposit.ewallet.step_1')}
            </b>
            <span className="text-dark-700 ml-1">
              {t('Pages.Account.deposit.ewallet.text_step_1')}
            </span>
          </p>
          <p className="text-dark-700 text-xs leading-4">
            <b className="text-dark-700">
              {t('Pages.Account.deposit.ewallet.step_2')}
            </b>
            <span className="text-dark-700 ml-1">
              {t('Pages.Account.deposit.ewallet.text_step_2')}
            </span>
          </p>
          <p className="text-dark-700 text-xs leading-4">
            <b className="text-dark-700">
              {t('Pages.Account.deposit.ewallet.step_3')}
            </b>
            <span className="text-dark-700 ml-1">
              {t('Pages.Account.deposit.ewallet.text_step_3')}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 tutorial-deposit p-4 rounded-[8px] transaction-note mt-4">
        <div className="tutorial-deposit-title flex gap-2">
          <Image
            src="/images/account/deposit/note.webp"
            alt=""
            width={20}
            height={20.5}
          />
          <span className="font-bold text-[14px] leading-[19.6px] uppercase text-orange-50">
            {t('Pages.Account.deposit.ewallet.note_text')}
          </span>
        </div>
        <div className="tutorial-deposit-content grid gap-2">
          <p className="text-xs leading-[18px] text-dark-700">
            {t('Pages.Account.deposit.ewallet.note_text_1')}
          </p>
          <ul className="list-disc list-inside text-xs leading-[18px] text-dark-700 grid gap-2 pl-2">
            <li>{t('Pages.Account.deposit.ewallet.note_text_2')}</li>
            <li>{t('Pages.Account.deposit.ewallet.note_text_3')}</li>
            <li>{t('Pages.Account.deposit.ewallet.note_text_4')}</li>
          </ul>
          <p className="text-xs leading-[18px] text-dark-700">
            {t('Pages.Account.deposit.ewallet.note_text_5')}
          </p>
          <p className="text-xs leading-[18px] text-dark-700">
            {t('Pages.Account.deposit.ewallet.note_text_6')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ewallet;
