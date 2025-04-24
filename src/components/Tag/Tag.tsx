import { CategoryTypeEnum, SizeEnum } from '@/enums';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { memo, useMemo } from 'react';

type TagProps = {
  type: CategoryTypeEnum;
  className?: string;
  size?: SizeEnum;
  showIcon?: boolean;
};

const classTypes: Record<CategoryTypeEnum, string> = {
  [CategoryTypeEnum.Hot]: 'bg-red-600 text-white hot',
  [CategoryTypeEnum.Branding]: 'bg-purple-200 text-purple-100 branding',
  [CategoryTypeEnum.Live]: 'bg-label-live text-white live',
  [CategoryTypeEnum.New]: 'bg-green-neon-500 text-dark-700 new',
  [CategoryTypeEnum.Available]: 'bg-available text-white available',
  [CategoryTypeEnum.Maintain]: 'bg-maintain text-dark-200 bg-neutral-300',
  [CategoryTypeEnum.Coming]: 'bg-purple-200 text-purple-100 branding',
  [CategoryTypeEnum.NotAvailable]:
    'bg-maintain text-dark-200 bg-neutral-300',
  [CategoryTypeEnum.CurrentlyApplying]: 'bg-red-200 text-white shadow-red hot',
};

const sizeClasses: Record<SizeEnum, string> = {
  [SizeEnum.Default]:
    'text-[10px] leading-[140%] font-bold h-[14px] px-[3.5px]',
  [SizeEnum.Small]: 'text-[8px] leading-[140%] font-bold h-[14px] px-[3.5px]',
  [SizeEnum.Large]: 'h-[18px] text-[12px] leading-[140%] font-bold px-[3.5px]',
};

export const Tag = memo(
  ({ type, className, size = SizeEnum.Default, showIcon = true }: TagProps) => {
    const t = useTranslations('Common');

    const labelText = useMemo(() => t(`label.${type}`), [t, type]);
    const classType = useMemo(() => classTypes[type] ?? type, [type]);
    const isLiveCategory = type === CategoryTypeEnum.Live;

    return (
      <div
        className={clsx(
          'base-label uppercase rounded-b-[4px] flex items-center justify-center gap-1',
          classType,
          sizeClasses[size],
          className,
        )}
      >
        {isLiveCategory && showIcon && (
          /* TODO: change when init icon */
          <svg
            width="5"
            height="6"
            viewBox="0 0 5 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.5" cy="3" r="2.5" fill="white" />
          </svg>
        )}
        {labelText}
      </div>
    );
  },
);

Tag.displayName = 'Tag';
