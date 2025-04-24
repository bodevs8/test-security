import type { TypeGameItem } from '@/types/game';
import { EmblaCarousel } from '@/components/EmblaCarousel';
import { GameItem } from '@/components/GameItem';
import { CarouselNavigationPositionEnum } from '@/enums';
import '@/styles/pages/home/jackpot-filtered.scss';
import '@/styles/responsive/pages/home/jackpot-filtered-responsive.scss';

type JackpotFilteredSwiperProps = {
  games: TypeGameItem[];
};

export const JackpotFilteredSwiper = ({
  games,
}: JackpotFilteredSwiperProps) => {
  return (
    <EmblaCarousel
      containerClassName="-ml-2 md:-ml-3 lg:-ml-4"
      slideClassName="pl-2 md:pl-3 lg:pl-4"
      pagination={{
        className: 'h-[8px] overflow-hidden w-[70px]',
        dynamicBullets: true,
      }}
      navigation={{
        classNameNext:
          'max-md:hidden filtered-swiper-button-next max-xl:!hidden',
        classNamePrev:
          'max-md:hidden filtered-swiper-button-prev max-xl:!hidden',
        position: CarouselNavigationPositionEnum.BOTTOM,
        className: 'filtered-custom-swiper',
      }}
      dragFree
      id="jackpot-filtered-swiper"
    >
      {games.map((slide: TypeGameItem, index: number) => (
        <GameItem
          key={index}
          game={slide}
          rankingNumber={index < 5 ? index + 1 : null}
          containerClass="aspect-[114/168] !w-[114px] md:aspect-[215/320] md:!w-[160px] lg:!w-[215px]"
        />
      ))}
    </EmblaCarousel>
  );
};
