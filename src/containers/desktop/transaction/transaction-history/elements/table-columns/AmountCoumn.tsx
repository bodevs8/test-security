import type { TransactionDataType } from '@/types/transaction';
import { formatAmount, limitDecimal } from '@/utils/format-currency';

const AmountColumn = ({
  data,
  mainCreditUnit = '',
}: {
  data: TransactionDataType;
  mainCreditUnit?: string;
}) => {
  const MAIN_CREDIT_UNIT =
    mainCreditUnit || process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT;

  return (
    <div className="text-dark-700 text-[14px] leading-[140%] font-medium whitespace-nowrap">
      {data.amount_txt && (
        <>
          {limitDecimal(data.amount_txt)} {MAIN_CREDIT_UNIT}
        </>
      )}
      {!data.amount_txt && (
        <>
          {formatAmount(
            limitDecimal(Number(data.amount) / 1000),
            MAIN_CREDIT_UNIT,
          )}
        </>
      )}
    </div>
  );
};

export default AmountColumn;
