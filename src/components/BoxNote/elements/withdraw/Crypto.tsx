import { CryptoLink } from '@/components/BoxNote/elements/CryptoLink';
import { DEFAULT_CURRENCY_UNIT } from '@/constant/app';
import { useWithdrawContext } from '@/hooks/contexts';
import HERE_IMG from '@/public/images/account/deposit/note.webp';
import { formatNumberWithCommas } from '@/utils/format-currency';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMemo } from 'react';

const CryptoWithdraw = () => {
  const t = useTranslations();
  const { selectedCrypto } = useWithdrawContext();

  const minAmount = useMemo(() => {
    return formatNumberWithCommas(
      selectedCrypto?.min || 0,
      DEFAULT_CURRENCY_UNIT || '',
    );
  }, [selectedCrypto]);

  return (
    <div>
      <CryptoLink />
      <div className="flex flex-col gap-2 tutorial-deposit p-4 rounded-[8px] transaction-note mt-4">
        <div className="tutorial-deposit-title flex gap-2">
          <Image src={HERE_IMG} alt="" width={20} height={20.5} />
          <span className="font-bold text-base leading-[19.6px] text-orange-50">
            {t('Pages.Account.deposit.crypto.note_text')}
          </span>
        </div>
        <ul className="list-decimal list-outside pl-4 text-dark-700 font-normal text-xs leading-[150%]">
          <li>
            {t('Pages.Account.withdraw.crypto.note.text_1', {
              brandName: process.env.NEXT_PUBLIC_BRAND_NAME || '',
            })}
          </li>
          <li>{t('Pages.Account.withdraw.crypto.note.text_2')}</li>
          <li>
            {t('Pages.Account.withdraw.crypto.note.text_3', {
              amount: minAmount,
            })}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CryptoWithdraw;
