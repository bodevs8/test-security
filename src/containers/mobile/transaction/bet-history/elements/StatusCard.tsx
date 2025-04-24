import type { BetHistoryDataType } from '@/types/bet-history';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

type Props = {
  data: BetHistoryDataType;
};

export const StatusCard = ({ data }: Props) => {
  const t = useTranslations('Pages.Account.bet_history');
  const statusTransform = (data.ticket_status ?? '').toUpperCase();
  const textRender = statusTransform ? t(`status.${statusTransform}`) : '';
  const statusClassName = useMemo(() => {
    return (data.ticket_status || '').split(' ').join('_').toLowerCase();
  }, [data.ticket_status]);

  return (
    <div
      className={clsx(
        'font-medium text-[14px] leading-[140%] status-col',
        statusClassName,
      )}
    >
      {textRender}
    </div>
  );
};
