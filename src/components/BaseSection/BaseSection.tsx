import { BaseSectionTitle } from '@/components/BaseSectionTitle';
import ArrowRightIcon from '@/public/icons/arrow-right.svg';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  title: string;
  iconName: string;
  hasShadow?: boolean;
  loadMoreHref?: string;
  navPrevClassName?: string;
  navNextClassName?: string;
  id?: string;
  contentClassName?: string;
};

export function BaseSection({
  title,
  iconName,
  loadMoreHref = '',
  hasShadow,
  navPrevClassName,
  navNextClassName,
  children,
  id,
  contentClassName,
}: React.PropsWithChildren<Props>) {
  const t = useTranslations('Common');
  const hasNavigation = navPrevClassName && navNextClassName;

  return (
    <div className="base-section" id={id}>
      <div className="flex justify-between items-center">
        <BaseSectionTitle
          title={title}
          hasShadow={hasShadow}
          iconName={iconName}
        />
        <div className="flex items-center gap-3 md:gap-4">
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
          {hasNavigation && (
            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  'section-nav-btn section-nav-left-btn cursor-pointer flex items-center justify-center bg-neutral-400 rounded-full size-6',
                  navPrevClassName,
                )}
              >
                <i className="icon-arrow-left text-[10px] translate-x-[-1px]" />
              </div>
              <div
                className={clsx(
                  'section-nav-btn section-nav-right-btn cursor-pointer flex items-center justify-center bg-neutral-400 rounded-full size-6',
                  navNextClassName,
                )}
              >
                <i className="icon-arrow-right text-[10px] translate-x-[1px]" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
