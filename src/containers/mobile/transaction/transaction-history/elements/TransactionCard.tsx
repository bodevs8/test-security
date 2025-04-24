import type { TransactionDataType } from '@/types/transaction';
import { TRANSACTION_TYPE_STYLES } from '@/constant/transaction';
import { HistoryMethodsEnum } from '@/enums';
import { getTypeTransaction, replaceMethod } from '@/utils/transaction';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Amount } from './Amount';
import { BankCode } from './BankCode';
import { BankTrancode } from './BankTrancode';
import { IdCard } from './IdCard';

type Props = {
  data: TransactionDataType;
  openModalCard: (data: TransactionDataType) => void;
};

export const TransactionCard = ({ data, openModalCard }: Props) => {
  const t = useTranslations('Pages.Account.transaction_history');

  const method = useMemo(() => {
    const methodKey = replaceMethod(data.method);
    const methodLocales = methodKey ? t(`method.${methodKey}`) : '';

    return HistoryMethodsEnum.SYSTEM.includes(data.method) || !data.method_txt
      ? methodLocales.replace('Pages.Account.transaction_history.method.', '')
      : data.method_txt;
  }, [data.method, data.method_txt, t]);

  const handleOpenModalCard = () => {
    openModalCard(data);
  };
  const typeKeyLocales = getTypeTransaction(data);

  return (
    <div className="relative bg-primary-light-0 w-full pt-[30px] px-3 pb-3 rounded-[8px]">
      <div
        className={clsx(
          'absolute top-0 left-0 flex items-center justify-center px-2 h-6 rounded-br-[6px] rounded-tl-[6px]',
          TRANSACTION_TYPE_STYLES[
            typeKeyLocales as keyof typeof TRANSACTION_TYPE_STYLES
          ],
        )}
      >
        <span className="text-[12px] leading-[140%] font-medium whitespace-nowrap capitalize text-dark-700">
          {t(typeKeyLocales)}
        </span>
      </div>
      <div className="w-full flex flex-col gap-2">
        {/* id - status */}
        <IdCard data={data} />

        {/* method */}
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center gap-2">
            <span className="text-dark-200 text-[12px] leading-[140%]">
              {t('table.method')}:
            </span>
            <span className="text-dark-700 text-[12px] leading-[140%] font-medium">
              {method}
            </span>
          </div>
        </div>

        {/* bank */}
        <div className="flex items-center justify-between w-full gap-2 h-[20px]">
          <BankCode data={data} />
          <span className="text-dark-200 text-[12px] leading-[140%] mr-2 mt-[10px]">
            {t('table.amount')}
          </span>
        </div>

        {/* amount */}
        <div className="flex items-center justify-between w-full gap-2 h-[17px]">
          <BankTrancode data={data} openModalCard={handleOpenModalCard} />
          <Amount data={data} />
        </div>
      </div>
    </div>
  );
};
