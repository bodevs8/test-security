import type { BetHistoryDataType } from '@/types/bet-history';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

const StatusColumn = ({ data }: { data: BetHistoryDataType }) => {
  const t = useTranslations('Pages.Account.bet_history');
  const statusTransform = (data.ticket_status ?? '').toUpperCase();
  const textRender = statusTransform ? t(`status.${statusTransform}`) : '';

  return (
    <div
      className={clsx(
        'font-medium text-[14px] leading-[140%] status-col',
        (data.ticket_status || '').split(' ').join('_').toLowerCase(),
      )}
    >
      {textRender}
    </div>
  );
};

export default StatusColumn;
