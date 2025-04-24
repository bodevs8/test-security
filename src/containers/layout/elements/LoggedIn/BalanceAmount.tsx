import { formatNumberWithCommas } from '@/utils/format-currency';
import clsx from 'clsx';

type BalanceAmountProps = {
  balance: number;
  className?: string;
};

export const BalanceAmount = ({ balance, className }: BalanceAmountProps) => (
  <div
    className={clsx(
      'max-sm:text-[12px] truncate text-base font-bold leading-snug text-green-500 uppercase',
      className,
    )}
  >
    {`${formatNumberWithCommas(balance)} D`}
  </div>
);
