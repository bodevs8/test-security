import type { BetHistoryDataType } from '@/types/bet-history';
import { formatAmount } from '@/utils/format-currency';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { IdCard } from './IdCard';
import { StatusCard } from './StatusCard';

type Props = {
  data: BetHistoryDataType;
};

export const BetHistoryCard = ({ data }: Props) => {
  const t = useTranslations('Pages.Account.bet_history');
  const MAIN_CREDIT_UNIT = process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT;

  const renderRolling = useMemo(() => {
    if (!data) return 0;

    if (data.play_in_package_id === 1) {
      return data.turnover_rolling2 || 0;
    }

    const turnoverRolling = data.turnover_rolling ?? 0;
    return data.turnover_rolling_txt || formatAmount(turnoverRolling, '') || 0;
  }, [data]);

  return (
    <div className="relative bg-primary-light-0 w-full p-3 rounded-[8px]">
      <div className="flex items-center justify-between h-[20px]">
        <IdCard data={data} />
        <StatusCard data={data} />
      </div>
      <div className="flex items-center gap-2 mt-2 h-[17px]">
        <span className="text-tertiary-blue-300 text-[12px] leading-[140%]">
          {t('table.product')}:
        </span>
        <span className="text-primary-blue-500 text-[12px] leading-[140%] font-medium">
          {data.product}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-2 h-[17px]">
        <span className="text-tertiary-blue-300 text-[12px] leading-[140%]">
          {t('table.commission')}:
        </span>
        <span className="text-primary-blue-500 text-[12px] leading-[140%] font-medium">
          {`${data.commission_txt || formatAmount(data.commission ?? 0, '')} ${MAIN_CREDIT_UNIT}`}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-2 h-[17px]">
        <span className="text-tertiary-blue-300 text-[12px] leading-[140%]">
          {t('table.turnover')}:
        </span>
        <span className="text-primary-blue-500 text-[12px] leading-[140%] font-medium">
          {`${renderRolling} ${MAIN_CREDIT_UNIT}`}
        </span>
      </div>
      <div className="mt-3 min-h-[48px] bg-secondary-light-200">
        <div className="w-full grid grid-cols-[1fr_1px_1fr] px-2">
          <div className="w-full h-full py-1 flex flex-col items-center justify-between gap-[5px]">
            <span className="text-tertiary-blue-300 text-[12px] leading-[140%] font-medium uppercase">
              {t('table.stake_mobile')}
            </span>
            <span className="text-orange-dark text-[12px] leading-[140%]">
              {`${data.stake_txt || formatAmount(data.stake ?? 0, '')} ${MAIN_CREDIT_UNIT}`}
            </span>
          </div>
          <div className="w-[1px] h-full bg-primary-light-400"></div>
          <div className="w-full h-full py-1 flex flex-col items-center justify-between gap-[5px]">
            <span className="text-tertiary-blue-300 text-[12px] leading-[140%] font-medium uppercase">
              {t('table.winlost')}:
            </span>
            <span className="text-orange-dark text-[12px] leading-[140%]">
              {`${data.winlost_txt || formatAmount(data.winlost ?? 0, '')} ${MAIN_CREDIT_UNIT}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
