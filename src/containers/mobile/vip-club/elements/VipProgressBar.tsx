import { calculateWidth } from '@/utils/vip-club';
import clsx from 'clsx';

type ProgressBarProps = {
  current: number;
  required: number;
  currentFormatted?: string | null;
  requiredFormatted?: string | null;
  label: string;
  barColor: string;
  className?: string;
};

export const VipProgressBar = ({
  current,
  required,
  currentFormatted,
  requiredFormatted,
  label,
  barColor,
  className,
}: ProgressBarProps) => {
  const progressWidth = calculateWidth(current, required);

  return (
    <div className={clsx('w-full z-2', className)}>
      <div className="flex justify-between mb-2">
        <p className="text-sm text-white font-normal md:text-base">{label}</p>
        <p className="text-sm font-medium text-money md:text-base">{`${currentFormatted}/${requiredFormatted}`}</p>
      </div>
      <div className="w-full h-2 bg-woodsmoke-38 rounded-[20px]">
        <div
          className={`${barColor} h-2 rounded-[20px]`}
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
};
