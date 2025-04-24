'use client';

import { PromotionCard } from '@/components/PromotionCard';
import { Button } from '@/components/ui/button';
import { PROMOTION_PACKAGE } from '@/constant/promotion';
import { ButtonVariantsEnum, RouterPathEnum } from '@/enums';
import PromotionBanner from '@/public/images/promotion-applied/empty-pg-banner-mb.webp';
import AvailableIcon from '@/public/images/promotion/available-icon.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export const EmptyPackage = () => {
  const t = useTranslations('Pages.PromotionApplied.empty_banner');

  return (
    <div className="empty-package-container">
      <div className="relative rounded-[8px]">
        <Image
          src={PromotionBanner}
          alt="promotion-banner"
          className="w-full aspect-[732/308] rounded-[8px]  "
          width={732}
          height={308}
        />
        <div className="absolute top-0 left-0 size-full flex justify-between flex-col py-[5.641vw] px-[4.615vw] rounded-[8px]">
          <div>
            <div className="title-bg text-white h-[6.41vw] font-extrabold italic text-[3.59vw] leading-[140%] uppercase w-fit flex items-center justify-end pr-[2.051vw]">
              {t('title')}
            </div>
            <div className="sub-title-bg h-[8.462vw] text-white font-extrabold italic text-[5.128vw] leading-[140%] uppercase w-fit flex items-center pl-[3.077vw] whitespace-nowrap">
              {t('sub_title')}
            </div>
          </div>
          <Link prefetch={false} href={RouterPathEnum.Promotions}>
            <Button
              id="promotion-applied-detail"
              type="button"
              name="promotion-applied-detail"
              className="w-[29.231vw] h-[6.154vw] rounded-[4px]"
              variant={ButtonVariantsEnum.Secondary}
            >
              <p className="text-[3.077vw] uppercase leading-[100%]">
                {t('btn_detail')}
              </p>
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-4 pt-3">
        <div className="flex items-center py-1 mb-4 gap-1">
          <Image
            src={AvailableIcon}
            alt="Promotion Icon"
            width={18}
            height={18}
            className="mb-[2px] w-[4.615vw]"
          />
          <h2 className="uppercase text-green-500 font-bold text-[4.103vw] leading-[140%]">
            {t('available')}
          </h2>
        </div>
        {PROMOTION_PACKAGE.map((item, index) => {
          return (
            <Link
              key={index}
              href={`${RouterPathEnum.Promotions}/${item.slug}`}
              prefetch={false}
              className="block w-full rounded-[8px] overflow-hidden bg-white mb-[10px]"
            >
              <PromotionCard
                promotion={item}
                options={{
                  containerClassName: 'w-full h-auto',
                  bannerWidth: 366,
                  bannerHeight: 153,
                  imageClassName: 'rounded-[8px]',
                  tagTextClassName: '!text-[10px] font-medium',
                  tagClassName: '!h-[14px]',
                  titleClassName: '!text-[4.103vw]',
                  upToClassName: '!text-[2.564vw]',
                  upToContainerClassName: '!h-[5.128vw] !pl-3',
                  containerContentClassName: '!p-[5.128vw]',
                }}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
