import { CryptoLink } from '@/components/BoxNote/elements/CryptoLink';
import { DepositStoreContext } from '@/contexts/deposit-context';
import { useLiveChat } from '@/hooks/utils';
import NOTE_IMG from '@/public/images/account/deposit/note.webp';
import TUTORIAL_NOTE_IMG from '@/public/images/account/deposit/tutorial.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

const Crypto = () => {
  const t = useTranslations();
  const depositContext = use(DepositStoreContext);
  const selectedCrypto = depositContext?.selectedCrypto;
  const { openLiveChat } = useLiveChat();

  return (
    <div>
      <CryptoLink />
      <div className="flex flex-col gap-2 tutorial-deposit pl-4 pt-4 rounded-2 transaction-note-top mt-4 pr-4">
        <div className="tutorial-deposit-title flex gap-2">
          <Image src={TUTORIAL_NOTE_IMG} alt="" width={24} height={20.5} />
          <span className="font-bold text-[16px] leading-[19.6px] text-green-500">
            {t('Pages.Account.deposit.crypto.tutorial_crypto')}
          </span>
        </div>
        <div className="tutorial-deposit-content rounded-lg">
          <p className="text-dark-700 text-xs leading-4">
            <b>{t('Pages.Account.deposit.crypto.step_1')}</b>
            <span className="ml-1 font-medium">
              {t('Pages.Account.deposit.crypto.text_step_1')}
            </span>
          </p>
          <p className="text-dark-700 text-xs leading-4 mt-2">
            <b>{t('Pages.Account.deposit.crypto.step_2')}</b>
            <span className="ml-1 font-medium">
              {t('Pages.Account.deposit.crypto.text_step_2')}
            </span>
          </p>
          <p className="text-dark-700 text-xs leading-4 mt-2">
            <b>{t('Pages.Account.deposit.crypto.step_3')}</b>
            <span className="ml-1 font-medium">
              {`${t('Pages.Account.deposit.crypto.text_step_3')} `}
              {`${selectedCrypto ?? ''}`}
            </span>
          </p>

          <p className="text-dark-700 text-xs leading-4 mt-2 pb-4">
            <b>{t('Pages.Account.deposit.crypto.text_4')}</b>
            <span className="ml-1 font-medium">
              {t('Pages.Account.deposit.crypto.text_step_4')}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 tutorial-deposit pt-6 pl-4 md:pt-4 rounded-2 transaction-note-deposit mt-4 pr-4">
        <div className="tutorial-deposit-title flex gap-2">
          <Image src={NOTE_IMG} alt="" width={20} height={20.5} />
          <span className="font-bold text-[16px] leading-[19.6px] text-orange-50">
            {t('Pages.Account.deposit.crypto.note_text')}
          </span>
        </div>
        <div className="tutorial-deposit-content">
          <p className="text-xs leading-[18px] text-dark-700">
            {t('Pages.Account.deposit.crypto.note_text_1')}
          </p>
          <p className="text-xs leading-[18px] text-dark-700 mt-2">
            {t('Pages.Account.deposit.crypto.note_text_2')}
          </p>
          <p className="text-xs leading-[18px] mt-2 text-dark-700">
            {t('Pages.Account.deposit.crypto.note_text_3')}
          </p>
          <p className="text-xs leading-[18px] text-dark-700">
            <span
              onClick={() => {
                openLiveChat();
              }}
              className="text-blue-500 cursor-pointer underline"
            >
              {t('Pages.Account.deposit.crypto.note_text_5')}
            </span>
            <span className="ml-1">
              {t('Pages.Account.deposit.crypto.note_text_6')}
            </span>
            <Link
              href={process.env.NEXT_PUBLIC_TELE_SUPPORT || ''}
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
              className="text-blue-500 ml-1 a-link botTelegramBtn cursor-pointer underline"
            >
              {t('Pages.Account.deposit.crypto.note_text_7')}
            </Link>
          </p>
          <p className="text-xs leading-[18px] mt-2 text-dark-700 pb-4">
            {t('Pages.Account.deposit.crypto.note_text_4')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Crypto;
