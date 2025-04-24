'use client';

import type { BaseBreadcrumbItem } from '@/components/BaseBreadcrumb';
import type { LobbyCategory, LobbyInitialData } from '@/types/game';
import { BaseBreadcrumb } from '@/components/BaseBreadcrumb';
import { DEFAULT_PAGINATE } from '@/constant/app';
import GameList from '@/containers/desktop/lobby/elements/GameList';
import LobbyFilter from '@/containers/desktop/lobby/elements/LobbyFilter';
import LobbyType from '@/containers/desktop/lobby/elements/LobbyType';
import { GameSortEnum } from '@/enums';
import { useLobbyGames } from '@/hooks/lobby/use-lobby-games';
import { memo, useEffect } from 'react';

type LobbyContainerProps = {
  currentCategory: LobbyCategory;
  initialData: LobbyInitialData;
  breadcrumbItems: BaseBreadcrumbItem[];
  isLoggedIn: boolean;
};

export const LobbyContainerInner = memo(
  ({
    currentCategory,
    initialData,
    breadcrumbItems,
    isLoggedIn,
  }: LobbyContainerProps) => {
    const {
      gameList,
      isPending,
      requestParams,
      gameProvidersOptions,
      totalPage,
      handleGetGameRegular,
    } = useLobbyGames(false, currentCategory, initialData);

    useEffect(() => {
      if (isLoggedIn) {
        handleGetGameRegular(initialData.params, true);
      }
    }, []);

    return (
      <>
        <div className="x-container">
          <BaseBreadcrumb items={breadcrumbItems} className="my-4 lg:my-6" />
        </div>
        <LobbyType requestParams={requestParams} loading={isPending} />
        <LobbyFilter
          isLoading={isPending}
          gameProviders={gameProvidersOptions}
          params={requestParams}
          hideSearch={
            initialData.isFavoriteLobby &&
            !gameList.length &&
            !requestParams.keyword &&
            !requestParams.partner
          }
          onFilterChange={(newQueryParams) => {
            handleGetGameRegular({
              ...requestParams,
              ...newQueryParams,
              page: DEFAULT_PAGINATE.currentPage,
            });
          }}
        />
        <GameList
          gameList={gameList}
          isFavorite={requestParams.filter === GameSortEnum.Favorite}
          totalPages={totalPage}
          handleSearchGame={handleGetGameRegular}
          requestParams={requestParams}
          isLoading={isPending}
        />
      </>
    );
  },
);
