'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

export type BaseBreadcrumbItem = {
  label?: string;
  href?: string;
  isActive?: boolean;
  labelKey?: string;
};

type BaseBreadcrumbProps = {
  items: BaseBreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
};

export function BaseBreadcrumb({
  items,
  className,
  separator,
}: BaseBreadcrumbProps) {
  const pathname = usePathname();
  const t = useTranslations();

  const breadcrumbItems = useMemo(() => {
    return items.map((item, index) => {
      const isLast = index === items.length - 1;
      const isActive = item.isActive || (isLast && pathname === item.href);
      const label = item.labelKey ? t(item.labelKey) : (item.label ?? '');
      return {
        ...item,
        label,
        isActive,
      };
    });
  }, [items, pathname, t]);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <React.Fragment key={`breadcrumb-item-${index}`}>
              <BreadcrumbItem>
                {item.isActive && (
                  <BreadcrumbPage className="text-green-500">
                    {item.label}
                  </BreadcrumbPage>
                )}

                {!item.isActive && (
                  <BreadcrumbLink
                    href={item.href || ''}
                    className={
                      isLast
                        ? '!text-green-500'
                        : 'text-dark-200 hover:text-dark-700 transition-colors'
                    }
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && (
                <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
