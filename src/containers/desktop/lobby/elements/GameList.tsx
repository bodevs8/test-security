/* eslint-disable react-hooks/exhaustive-deps */
import type { RequestParams, TypeGameItem } from '@/types/game';
import { GameItem, GameSkeleton } from '@/components/GameItem';
import { Loading } from '@/components/Loading';
import { Pagination } from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { ButtonVariantsEnum, GameSortEnum, RouterPathEnum } from '@/enums';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

type Props = {
  gameList: TypeGameItem[];
  totalPages: number;
  isLoading?: boolean;
  isFavorite?: boolean;
  pageSize?: number;
  gridClass?: string;
  handleSearchGame: (request: RequestParams) => void;
  requestParams: RequestParams;
  isCasino?: boolean;
};

const GameList = ({
  handleSearchGame,
  gameList,
  totalPages,
  isLoading,
  isFavorite,
  gridClass,
  pageSize,
  requestParams,
  isCasino,
}: Props) => {
  const t = useTranslations();
  const router = useRouter();

  const isLastItemOnPage = useMemo(
    () => gameList.length === 1 && (requestParams.page ?? 1) > 1,
    [gameList.length, requestParams.page],
  );

  const isFavoriteInLobby = useMemo(
    () => Boolean(requestParams.type) && isFavorite,
    [requestParams.type, isFavorite],
  );

  const isRecentGames = useMemo(
    () => requestParams.sort === GameSortEnum.Recent,
    [requestParams.sort],
  );

  const isFiltering = useMemo(
    () => Boolean(requestParams.keyword || requestParams.partner),
    [requestParams.keyword, requestParams.partner],
  );

  const handleUnfavorite = useCallback(() => {
    handleSearchGame({
      ...requestParams,
      filter: GameSortEnum.Favorite,
      keyword:
        gameList.length === 1 && requestParams.keyword
          ? ''
          : requestParams.keyword || '',
      partner:
        gameList.length === 1 && requestParams.partner
          ? ''
          : requestParams.partner || '',
      page: isLastItemOnPage
        ? (requestParams.page ?? 1) - 1
        : (requestParams.page ?? 1),
    });
  }, [gameList.length, handleSearchGame, isLastItemOnPage, requestParams]);

  const emptyStateImage = (imagePath: string) => (
    <Image
      src={imagePath}
      alt={`Empty state - ${imagePath.includes('favorite') ? 'No favorite games' : 'No games available'}`}
      width={120}
      className="mx-auto"
      height={120}
    />
  );

  const emptyStateText = (isFiltering: boolean, defaultMessage: string) => (
    <p className="text-dark-200 text-sm leading-5 mt-3">
      {isFiltering ? t('Pages.Lobby.empty.search') : defaultMessage}
    </p>
  );
  // Todo
  const renderedEmptyList = useMemo(() => {
    if (!isFiltering) {
      if (isRecentGames) {
        return (
          <>
            {emptyStateImage('/images/lobby/lobby-empty-game.webp')}
            {emptyStateText(false, t('Pages.Lobby.game_category.recent.empty'))}
            <Button
              id="recent-add"
              name="recent-add"
              variant={ButtonVariantsEnum.Secondary}
              className="mt-6 mx-auto w-[153px] max-lg:text-sm max-lg:gap-2 capitalize"
              onClick={() => {
                handleSearchGame({
                  ...requestParams,
                  filter: GameSortEnum.Hot,
                  sort: GameSortEnum.Top,
                  keyword: '',
                  partner: '',
                });
              }}
            >
              {t('Common.button.play_now')}
            </Button>
          </>
        );
      }

      if (isFavorite) {
        return (
          <>
            {emptyStateImage('/images/lobby/lobby-empty-game.webp')}
            {emptyStateText(
              false,
              t('Pages.Lobby.game_category.favorite.empty'),
            )}
            <Button
              id="favorite-add"
              name="favorite-add"
              variant={ButtonVariantsEnum.Secondary}
              className="mt-6 mx-auto w-[197px] max-lg:h-[32px] max-lg:w-[155px] max-lg:text-sm max-lg:gap-2 capitalize"
              onClick={() => {
                if (isFavoriteInLobby) {
                  handleSearchGame({
                    ...requestParams,
                    filter: '',
                    sort: '',
                    partner: '',
                    keyword: '',
                  });
                  return;
                }
                router.push(RouterPathEnum.LiveCasino);
              }}
            >
              <i className="icon-plus text-base"></i>
              {t('Pages.Lobby.game_category.favorite.add_favorite')}
            </Button>
          </>
        );
      }

      return (
        <>
          {emptyStateImage('/images/lobby/lobby-no-data.webp')}
          {emptyStateText(isFiltering, t('Pages.Lobby.empty.title'))}
        </>
      );
    }

    return (
      <>
        {emptyStateImage('/images/lobby/lobby-search-empty.webp')}
        {emptyStateText(isFiltering, t('Pages.Lobby.empty.search'))}
      </>
    );
  }, [
    isRecentGames,
    isFavorite,
    isFiltering,
    isFavoriteInLobby,
    t,
    requestParams,
    handleSearchGame,
    router,
  ]);

  const gameGrid = useMemo(
    () => (
      <div
        className={
          gridClass ||
          clsx(
            'grid mt-4 lg:mt-6',
            'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-7',
            'gap-3 md:gap-4 2xl:gap-5',
          )
        }
      >
        {isLoading && !isCasino && (
          <GameSkeleton count={gameList.length || pageSize} />
        )}
        {isLoading && isCasino && (
          <div className="h-[calc(100vh-100px)] -z-0">
            <Loading />
          </div>
        )}
        {!isLoading &&
          gameList.map((game, index) => (
            <div key={`${game.image}-${index}`}>
              <GameItem
                game={game}
                onUnfavoriteItem={
                  isFavorite || requestParams.filter === GameSortEnum.Favorite
                    ? handleUnfavorite
                    : undefined
                }
                hideGameName
              />
            </div>
          ))}
      </div>
    ),
    [
      isLoading,
      gameList,
      pageSize,
      isFavorite,
      requestParams.filter,
      handleUnfavorite,
    ],
  );

  const pagination = useMemo(() => {
    if (!totalPages || totalPages <= 1 || isLoading) return null;

    return (
      <div className="flex justify-center items-center mt-4 md:mt-6">
        <Pagination
          totalPages={totalPages}
          currentPage={requestParams.page || 1}
          onPageChange={(page) =>
            handleSearchGame({
              ...requestParams,
              page,
            })
          }
        />
      </div>
    );
  }, [isLoading, totalPages, requestParams, handleSearchGame]);

  return (
    <section className="x-container relative !pb-[80px] md:!pb-0">
      {(isLoading || gameList.length > 0) && (
        <>
          {gameGrid}
          {pagination}
        </>
      )}
      {!isLoading && !gameList.length && (
        <div className="text-center mt-[64px] md:min-h-[300px] md:mt-6 text-dark-200 flex items-center justify-center flex-col">
          {renderedEmptyList}
        </div>
      )}
    </section>
  );
};

export default GameList;
