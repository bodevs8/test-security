import type { LobbyInitialData } from '@/types/game';
import { DEFAULT_GAME_RESPONSE } from '@/constant/game';
import {
  LOBBY_FAVORITE_CATEGORY,
  LOBBY_GAME_LIST_LIMIT,
  LOBBY_GAME_LIST_LIMIT_MOBILE,
} from '@/constant/lobby';
import { LobbyFavoriteContainer } from '@/containers/desktop/lobby/LobbyFavoriteContainer';
import { GameSortEnum, LobbyTypeEnum, RouterPathEnum } from '@/enums';
import { getDeviceInfo } from '@/utils/device';

export default async function YeuThichPage() {
  const [{ isMobile }] = await Promise.all([getDeviceInfo()]);
  const gameLimit = isMobile
    ? LOBBY_GAME_LIST_LIMIT_MOBILE
    : LOBBY_GAME_LIST_LIMIT;

  const initialData: LobbyInitialData = {
    gameList: DEFAULT_GAME_RESPONSE,
    params: {
      lobbyType: LobbyTypeEnum.ALL,
      filter: GameSortEnum.Favorite,
      limit: gameLimit,
      page: 1,
    },
    isFavoriteLobby: true,
    gameProviders: {},
  };

  const breadcrumbItems = [
    {
      labelKey: 'Common.menu.home',
      href: RouterPathEnum.Home,
    },
    {
      labelKey: LOBBY_FAVORITE_CATEGORY.title,
      href: LOBBY_FAVORITE_CATEGORY.link,
    },
  ];

  return (
    <LobbyFavoriteContainer
      initialData={initialData}
      breadcrumbItems={breadcrumbItems}
      currentCategory={LOBBY_FAVORITE_CATEGORY}
    />
  );
}
