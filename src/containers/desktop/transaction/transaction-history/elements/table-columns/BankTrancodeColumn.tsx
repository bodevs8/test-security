import type { TransactionDataType } from '@/types/transaction';
import type { KeyboardEventHandler } from 'react';

import { getBankTrancodeDataView } from '@/utils/transaction';
import { useTranslations } from 'next-intl';

type Props = {
  data: TransactionDataType;
  openModalCard: (data: TransactionDataType) => void;
};

const BankTrancodeColumn = ({ data, openModalCard }: Props) => {
  const t = useTranslations('Pages.Account.transaction_history');

  const { isMethodPhoneCard, isShowBankTrancode } =
    getBankTrancodeDataView(data);

  const handleOpenNumberCard = (data: TransactionDataType) => {
    openModalCard(data);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLSpanElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpenNumberCard(data);
    }
  };

  return (
    <>
      {isMethodPhoneCard && (
        <div
          className="note flex items-center gap-1 justify-end"
          onKeyDown={handleKeyDown}
          onClick={() => handleOpenNumberCard(data)}
          tabIndex={0}
          role="button"
        >
          <span className="text-[14px] text-blue-500 leading-[140%] cursor-pointer underline text-right">
            {t('table.phone_card')}
          </span>
        </div>
      )}
      {!isMethodPhoneCard && (
        <div className="bank-trancode">
          {isShowBankTrancode && (
            <span className="text-[14px] font-medium text-dark-700 leading-[140%] text-right">
              {data.bank_trancode}
            </span>
          )}
          {!isShowBankTrancode && (
            <span className="text-[14px] text-dark-200 leading-[140%] text-right">
              -
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default BankTrancodeColumn;
