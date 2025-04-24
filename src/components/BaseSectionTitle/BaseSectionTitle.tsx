import type { SectionTitleProps } from '@/types/component';
import clsx from 'clsx';
import Image from 'next/image';
import { useMemo } from 'react';

type Props = SectionTitleProps;

export const BaseSectionTitle = ({
  title,
  iconName,
  hasShadow,
  className,
  titleClassName,
  iconClassName,
  iconData,
}: Props) => {
  const iconSrc = useMemo(() => `/icons/${iconName}.svg`, [iconName]);

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {(iconName || iconData) && (
        <Image
          src={iconData || iconSrc}
          alt="icon"
          width={32}
          height={32}
          className={clsx(
            'object-cover size-[18px] lg:size-[26px]',
            iconClassName,
          )}
        />
      )}
      <div
        className={clsx(
          'text-base sm:text-lg lg:text-2xl font-bold uppercase leading-[140%] text-green-500',
          hasShadow && 'drop-shadow-md',
          titleClassName,
        )}
      >
        {title}
      </div>
    </div>
  );
};
