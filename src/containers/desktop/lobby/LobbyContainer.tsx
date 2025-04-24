import type { GameCategoryEnum } from '@/enums';
import type { LobbyInitialData, RequestParams } from '@/types/game';
import {
  LOBBY_CATEGORY,
  LOBBY_GAME_LIST_LIMIT,
  LOBBY_GAME_LIST_LIMIT_MOBILE,
} from '@/constant/lobby';
import { LobbyContainerInner } from '@/containers/desktop/lobby/LobbyContainerInner';
import { GameSortEnum, LobbyTypeEnum, RouterPathEnum } from '@/enums';
import { getFavoriteGames, getGameProviders, getGames } from '@/services';
import { getUser } from '@/utils/user';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: RequestParams;
  isMobile: boolean;
  category: GameCategoryEnum;
  isFavoriteLobby?: boolean;
};

export const LobbyGameContainer = async ({
  searchParams,
  isMobile,
  category,
  isFavoriteLobby,
}: Props) => {
  const currentCategory = LOBBY_CATEGORY.find((item) => item.type === category);

  if (!currentCategory) {
    return redirect(RouterPathEnum.NotFound);
  }

  const breadcrumbItems = [
    {
      labelKey: 'Common.menu.home',
      href: RouterPathEnum.Home,
    },
    {
      labelKey: currentCategory.title,
      href: currentCategory.link,
    },
  ];

  const gameLimit = isMobile
    ? LOBBY_GAME_LIST_LIMIT_MOBILE
    : LOBBY_GAME_LIST_LIMIT;

  const searchGameParams = isFavoriteLobby
    ? {
        lobbyType: LobbyTypeEnum.ALL,
        filter: GameSortEnum.Favorite,
        limit: gameLimit,
        page: 1,
      }
    : {
        ...searchParams,
        limit: gameLimit,
        type: currentCategory.type,
        page: 1,
      };

  const [gameList, gameProviders, user] = await Promise.all([
    (isFavoriteLobby ? getFavoriteGames : getGames)(searchGameParams),
    getGameProviders({}),
    getUser(),
  ]);

  const initialData: LobbyInitialData = {
    gameList,
    gameProviders,
    params: searchGameParams,
    isFavoriteLobby,
  };

  return (
    <LobbyContainerInner
      breadcrumbItems={breadcrumbItems}
      currentCategory={currentCategory}
      initialData={initialData}
      isLoggedIn={!!user}
    />
  );
};
