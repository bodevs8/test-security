import type { StaticImageData } from 'next/image';
import { BaseSectionTitle } from '@/components/BaseSectionTitle';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Props = {
  title: string;
  iconName?: string;
  hasShadow?: boolean;
  loadMoreHref?: string;
  navPrevClassName?: string;
  navNextClassName?: string;
  titleClassName?: string;
  iconClassName?: string;
  className?: string;
  titleSectionClassName?: string;
  iconData?: StaticImageData;
};

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
        {(loadMoreHref || children) && (
          <div
            className={clsx('flex items-center gap-2 md:gap-4', {
              'flex-row-reverse': loadMoreHref,
            })}
          >
            {loadMoreHref && (
              <Link
                href={loadMoreHref}
                prefetch={false}
                className="!text-cta-secondary-accent !text-xs leading-[18px] md:!text-[16px] hover:!underline font-medium md:leading-6 capitalize"
              >
                {t('label.load_more')}
              </Link>
            )}
            {children && (
              <div className="flex items-center gap-2">{children}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
