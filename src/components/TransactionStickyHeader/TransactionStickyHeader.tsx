import { BaseReload } from '@/components/BaseReload';
import clsx from 'clsx';

type Props = {
  onClick: () => void;
  title: string;
  isSticky: boolean;
};

export const TransactionStickyHeader = ({
  onClick,
  title,
  isSticky,
}: Props) => {
  return (
    <div
      className={clsx(
        'transaction-sticky-header flex items-center justify-between h-[52px] sticky top-0 left-0 z-3 px-3 bg-primary-light-0 border border-primary-light-100',
        {
          'backdrop-blur-[15px]': isSticky,
        },
      )}
    >
      <span className="text-[12px] leading-[140%] text-yellow-600">
        {title}
      </span>
      <BaseReload
        onClick={onClick}
        className="!p-0 !size-[28px] justify-center !outline-none !border-0"
        iconClassName="!text-[20px]"
      />
    </div>
  );
};
