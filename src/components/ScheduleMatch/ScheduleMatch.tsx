import clsx from 'clsx';

type Props = {
  oddsUnder?: string;
  oddsPoint?: string;
  oddsOver?: string;
  className?: string;
};

export const ScheduleMatch = ({
  oddsUnder,
  oddsPoint,
  oddsOver,
  className,
}: Props) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-[24px] px-3 py-1 text-xs font-medium leading-[140%] flex justify-between items-center w-[116px] text-center',
        className,
      )}
    >
      <span
        className={clsx({
          'text-green-500': Number(oddsUnder) > 0,
          'text-red-500': Number(oddsUnder) <= 0,
        })}
      >
        {oddsUnder}
      </span>
      <span className="text-dark-200">{oddsPoint}</span>
      <span
        className={clsx({
          'text-green-500': Number(oddsOver) > 0,
          'text-red-500': Number(oddsOver) <= 0,
        })}
      >
        {oddsOver}
      </span>
    </div>
  );
};
