'use client';

import type { BaseBreadcrumbItem } from '@/components/BaseBreadcrumb';
import type { LobbyCategory, LobbyInitialData } from '@/types/game';
import { BaseBreadcrumb } from '@/components/BaseBreadcrumb';
import { DEFAULT_PAGINATE } from '@/constant/app';
import GameList from '@/containers/desktop/lobby/elements/GameList';
import LobbyFilter from '@/containers/desktop/lobby/elements/LobbyFilter';
import { useLobbyGames } from '@/hooks/lobby/use-lobby-games';
import { memo, useEffect, useState } from 'react';

type LobbyContainerProps = {
  currentCategory: LobbyCategory;
  initialData: LobbyInitialData;
  breadcrumbItems: BaseBreadcrumbItem[];
};

export const LobbyFavoriteContainer = memo(
  ({ currentCategory, initialData, breadcrumbItems }: LobbyContainerProps) => {
    const {
      gameList,
      isPending,
      requestParams,
      gameProvidersOptions,
      totalPage,
      handleGetGameFavorite,
    } = useLobbyGames(false, currentCategory, initialData);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        handleGetGameFavorite(initialData.params, true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, []);

    return (
      <>
        <div className="x-container">
          <BaseBreadcrumb items={breadcrumbItems} className="my-4 lg:my-6" />
        </div>
        <LobbyFilter
          isLoading={isPending || loading}
          gameProviders={gameProvidersOptions}
          params={requestParams}
          isFavorite
          hideSearch={
            !gameList.length && !requestParams.keyword && !requestParams.partner
          }
          onFilterChange={(newQueryParams) => {
            handleGetGameFavorite({
              ...requestParams,
              ...newQueryParams,
              page: DEFAULT_PAGINATE.currentPage,
            });
          }}
        />
        <GameList
          gameList={gameList}
          isFavorite
          totalPages={totalPage}
          handleSearchGame={handleGetGameFavorite}
          requestParams={requestParams}
          isLoading={isPending || loading}
        />
      </>
    );
  },
);
