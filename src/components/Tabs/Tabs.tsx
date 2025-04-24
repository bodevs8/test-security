'use client';
import type { TabType } from '@/types/menu';
import { TabVariantEnum } from '@/enums';
import { clsx } from 'clsx';
import { useState } from 'react';
import { TabItem } from './TabItem';

type TabProps = {
  items: TabType[];
  defaultActive?: number;
  className?: string;
  tabClassName?: string;
  onClick?: (id: string | number) => void;
  variant?: TabVariantEnum;
};

export const Tabs = ({
  variant = TabVariantEnum.Sold,
  items,
  className = '',
  tabClassName = '',
  defaultActive,
  onClick,
  children,
}: React.PropsWithChildren<TabProps>) => {
  const [activeId, setActiveId] = useState(defaultActive ?? items?.[0]?.id);

  const handleChangeTab = (id: string | number) => {
    setActiveId(id);
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div className={clsx(className, 'w-full overflow-hidden')}>
      <div className="flex items-center max-[389px]:gap-[6px] gap-[10.67px] md:gap-3 overflow-auto hide-scrollbar">
        {items.map((item) => (
          <TabItem
            key={item.id}
            id={item.id}
            active={activeId === item.id}
            title={item.title}
            variant={variant}
            onClick={handleChangeTab}
            className={tabClassName}
          />
        ))}
      </div>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};
