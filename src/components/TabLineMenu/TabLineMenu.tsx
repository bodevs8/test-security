'use client';
import type { TabType } from '@/types/menu';
import { TabVariantEnum } from '@/enums';
import clsx from 'clsx';
import { memo, useCallback, useEffect, useState } from 'react';
import { TabLineItem } from './TabLineItem';

type TabLineProps = {
  items: TabType[];
  defaultActive?: number | string;
  className?: string;
  tabClassName?: string;
  isFillContainer?: boolean;
  isLink?: boolean;
  onClick?: (id: string | number | any) => void;
  imageClassName?: string;
  titleClassName?: string;
  variant?: TabVariantEnum;
  tagClassName?: string;
  tabLineMenuClassName?: string;
  isMobile?: boolean;
};

export const TabLineMenu = memo(
  ({
    variant = TabVariantEnum.Sold,
    items,
    className = '',
    tabClassName = '',
    defaultActive,
    isFillContainer = true,
    imageClassName = '',
    titleClassName = '',
    onClick,
    tabLineMenuClassName = '',
    children,
    tagClassName,
    isMobile = false,
  }: React.PropsWithChildren<TabLineProps>) => {
    const [activeId, setActiveId] = useState(defaultActive ?? items?.[0]?.id);

    const handleChangeTab = useCallback(
      (id: string | number) => {
        setActiveId(id);
        if (onClick) {
          onClick(id);
        }
      },
      [onClick],
    );

    useEffect(() => {
      setActiveId(defaultActive);
    }, [defaultActive]);

    return (
      <div
        className={clsx(
          className,
          'tab-line-menu w-full overflow-hidden border-b border-neutral-400',
        )}
      >
        <div
          className={clsx(
            'flex items-center gap-2 overflow-auto hide-scrollbar cursor-pointer',
            tabLineMenuClassName,
          )}
        >
          {items.map((item) => (
            <TabLineItem
              key={item.id}
              id={item.id}
              href={item?.href || undefined}
              active={activeId === item.id}
              title={item.title}
              isFillContainer={isFillContainer}
              onClick={handleChangeTab}
              className={tabClassName}
              iconPath={item.iconPath}
              iconPathActive={item.iconPathActive}
              imageClassName={imageClassName}
              titleClassName={titleClassName}
              variant={variant}
              tag={item.tag}
              disabled={item.disabled}
              tagClassName={tagClassName}
              isMobile={isMobile}
            />
          ))}
        </div>
        {children && <div>{children}</div>}
      </div>
    );
  },
);

TabLineMenu.displayName = 'TabLineMenu';
