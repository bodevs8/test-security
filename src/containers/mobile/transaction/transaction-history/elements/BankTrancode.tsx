import type { TransactionDataType } from '@/types/transaction';
import type { KeyboardEventHandler } from 'react';

import { getBankTrancodeDataView } from '@/utils/transaction';
import { useTranslations } from 'next-intl';

type Props = {
  data: TransactionDataType;
  openModalCard: () => void;
};

export const BankTrancode = ({ data, openModalCard }: Props) => {
  const t = useTranslations('Pages.Account.transaction_history');
  const { isMethodPhoneCard, isShowBankTrancode } =
    getBankTrancodeDataView(data);

  const handleOpenNumberCard = () => {
    openModalCard();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLSpanElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpenNumberCard();
    }
  };

  return (
    <div className="flex items-center gap-1">
      <span className="text-dark-200 text-[12px] leading-[140%]">
        {t('table.bank_trancode')}:
      </span>
      <span className="text-dark-700 text-[12px] leading-[140%] font-medium">
        <>
          {isMethodPhoneCard && (
            <div className="note flex items-center">
              <span
                onKeyDown={handleKeyDown}
                onClick={() => handleOpenNumberCard()}
                tabIndex={0}
                role="button"
                className="text-[12px] text-orange-50 underline leading-[140%] cursor-pointer"
              >
                {t('table.phone_card')}
              </span>
            </div>
          )}
          {!isMethodPhoneCard && (
            <div className="bank-trancode">
              {isShowBankTrancode && (
                <span className="text-[12px] font-medium text-dark-700 leading-[140%] text-right">
                  {data.bank_trancode}
                </span>
              )}
              {!isShowBankTrancode && (
                <span className="text-[12px] font-medium text-dark-200 leading-[140%] text-right">
                  -
                </span>
              )}
            </div>
          )}
        </>
      </span>
    </div>
  );
};
