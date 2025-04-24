import type { VipClubItem } from '@/types/vip-club';
import { EmblaCarousel } from '@/components/EmblaCarousel';
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
          src="/images/vip-club/guest-banner.webp"
          alt="Guest Banner"
          className="object-cover aspect-[1920/576] size-full min-h-[35.488vw] xl:min-h-[332px] guest-banner max-h-[600px]"
          priority
          width={1920}
          height={576}
        />
        <div className="absolute inset-0 x-container !pt-[5vw] 3xl:!pt-[137px]">
          <div className="flex flex-col items-center justify-center max-w-[26.615vw] 3xl:max-w-[511px]">
            <div className="title-background pr-[1.615vw] 3xl:pr-[31px] flex justify-end max-h-[79px] items-center max-w-[25.573vw]">
              <p className="text-[2.083vw] leading-[140%] font-extrabold uppercase text-white italic 3xl:text-[40px]">
                {t('title')}
              </p>
            </div>
            <div className="title-background-reverse flex justify-start max-h-[101px] items-center pl-[38px] w-full">
              <p className="text-[3.125vw] leading-[140%] font-extrabold uppercase title-brand italic 3xl:text-[60px]">
                {brandName}
              </p>
            </div>
          </div>
          <div className="swiper-container mt-[3.281vw] 3xl:mt-[64px]">
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
