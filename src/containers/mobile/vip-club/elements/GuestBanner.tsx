import type { VipClubItem } from '@/types/vip-club';
import { EmblaCarousel } from '@/components/EmblaCarousel';
import GuestBannerImage from '@/public/images/vip-club/guest-banner-mb.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { VipSwiperItem } from './VipSwiperItem';

type Props = {
  vips: VipClubItem[];
};

export const GuestBanner = ({ vips }: Props) => {
  const t = useTranslations('Pages.VipClub.guest_banner');
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

  return (
    <div className="guest-banner-container">
      <div className="relative">
        <Image
          src={GuestBannerImage}
          alt="Guest Banner"
          className="object-cover aspect-[780/536] size-full max-w-[780px]"
          priority
          width={780}
          height={536}
        />
        <div className="absolute inset-0 x-container !pt-[8.205vw] md:!pt-[80px]">
          <div className="flex flex-col items-center justify-center max-w-[47.436vw]">
            <div className="title-background pr-[3.077vw] flex justify-end items-center w-full !h-[7.179vw]">
              <p className="text-[3.59vw] leading-[140%] font-extrabold uppercase text-white italic">
                {t('title')}
              </p>
            </div>
            <div className="title-background-reverse flex justify-start items-center pl-[6.154vw] w-full !h-[8.718vw]">
              <p className="text-[5.128vw] leading-[140%] font-extrabold uppercase title-brand italic">
                {brandName}
              </p>
            </div>
          </div>
          <div className="swiper-container mt-[7.692vw] md:mt-[80px]">
            <EmblaCarousel
              id="vip-swiper"
              className="overflow-hidden"
              containerClassName="-ml-5 lg:-ml-5"
              slideClassName="pl-5 lg:pl-5"
              dragFree
            >
              {vips?.map((vip, index) => (
                <VipSwiperItem key={index} vipItem={vip} />
              ))}
            </EmblaCarousel>
          </div>
        </div>
      </div>
    </div>
  );
};
