'use client';
import type { NearWinItem } from '@/types/game';
import { EmblaCarousel } from '@/components/EmblaCarousel';

import { GameItem } from '@/components/GameItem';
import { AUTO_PLAY_DELAY_SWIPER } from '@/constant/app';
import { formatNumberWithCommas } from '@/utils/format-currency';
import Autoplay from 'embla-carousel-autoplay';

type RecentWinSwiperProps = {
  recentWins: NearWinItem[];
};

export const RecentWinSwiper = ({ recentWins }: RecentWinSwiperProps) => {
  return (
    <EmblaCarousel
      id="recent-win-swiper"
      slideClassName="pl-2 lg:pl-[15.75px]"
      containerClassName="-ml-2 lg:-ml-[15.75px]"
      className="overflow-hidden"
      loop
      plugins={[
        Autoplay({
          delay: AUTO_PLAY_DELAY_SWIPER,
        }),
      ]}
      dragFree
    >
      {recentWins.map((slide: NearWinItem, index: number) => (
        <div
          key={index}
          className="w-[58px] md:w-[80px] lg:w-[123px] overflow-hidden"
        >
          <GameItem
            game={slide}
            containerClass="aspect-[54/68] w-[54px] md:aspect-[123/152] md:w-[80px] lg:!w-[123px] max-md:rounded-[4px]"
            imgClass="aspect-[54/68] w-[54px] md:aspect-[123/152] md:w-[80px] lg:!w-[123px] max-md:rounded-[4px] h-full"
            aspectRatioClass="!aspect-[54/68] md:!aspect-[123/152]"
            hideJackpot
            hideProvider
            hideGameName
            hideFavorite
          />
          <div className="w-full overflow-hidden mt-1 md:mt-2">
            <div className="text-[10px] leading-[15px] md:text-[14px] md:leading-5 text-white font-medium text-ellipsis overflow-hidden">
              {slide.username}
            </div>
            <div className="md:mt-1 text-yellow-100 font-bold text-[10px] leading-[15px] md:text-[14px] md:leading-[21px] whitespace-nowrap text-ellipsis overflow-hidden">
              {`${formatNumberWithCommas(slide.winlost, 'D')} `}
            </div>
          </div>
        </div>
      ))}
    </EmblaCarousel>
  );
};

export default RecentWinSwiper;
