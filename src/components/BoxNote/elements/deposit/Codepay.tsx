import { DEFAULT_CURRENCY_UNIT } from '@/constant/app';
import { MIN_AMOUNT_DEPOSIT } from '@/constant/deposit';
import { useDepositContext } from '@/hooks/contexts';
import { useLiveChat } from '@/hooks/utils';
import NOTE_IMG from '@/public/images/account/deposit/note.webp';
import TUTORIAL_NOTE_IMG from '@/public/images/account/deposit/tutorial.webp';
import { formatAmount } from '@/utils/format-currency';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const CodePay = () => {
  const t = useTranslations('Pages.Account.deposit.codepay.note');
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

  const { amount } = useDepositContext();
  const { openLiveChat } = useLiveChat();

  return (
    <div className="flex flex-col gap-4 border-t-[1px] border-primary-light-400 md:border-0 mt-2 md:mt-0">
      <div className="p-4 rounded-[8px] transaction-note-top mt-6 md:mt-0">
        <div className="flex gap-2 items-center">
          <Image src={TUTORIAL_NOTE_IMG} alt="faq" width={24} height={24} />
          <span className="text-green-500 text-base font-bold leading-[140%] uppercase">
            {t('guideline.title')}
          </span>
        </div>
        <div className="mt-2 text-dark-700 text-[12px] font-normal leading-[18px]">
          <div>
            <span>{t('guideline.min_deposit')}&nbsp;</span>
            {amount < MIN_AMOUNT_DEPOSIT && (
              <span>{t('guideline.limit')}&nbsp;</span>
            )}
            <span className="text-green-500 font-medium">
              {`${formatAmount(
                amount || MIN_AMOUNT_DEPOSIT,
                DEFAULT_CURRENCY_UNIT,
              )}.`}
            </span>
          </div>
          <div className="mt-2">
            <span>{t('guideline.require_verify')}</span>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-[8px] transaction-note-deposit mt-2 md:mt-0">
        <div className="flex gap-2 items-center">
          <Image src={NOTE_IMG} alt="warning" width={24} height={24} />
          <span className="text-orange-50 text-base font-bold leading-[140%] uppercase">
            {t('warning.title')}
          </span>
        </div>
        <div className="mt-2 text-dark-700 text-[12px] font-normal leading-[18px]">
          <div>{t('warning.content', { brandName })}</div>
          <div className="mt-2">{t('warning.require_input')}</div>
          <div className="mt-2">{t('warning.limit_deposit')}</div>
          <div className="mt-2">
            <span>{t('warning.contact_support')}&nbsp;</span>
            <button
              className="text-blue-500 font-medium !bg-transparent cursor-pointer underline"
              onClick={openLiveChat}
              type="button"
            >
              {t('warning.support_title')}
            </button>
            <span>&nbsp;{t('warning.support_description')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePay;
