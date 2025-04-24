'use client';

import type { PropsWithChildren } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GUIDELINE_MENUS } from '@/constant/app';
import HeaderGuidelineMobile from '@/containers/layout/elements/Header/HeaderGuidelineMobile';
import { RouterPathEnum } from '@/enums';
import { getGuidelineBySlug } from '@/utils/guideline';
import { redirect, usePathname, useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import BreadCrumbGuideline from './BreadCrumbGuideline';
import '@/styles/pages/guideline/index.scss';

export const GuidelineLayoutMobile = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname.replace('/', '');

  const guidelineContent = getGuidelineBySlug(slug);
  const [activeAccordion, setActiveAccordion] = useState<string | undefined>(
    slug,
  );

  if (!guidelineContent) {
    redirect(RouterPathEnum.NotFound);
  }

  const { activeCategory } = useMemo(() => {
    let activeCategory = null;
    let currentItemTitle = '';

    for (const menu of GUIDELINE_MENUS) {
      const currentItem = menu.items.find((item) => item.id === slug);
      if (currentItem) {
        activeCategory = menu.id;
        currentItemTitle = currentItem.title;
        break;
      }
    }
    return { activeCategory, currentItemTitle };
  }, [slug]);

  const handleClickItem = (itemId: string, e: React.MouseEvent) => {
    if (itemId !== slug) {
      e.preventDefault();
      e.stopPropagation();

      let isDirectUrl = false;

      for (const category of GUIDELINE_MENUS) {
        const item = category.items.find((item) => item.id === itemId);
        if (item) {
          isDirectUrl = !!item.isDirectUrl;
          break;
        }
      }

      const path = isDirectUrl ? `/${itemId}` : `/${itemId}`;

      router.push(path);
      return;
    }

    setActiveAccordion(activeAccordion === itemId ? undefined : itemId);
  };

  const handleAccordionChange = (value: string | undefined) => {
    setActiveAccordion(value);
  };

  return (
    <div className="w-full guideline-mobile-layout bg-primary-light-50 pt-[50px]">
      <HeaderGuidelineMobile />

      <div className="p-3 bg-primary-light-50">
        <BreadCrumbGuideline
          slug={slug}
          className="hidden lg:block !my-4 !pt-0"
        />

        {activeCategory && (
          <Accordion
            type="single"
            collapsible
            className="w-full text-dark-700 mb-4"
            value={activeAccordion}
            onValueChange={handleAccordionChange}
          >
            {GUIDELINE_MENUS.find(
              (menu) => menu.id === activeCategory,
            )?.items.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="bg-white rounded-lg"
              >
                <AccordionTrigger
                  className="flex w-full items-center justify-between py-3 px-3 font-medium transition-all bg-white"
                  onClick={(e) => handleClickItem(item.id, e)}
                >
                  <span>{item.title}</span>
                </AccordionTrigger>
                <AccordionContent className="px-3">
                  {item.id === slug && <div>{children}</div>}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};
