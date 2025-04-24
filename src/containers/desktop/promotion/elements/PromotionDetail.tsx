'use client';

import type { PromotionDetailType } from '@/types/promotion';
import { BaseBreadcrumb } from '@/components/BaseBreadcrumb';
import { PromotionOther } from '@/components/PromotionOther/PromotionOther';
import { RenderSection } from '@/components/PromotionSection';
import { TrackingPromotionEvent } from '@/components/TrackingEvent';
import { PromotionBanner } from '@/containers/desktop/promotion/elements/PromotionBanner';
import {
  EmblaCarouselOrientationEnum,
  ModalIdEnum,
  RouterPathEnum,
} from '@/enums';
import { useModalStore, useUserStore } from '@/hooks/stores';
import { getDepositLinkByPromotion } from '@/utils/promotion';
import React, { useCallback } from 'react';

type Props = {
  data: PromotionDetailType;
  slug: string;
  userPackageId?: number | boolean;
};

export const PromotionDetail = ({ data, slug, userPackageId }: Props) => {
  const { isLoggedIn } = useUserStore((state) => state);
  const modalStore = useModalStore((state) => state);
  const handleButtonClick = useCallback(() => {
    if (!isLoggedIn) {
      modalStore.openModal(ModalIdEnum.Login, true);
    }
  }, [isLoggedIn, modalStore]);

  const breadcrumbItems = [
    { labelKey: 'Pages.Promotion.breadcrumb.home', href: RouterPathEnum.Home },
    {
      labelKey: 'Pages.Promotion.breadcrumb.promotion',
      href: RouterPathEnum.Promotions,
    },
    {
      label: data?.title,
      href: `${RouterPathEnum.Promotions}/${data?.slug}`,
    },
  ];

  return (
    <div className="x-container !pb-[60px]">
      <TrackingPromotionEvent
        promotionId={slug}
        promotionName={data?.title ?? ''}
      />
      <BaseBreadcrumb items={breadcrumbItems} className="mb-6 pt-4" />
      <div className="flex flex-row gap-2 lg:gap-[24px]">
        <div className="max-w-[calc(100%-288px)] lg:max-w-[calc(100%-304px)] w-full rounded-[8px]">
          <PromotionBanner
            promotion={data}
            userPackageId={userPackageId}
            linkUrl={getDepositLinkByPromotion(data, isLoggedIn)}
            onClick={handleButtonClick}
          />
          <div className="p-3 md:p-4 xl:p-6 pb-10 bg-neutral-100 text-dark-700 overflow-hidden xl:overflow-visible rounded-[8px]">
            {data?.content.sections.map((section: any, index: number) => (
              <RenderSection key={index} section={section} />
            ))}
          </div>
        </div>
        <div className="w-full p-2 bg-white rounded-[12px] max-w-[288px] lg:max-w-[304px] lg:p-4 max-h-fit">
          <PromotionOther
            slug={slug}
            userPackageId={userPackageId}
            promotionClassName="mb-8"
            imageClassName="rounded-lg"
            containerClassName="mb-8 !h-[114px] max-w-[272px]"
            slideClassName="max-h-[114px]"
            orientation={EmblaCarouselOrientationEnum.Vertical}
            titleSectionClassName="pb-4"
            titleClassName="!text-dark-700 !text-sm"
          />
        </div>
      </div>
    </div>
  );
};
