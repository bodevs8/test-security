import type { TransactionDataType } from '@/types/transaction';
import { createTimeHistory } from '@/utils/date';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

type Props = {
  data: TransactionDataType;
};

export const IdCard = ({ data }: Props) => {
  const t = useTranslations('Pages.Account.transaction_history');

  const formatedCreatedTime = useMemo(
    () => createTimeHistory(data.created_time),
    [data.created_time],
  );

  const status = useMemo(() => data.status.toUpperCase(), [data.status]);
  const statusRender = status ? t(`status.${status}`) : '';

  return (
    <div className="flex items-center justify-between w-full gap-2 h-[17px]">
      <div className="flex items-center gap-1">
        <span className="text-dark-200 text-[12px] leading-[140%]">
          {t('table.id_mobile')}
        </span>
        <span className="text-dark-700 text-[12px] leading-[140%] font-medium">
          #{data.id}
        </span>
        <span className="text-dark-200 text-[12px] leading-[140%] font-medium">
          {formatedCreatedTime}
        </span>
      </div>
      <div
        className={clsx(
          'font-medium text-[14px] leading-[140%] status-col',
          status.toLowerCase(),
        )}
      >
        {statusRender}
      </div>
    </div>
  );
};
