import type { SectionTitleProps } from '@/types/component';
import { BaseSectionTitle } from '@/components/BaseSectionTitle';
import ArrowRightIcon from '@/public/icons/arrow-right.svg';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  loadMoreHref?: string;
  titleSectionClassName?: string;
} & SectionTitleProps;

export function EmblaCarouselTitle({
  title,
  iconName,
  loadMoreHref = '',
  hasShadow,
  titleClassName,
  iconClassName,
  className,
  children,
  titleSectionClassName,
  iconData,
}: React.PropsWithChildren<Props>) {
  const t = useTranslations('Common');

  return (
    <div className={clsx('base-section', titleSectionClassName)}>
      <div className="flex justify-between items-center">
        <BaseSectionTitle
          title={title}
          hasShadow={hasShadow}
          iconName={iconName}
          titleClassName={titleClassName}
          iconClassName={iconClassName}
          className={className}
          iconData={iconData}
        />
        <div
          className={clsx('flex items-center gap-2 md:gap-4', {
            'flex-row-reverse': loadMoreHref,
          })}
        >
          {loadMoreHref && (
            <Link
              href={loadMoreHref}
              prefetch={false}
              className="!text-dark-700 !text-xs leading-[140%] md:!text-sm font-medium capitalize
              bg-primary-light-100 hover:bg-green-250 transition-colors duration-300 p-3 flex items-center gap-1.5 rounded-md"
            >
              <span>{t('label.load_more')}</span>
              <Image
                src={ArrowRightIcon}
                alt="arrow-right"
                width={20}
                height={20}
                className="size-5"
              />
            </Link>
          )}
          {children && (
            <div className="flex items-center gap-2">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}
