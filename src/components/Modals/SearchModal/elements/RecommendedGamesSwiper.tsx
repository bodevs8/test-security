import type { TypeGameItem } from '@/types/game';
import { EmblaCarousel } from '@/components/EmblaCarousel';
import { GameItem } from '@/components/GameItem';
import { Loading } from '@/components/Loading';
import { LIMIT_RECOMMENDED_GAMES } from '@/constant/app';
import { DEFAULT_GAME_RESPONSE } from '@/constant/game';
import {
  CarouselNavigationPositionEnum,
  GameSortEnum,
  QueryKeyEnum,
  RouterPathEnum,
} from '@/enums';
import { useDevice } from '@/hooks/utils';
import { getGames } from '@/services/client';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

const RecommendedGamesSwiper = () => {
  const t = useTranslations();
  const { isMobile, isTablet } = useDevice();
  const { data: games = DEFAULT_GAME_RESPONSE, isLoading } = useQuery({
    queryKey: [QueryKeyEnum.RecommendedGames],
    queryFn: () =>
      getGames({
        sort: GameSortEnum.Recommended,
        limit: LIMIT_RECOMMENDED_GAMES,
      }),
  });

  const isMobileDevice = isMobile || isTablet;

  return (
    <div className="relative min-h-[208px] overflow-hidden">
      {isLoading && <Loading />}
      <EmblaCarousel
        id="recommended-games"
        slideClassName="aspect-[141/208] !w-[82px] sm:!w-[151px] mr-2 lg:mr-4"
        containerClassName="-mr-2 lg:-mr-4"
        navigation={{
          position: CarouselNavigationPositionEnum.BOTTOM,
          classNamePrev: clsx('recommended-games-swiper-nav-prev', {
            hidden: isMobileDevice,
          }),
          classNameNext: clsx('recommended-games-swiper-nav-next', {
            hidden: isMobileDevice,
          }),
        }}
        sectionTitle={{
          title: t('Modals.SearchModal.recommended_games'),
          loadMoreHref: isMobileDevice ? RouterPathEnum.Slots : '',
        }}
        pagination={
          isMobileDevice
            ? {
                dynamicBullets: true,
                className:
                  'hidden absolute bottom-[-22px] left-1/2 transform -custom-translate-x-1/2 z-3 !mt-0',
              }
            : undefined
        }
      >
        {games?.items?.map((slide: TypeGameItem, index: number) => (
          <GameItem
            key={index}
            game={slide}
            aspectRatioClass="aspect-[131/178]"
            containerClass="!w-[82px] sm:!w-[151px]"
          />
        ))}
      </EmblaCarousel>
    </div>
  );
};

export default RecommendedGamesSwiper;
