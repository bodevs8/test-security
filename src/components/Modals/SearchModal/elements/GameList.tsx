import type { TypeGameItem } from '@/types/game';
import { GameItem, GameSkeleton } from '@/components/GameItem';
import { Pagination } from '@/components/Pagination';
import searchEmpty from '@/public/images/lobby/lobby-search-empty.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { memo, useCallback, useMemo } from 'react';

type Props = {
  itemLimit: number;
  isTyping: boolean;
  gameList: TypeGameItem[];
  totalPages: number;
  isLoading?: boolean;
  isMatchSearchCondition: boolean;
  currentPage: number;
  onChangePage?: (page: number) => void;
};

const GameList = memo(
  ({
    isTyping,
    itemLimit,
    gameList,
    totalPages,
    onChangePage,
    isLoading,
    isMatchSearchCondition,
    currentPage,
  }: Props) => {
    const t = useTranslations();

    const isShowEmpty = useMemo(() => {
      if (!isMatchSearchCondition) {
        return false;
      }

      if (isTyping) {
        return false;
      }

      return gameList.length === 0 && !isLoading;
    }, [isMatchSearchCondition, gameList.length, isLoading, isTyping]);

    const renderSkeletons = useCallback(() => {
      return (
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4 mt-4">
          <GameSkeleton count={itemLimit} />
        </div>
      );
    }, [itemLimit]);

    const renderContent = useCallback(() => {
      return (
        <>
          {isLoading && renderSkeletons()}
          {gameList.length > 0 && !isLoading && (
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9 gap-3 md:gap-4 mt-4">
              {gameList.map((game) => (
                <div
                  key={`${game.partner_provider}-${game.partner_game_id}`}
                  className="w-full"
                >
                  <GameItem
                    game={game}
                    containerClass="w-full"
                    aspectRatioClass="aspect-[1/1.2]"
                  />
                </div>
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-3 lg:mt-10">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onChangePage}
              />
            </div>
          )}
          {isShowEmpty && (
            <div className="text-center my-6">
              <Image
                src={searchEmpty}
                alt="no-game"
                width={120}
                className="mx-auto block w-[120px] p-1.5"
                height={120}
              />
              <p className="text-sub-title text-base font-normal mt-4 text-dark-200">
                {t('Common.empty.search')}
              </p>
            </div>
          )}
        </>
      );
    }, [
      isLoading,
      gameList,
      totalPages,
      currentPage,
      onChangePage,
      isShowEmpty,
      t,
      renderSkeletons,
    ]);

    return <section className="mb-6">{renderContent()}</section>;
  },
);

GameList.displayName = 'GameList';

export default GameList;
