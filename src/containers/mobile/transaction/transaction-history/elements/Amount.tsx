import type { TransactionDataType } from '@/types/transaction';
import { formatAmount, limitDecimal } from '@/utils/format-currency';

type Props = {
  data: TransactionDataType;
};

export const Amount = ({ data }: Props) => {
  const MAIN_CREDIT_UNIT = process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT;
  return (
    <div className="text-dark-700 text-[16px] leading-[140%] font-medium whitespace-nowrap mr-2">
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
