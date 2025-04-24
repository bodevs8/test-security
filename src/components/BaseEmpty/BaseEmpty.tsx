import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMemo } from 'react';

type Props = {
  iconEmpty: string;
  titleEmpty?: string;
  emptyClassName?: string;
  titleEmptyClassName?: string;
  imageSize?: number;
};

export function BaseEmpty({
  iconEmpty,
  titleEmpty,
  emptyClassName,
  titleEmptyClassName,
  imageSize = 120,
}: Props) {
  const t = useTranslations('Common.empty');

  const iconEmptyUrl = useMemo(() => {
    return `/images/empty/${iconEmpty}.webp`;
  }, [iconEmpty]);

  return (
    <div
      className={clsx(
        'flex flex-col justify-center items-center w-full h-full box-border',
        emptyClassName,
      )}
    >
      <Image
        src={iconEmptyUrl}
        alt="table empty"
        width={imageSize}
        height={imageSize}
        className="aspect-[120/120]"
      />
      <div
        className={clsx(
          'text-[14px] font-medium leading-5 text-dark-200 mt-4',
          titleEmptyClassName,
        )}
      >
        {titleEmpty || t('default')}
      </div>
    </div>
  );
}
