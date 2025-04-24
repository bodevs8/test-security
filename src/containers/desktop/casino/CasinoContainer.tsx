'use client';

import type { LobbyCategory, LobbyInitialData } from '@/types/game';
import { BaseBreadcrumb } from '@/components/BaseBreadcrumb';
import { DEFAULT_PAGINATE } from '@/constant/app';
import GameList from '@/containers/desktop/lobby/elements/GameList';
import { GameSortEnum, RouterPathEnum } from '@/enums';
import { useLobbyGames } from '@/hooks/lobby';
import { useTranslations } from 'next-intl';
import { memo, useEffect } from 'react';
import LobbyFilter from '../lobby/elements/LobbyFilter';
import LobbyType from '../lobby/elements/LobbyType';

type LobbyCasinoContainerProps = {
  currentCategory: LobbyCategory;
  initialData: LobbyInitialData;
  isLoggedIn: boolean;
};

export const CasinoContainer = memo(
  ({ currentCategory, initialData, isLoggedIn }: LobbyCasinoContainerProps) => {
    const {
      gameList,
      isPending,
      totalPage,
      requestParams,
      gameProvidersOptions,
      handleGetGameCasino,
    } = useLobbyGames(true, currentCategory, initialData);
    const t = useTranslations();

    const breadcrumbItems = [
      {
        label: t('Pages.Promotion.breadcrumb.home'),
        href: RouterPathEnum.Home,
      },
      {
        label: t('Common.menu.live_casino'),
        href: RouterPathEnum.Promotions,
      },
    ];

    useEffect(() => {
      if (isLoggedIn) {
        handleGetGameCasino(initialData.params, true);
      }
    }, []);

    return (
      <>
        <div className="x-container">
          <BaseBreadcrumb items={breadcrumbItems} className="my-4 lg:my-6" />
        </div>
        <LobbyType isCasino loading={isPending} requestParams={requestParams} />
        <LobbyFilter
          isCasino
          isLoading={isPending}
          gameProviders={gameProvidersOptions}
          params={requestParams}
          onFilterChange={(newQueryParams) => {
            handleGetGameCasino({
              ...requestParams,
              ...newQueryParams,
              page: DEFAULT_PAGINATE.currentPage,
            });
          }}
        />
        <GameList
          gameList={gameList}
          requestParams={requestParams}
          totalPages={totalPage}
          isFavorite={
            initialData.isFavoriteLobby ||
            requestParams.filter === GameSortEnum.Favorite
          }
          handleSearchGame={handleGetGameCasino}
          isLoading={isPending}
        />
      </>
    );
  },
);
