import type { TransactionDataType } from '@/types/transaction';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

const StatusColumn = ({ data }: { data: TransactionDataType }) => {
  const t = useTranslations('Pages.Account.transaction_history');
  const statusTransform = (data.status ?? '').toUpperCase();
  const textRender = statusTransform ? t(`status.${statusTransform}`) : '';

  return (
    <div
      className={clsx(
        'font-medium text-[14px] leading-5 status-col',
        data.status.toLowerCase(),
      )}
    >
      {textRender}
    </div>
  );
};

export default StatusColumn;
