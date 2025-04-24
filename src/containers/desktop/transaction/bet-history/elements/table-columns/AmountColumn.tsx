import type { BetHistoryDataType } from '@/types/bet-history';
import { formatAmount } from '@/utils/format-currency';
import { useMemo } from 'react';

const AmountColumn = ({
  data,
  mainCreditUnit = '',
  dataKey = '',
}: {
  data: BetHistoryDataType;
  mainCreditUnit?: string;
  dataKey: string;
}) => {
  const MAIN_CREDIT_UNIT =
    mainCreditUnit || process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT;
  const keyTxt = useMemo(() => `${dataKey}_txt`, [dataKey]);

  return (
    <div className="text-dark-700 text-[14px] leading-[140%] font-medium whitespace-nowrap">
      {data[keyTxt as keyof typeof data] && (
        <>
          `${data[keyTxt as keyof typeof data]} ${MAIN_CREDIT_UNIT}`
        </>
      )}
      {!data[keyTxt as keyof typeof data] && (
        <>
          {formatAmount(
            data[dataKey as keyof typeof data] ?? '',
            MAIN_CREDIT_UNIT,
          )}
        </>
      )}
    </div>
  );
};

export default AmountColumn;
