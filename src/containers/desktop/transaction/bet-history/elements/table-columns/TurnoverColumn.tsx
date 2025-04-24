import type { BetHistoryDataType } from '@/types/bet-history';
import { formatAmount } from '@/utils/format-currency';
import { useMemo } from 'react';

const TurnoverColumn = ({
  data,
  mainCreditUnit = '',
}: {
  data: BetHistoryDataType;
  mainCreditUnit?: string;
}) => {
  const MAIN_CREDIT_UNIT =
    mainCreditUnit || process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT;

  const renderRolling = useMemo(() => {
    if (!data) return 0;

    if (data.play_in_package_id === 1) {
      return data.turnover_rolling2 || 0;
    }

    const turnoverRolling = data.turnover_rolling ?? 0;
    return data.turnover_rolling_txt || formatAmount(turnoverRolling, '') || 0;
  }, [data]);

  return (
    <div className="text-tertiary-blue-300 text-[14px] leading-[140%] font-medium whitespace-nowrap">
      {`${renderRolling} ${MAIN_CREDIT_UNIT}`}
    </div>
  );
};

export default TurnoverColumn;
