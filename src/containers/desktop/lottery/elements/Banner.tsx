'use client';

import type { LotteryBannerType } from '@/types/lottery';
import { EmblaCarousel } from '@/components/EmblaCarousel';
import { Button } from '@/components/ui/button';
import { LOTTERY_BANNER } from '@/constant/lottery';
import { ButtonSizeEnum, ButtonVariantsEnum } from '@/enums';
import { useGameContext } from '@/hooks/contexts';
import { useDevice } from '@/hooks/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LotteryBanner = () => {
  const t = useTranslations('Pages.Lottery');
  const router = useRouter();
  const { openIframeGame } = useGameContext();
  const { isMobile, isTablet } = useDevice();

  const handleOpenLink = (item: LotteryBannerType) => {
    if (isMobile || isTablet) {
      if (item.apiUrl) {
        openIframeGame(item.link);
        return;
      }
      window.open(item.link, '_blank');
      return;
    }
    router.push(item.link);
  };

  const renderItem = (item: LotteryBannerType) => (
    <Link
      prefetch={false}
      href={item.link}
      className="relative aspect-[366/157] md:aspect-[416/206] md:w-[416px] block"
      key={item.link}
      onClick={(e) => {
        e.preventDefault();
        handleOpenLink(item);
      }}
    >
      <picture>
        <source srcSet={item.imageMb} media="(max-width: 767px)" />
        <img
          src={item.image}
          alt={t(item.title)}
          className="aspect-[366/157] md:aspect-[416/206] !object-contain w-full"
        />
      </picture>

      <div className="absolute flex flex-col items-start left-6 top-1/2 -translate-y-1/2 transform md:top-[42px] md:translate-y-0 md:left-6 w-full gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-primary-light-0 font-extrabold text-[6.15vw] md:text-2xl uppercase leading-[5.641vw] md:leading-[140%] italic mb-1">
            {t(item.title)}
          </h3>
          <p className="font-medium text-primary-light-0 leading-[5.128vw] md:leading-5 text-[3.59vw] md:text-sm mb-[1.026vw] md:mb-2">
            {t(item.description)}
          </p>
        </div>
        <Button
          id={item.title}
          name={item.title}
          variant={ButtonVariantsEnum.Secondary}
          size={ButtonSizeEnum.LG}
          className="w-[33.33vw] h-[8.21vw] text-[3.59vw] md:text-base md:h-10 md:w-[140px] capitalize"
        >
          {t('banner.button')}
        </Button>
      </div>
    </Link>
  );

  return (
    <div className="!pr-0 overflow-x-hidden">
      <section className="w-full">
        {isMobile && (
          <div className="flex flex-col md:flex-row gap-3">
            {LOTTERY_BANNER.map(renderItem)}
          </div>
        )}
        {!isMobile && (
          <EmblaCarousel
            id="lottery-banner"
            className="md:overflow-hidden"
            containerClassName="-ml-3 lg:-ml-6 pr-3 lg:pr-0"
            slideClassName="pl-3 lg:pl-6"
          >
            {LOTTERY_BANNER.map(renderItem)}
          </EmblaCarousel>
        )}
      </section>
    </div>
  );
};

export default LotteryBanner;
