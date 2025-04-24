import { CategoryTypeEnum, SizeEnum } from '@/enums';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { memo, useMemo } from 'react';

type TagProps = {
  type: CategoryTypeEnum;
  className?: string;
  size?: SizeEnum;
  showIcon?: boolean;
  roundedFull?: boolean;
  labelClassName?: string;
};

const classTypes: Record<CategoryTypeEnum, string> = {
  [CategoryTypeEnum.Hot]: 'bg-red-500 text-white hot',
  [CategoryTypeEnum.Branding]: 'bg-purple-200 text-purple-100 branding',
  [CategoryTypeEnum.Live]: 'bg-red-500 text-white live',
  [CategoryTypeEnum.New]: 'bg-green-neon-500 text-dark-700 new',
  [CategoryTypeEnum.Available]: 'bg-available text-white available',
  [CategoryTypeEnum.Maintain]: 'bg-primary-light-300 text-dark-700 maintain',
  [CategoryTypeEnum.Coming]: 'bg-orange-100 text-white branding',
  [CategoryTypeEnum.NotAvailable]: 'bg-maintain text-dark-200 bg-neutral-300',
  [CategoryTypeEnum.CurrentlyApplying]: 'bg-red-200 text-white shadow-red hot',
};

const sizeClasses: Record<SizeEnum, string> = {
  [SizeEnum.Default]: 'h-[14px] text-[10px] leading-[140%] font-bold px-[6px]',
  [SizeEnum.Small]: 'h-[13px] text-[8px] leading-[140%] font-bold px-[6px]',
  [SizeEnum.Large]: 'h-[20px] text-[14px] leading-[140%] font-bold px-[6px]',
};

export const BrandingTag = memo(
  ({
    type,
    className,
    size = SizeEnum.Default,
    showIcon = true,
    roundedFull = false,
    labelClassName,
  }: TagProps) => {
    const t = useTranslations('Common');

    const labelText = useMemo(() => t(`label.${type}`), [t, type]);
    const classType = useMemo(() => classTypes[type] ?? type, [type]);
    const isLiveCategory = type === CategoryTypeEnum.Live;

    return (
      <div
        className={clsx(
          'base-label uppercase rounded-[4px] flex items-center justify-center gap-1',
          roundedFull ? 'rounded-[4px]' : 'rounded-b-[4px]',
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
        <span
          className={clsx(
            {
              'translate-y-[1px]': type === CategoryTypeEnum.Maintain,
            },
            labelClassName,
          )}
        >
          {labelText}
        </span>
      </div>
    );
  },
);

BrandingTag.displayName = 'BrandingTag';
