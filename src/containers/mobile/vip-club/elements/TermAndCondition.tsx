'use client';

import { TabLineMenu } from '@/components/TabLineMenu';
import TermsImage from '@/public/images/vip-club/terms-image-mb.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { VipFaqs } from './VipFaqs';
import { VipTerms } from './VipTerms';

export const TermAndCondition = () => {
  const t = useTranslations('Pages.VipClub');
  const ref = useRef<HTMLDivElement>(null);

  const tabs = useMemo(
    () => [
      {
        id: 'terms',
        title: t('terms.title'),
        component: <VipTerms />,
      },
      {
        id: 'faq',
        title: t('faqs.title'),
        component: <VipFaqs onChange={onChange} />,
      },
    ],
    [t],
  );

  const [active, setActive] = useState(tabs[0]!.id);

  const renderComponent = useMemo(() => {
    return tabs.find((item) => item.id === active)?.component;
  }, [active, tabs]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [active]);

  function onChange(value: string) {
    if (value) {
      const element = document.getElementById(value);
      if (element) {
        setTimeout(() => {
          ref.current?.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }

  return (
    <div className="x-container">
      <div className="flex bg-white size-full flex-col">
        <div className="relative h-[60vw] aspect-[780/469]">
          <Image
            src={TermsImage}
            alt="Terms"
            width={780}
            height={469}
            className="object-cover size-full"
          />
        </div>
        <div className="rounded-[6px] w-full">
          <TabLineMenu
            items={tabs}
            defaultActive={active}
            tabLineMenuClassName="h-[40px] max-md:justify-center bg-white !gap-0 rounded-[6px] !border-primary-light-200 border-[1px]"
            tabClassName="!h-[40px] px-3 uppercase !text-[12px] lg:!text-base !font-bold leading-[140%] text-dark-200"
            onClick={(id) => setActive(id)}
            isFillContainer
          >
            <div className="mt-4 overflow-hidden" ref={ref}>
              {renderComponent}
            </div>
          </TabLineMenu>
        </div>
      </div>
    </div>
  );
};
