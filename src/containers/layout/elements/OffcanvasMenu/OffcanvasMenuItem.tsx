import type { MenuItem } from '@/types/menu';
import { Tag } from '@/components/Tag';
import { SizeEnum } from '@/enums';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type OffcanvasMenuItemProps = {
  item: MenuItem;
  isActive: boolean;
  onClick?: () => void;
  onToggleExpand?: () => void;
  className?: string;
  isExpanded?: boolean;
  isChild?: boolean;
  isHidden?: boolean;
};

export const OffcanvasMenuItem = ({
  item,
  isActive,
  onClick,
  onToggleExpand,
  className,
  isExpanded,
  isChild,
  isHidden,
}: OffcanvasMenuItemProps) => {
  const t = useTranslations();
  const handleClick = (_e: React.MouseEvent) => {
    onClick?.();
    if (item.onClick) {
      item.onClick();
    }
  };

  const iconSrc = isActive
    ? item.iconActive || item.icon
    : item.iconWhite || item.icon;
  const iconSize = isChild ? 14 : 24;

  if (isHidden) return null;

  return (
    <div
      className={clsx(
        'flex items-center gap-2 min-w-12 group px-3 py-4 pb-[14px] group relative',
        {
          'bg-neutral-500': isActive || isExpanded,
        },
        className,
      )}
    >
      <Link
        href={item.onClick ? '#' : item.to}
        prefetch={false}
        target={item.isNewTab ? '_blank' : '_self'}
        className="flex items-center gap-2 flex-1"
        onClick={handleClick}
      >
        <div
          className={clsx('relative h-6 w-6 flex items-center', {
            '!h-5 !w-5': isChild,
          })}
        >
          {isChild && <i className={clsx(item.icon, 'text-white text-sm')} />}
          {!isChild && (
            <Image
              src={iconSrc}
              alt={`${item.label} icon`}
              width={iconSize}
              height={iconSize}
              priority
              className="translate-y-[1px] object-contain"
              quality={100}
            />
          )}
        </div>
        <div className="flex min-w-0 items-center gap-2 flex-1">
          <span className="truncate text-sm text-white leading-[20px] lg:leading-[22px] group-hover:text-primary-100 lg:text-base capitalize">
            {t(item.label)}
          </span>
          {item.tagType && (
            <Tag
              className="flex-shrink-0 relative"
              type={item.tagType}
              size={SizeEnum.Small}
            />
          )}
        </div>
      </Link>
      {item.children && item.children.length > 0 && (
        <button
          type="button"
          onClick={onToggleExpand}
          className={clsx(
            'icon icon-arrow-right rotate-90 text-lg text-white transition-transform',
            { 'rotate-[-90deg]': isExpanded },
          )}
        />
      )}
    </div>
  );
};
