import type { PromotionTagEnum } from '@/enums';
import { TAG_CLASSES } from '@/constant/promotion';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

type Props = {
  tagKey: PromotionTagEnum;
  className?: string;
  tagTextClassName?: string;
};

export function PromotionTag({ className, tagTextClassName, tagKey }: Props) {
  const t = useTranslations('Pages.Promotion');

  return (
    <div
      className={clsx(
        'rounded-[4px] uppercase w-fit h-fit flex items-center justify-center px-[6px] text-sm',
        TAG_CLASSES[tagKey],
        className,
      )}
    >
      <p
        className={clsx(
          'font-bold text-[10px] leading-[140%] lg:text-sm',
          tagTextClassName,
        )}
      >
        {t(`${tagKey}`)}
      </p>
    </div>
  );
}
