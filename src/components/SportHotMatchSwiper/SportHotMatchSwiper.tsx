'use client';
import type { HotMatchType } from '@/types/game';
import { EmblaCarousel } from '@/components/EmblaCarousel';
import { AUTO_PLAY_DELAY_SWIPER } from '@/constant/app';
import clsx from 'clsx';
import Autoplay from 'embla-carousel-autoplay';
import { HotMatchItem } from '../HotMatchItem';

type SportHotMatchSwiperProps = {
  hotMatches: HotMatchType[];
  gridRows?: number;
  slidesPerView: number | 'auto' | undefined;
  loop?: boolean;
  slideClassName?: string;
  contentClassName?: string;
  containerClassName?: string;
  className?: string;
  isMobile?: boolean;
};

export const SportHotMatchSwiper = ({
  hotMatches,
  gridRows = 1,
  slideClassName,
  contentClassName,
  className,
  containerClassName,
  loop = false,
  isMobile,
}: SportHotMatchSwiperProps) => {
  return (
    <div className={clsx('h-full w-full')}>
      <EmblaCarousel
        id="sport-hot-match-swiper"
        className={className}
        grid={{
          rows: gridRows,
        }}
        opts={{
          align: 'start',
          dragFree: true,
        }}
        containerClassName={clsx('-mr-3 md:-mr-6', containerClassName)}
        slideClassName={clsx(
          'mr-3 md:mr-6 aspect-[366/150] w-[366px] lg:aspect-[418/149] lg:w-[418px]',
          slideClassName,
        )}
        contentClassName={contentClassName}
        loop={loop}
        plugins={[
          Autoplay({
            delay: AUTO_PLAY_DELAY_SWIPER,
          }),
        ]}
      >
        {hotMatches.map((slide: any, index: number) => (
          <HotMatchItem
            key={index}
            item={slide}
            className="w-[366px] lg:w-[418px] h-fit"
            priority={isMobile ? index < 2 : index < 4}
          />
        ))}
      </EmblaCarousel>
    </div>
  );
};
