'use client';

import { TabLineMenu } from '@/components/TabLineMenu';
import TermsImage from '@/public/images/vip-club/terms-image.webp';
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
      <div className="flex bg-white size-full">
        <div className="relative max-h-[532px] h-[27.708vw] aspect-[878/1064]">
          <Image
            src={TermsImage}
            alt="Terms"
            width={878}
            height={1064}
            className="object-cover size-full"
          />
        </div>
        <div className="border-[1px] border-primary-light-200 backdrop-blur-[20px] rounded-[6px] p-6 w-full mt-[3.125vw] mb-[3.125vw]">
          <TabLineMenu
            items={tabs}
            defaultActive={active}
            tabLineMenuClassName="h-[40px] max-md:justify-center bg-white !gap-0 rounded-[6px] !border-primary-light-200 border-[1px]"
            tabClassName="!h-[40px] px-3 uppercase !text-[10px] lg:!text-base !font-bold leading-[140%] text-dark-200"
            onClick={(id) => setActive(id)}
            isFillContainer
          >
            <div className="mt-4 overflow-y-auto max-h-[15.885vw]" ref={ref}>
              {renderComponent}
            </div>
          </TabLineMenu>
        </div>
      </div>
    </div>
  );
};
