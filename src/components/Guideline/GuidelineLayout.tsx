'use client';

import type { PropsWithChildren } from 'react';
import { GuideSidebar } from '@/components/Guideline';
import { RouterPathEnum } from '@/enums';
import { getGuidelineBySlug } from '@/utils/guideline';
import { redirect, usePathname } from 'next/navigation';
import BreadCrumbGuideline from './BreadCrumbGuideline';

import GuidelineSection from './GuilineSection';

export function GuidelineLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const slug = pathname.replace('/', '');

  const guidelineContent = getGuidelineBySlug(slug);
  if (!guidelineContent) {
    redirect(RouterPathEnum.NotFound);
  }

  const pageTitle = guidelineContent['page-title'] || '';

  return (
    <div className="min-h-screen bg-primary-light-50 text-dark-200">
      <div className="x-container">
        <BreadCrumbGuideline slug={slug} className="!pt-6" />

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-[288px] flex-shrink-0">
            <GuideSidebar />
          </div>

          <GuidelineSection className="w-full">
            <div className="w-full flex-grow">
              <div className="p-10 bg-white rounded-lg w-full">
                <div className="text-2xl font-bold mb-6 uppercase text-dark-700">
                  {guidelineContent['page-title'] || pageTitle}
                </div>

                {children}
              </div>
            </div>
          </GuidelineSection>
        </div>
      </div>
    </div>
  );
}
