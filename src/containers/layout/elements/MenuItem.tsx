import type { MenuItem as MenuItemType } from '@/types/menu';
import { Tag } from '@/components/Tag';
import { CategoryTypeEnum, SizeEnum } from '@/enums';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type MenuItemProps = {
  item: MenuItemType;
  isActive: boolean;
  onClick?: () => void;
  itemofOffcanvas?: boolean;
  className?: string;
  isExpanded?: boolean;
};

export const MenuItem = ({
  item,
  isActive,
  onClick,
  itemofOffcanvas = false,
  className,
  isExpanded,
}: MenuItemProps) => (
  <Link
    key={item.id}
    href={item.to}
    prefetch={false}
    className={clsx(
      'flex items-center gap-2 min-w-12 group px-3 py-4 pb-[14px] group relative',
      {
        'header-menu-item-active': isActive,
        'bg-neutral-500': itemofOffcanvas && isActive,
      },
      className,
    )}
    onClick={onClick}
  >
    <div
      className={clsx('relative h-5 w-5', {
        'hidden lg:block': !itemofOffcanvas,
      })}
    >
      {!isActive && (
        <Image
          src={item.icon}
          alt={`${item.label} icon`}
          width={20}
          height={20}
          priority
        />
      )}
      {isActive && (
        <Image
          src={item.iconActive}
          alt={`${item.label} icon active`}
          width={20}
          height={20}
          priority
        />
      )}
    </div>
    <div className="flex min-w-0 items-center gap-2 flex-1">
      <span className="truncate text-sm text-white leading-[20px] lg:leading-[22px] group-hover:text-primary-100 lg:text-base">
        {item.label}
      </span>
      {item.tagType && (
        <Tag
          className={clsx('flex-shrink-0', {
            'absolute top-1 right-2': !itemofOffcanvas,
            relative: itemofOffcanvas,
          })}
          type={CategoryTypeEnum.Hot}
          size={SizeEnum.Small}
        />
      )}
    </div>
    {item.children && itemofOffcanvas && (
      <span
        className={clsx(
          'icon icon-arrow-left rotate-180 text-lg text-white transition-transform',
          { 'rotate-0': isExpanded },
        )}
      />
    )}
  </Link>
);
