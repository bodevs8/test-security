'use client';

import { BaseBreadcrumb } from '@/components/BaseBreadcrumb';
import { GUIDELINE_MENUS } from '@/constant/app';
import { RouterPathEnum } from '@/enums';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

type BreadcrumbGuidelineProps = {
  slug: string;
  className?: string;
};

const BreadCrumbGuideline = ({ slug, className }: BreadcrumbGuidelineProps) => {
  const t = useTranslations();
  const breadcrumbItems = useMemo(() => {
    let categoryTitle = '';

    // Search in GUIDELINE_MENUS to get parent category
    for (const category of GUIDELINE_MENUS) {
      const item = category.items.find((item) => item.id === slug);
      if (item) {
        categoryTitle = category.title;
        break;
      }
    }

    // Breadcrumb items with parent category
    return [
      { label: t('Common.home'), href: RouterPathEnum.Home },
      { label: categoryTitle },
    ];
  }, [slug, t]);

  return (
    <BaseBreadcrumb
      items={breadcrumbItems}
      className={clsx('mb-6 pt-6 text-sm text-neutral-300', className)}
    />
  );
};

export default BreadCrumbGuideline;
