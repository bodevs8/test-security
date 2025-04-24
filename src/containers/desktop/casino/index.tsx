import type { LobbyInitialData } from '@/types/game';
import {
  CASINO_CATEGORY,
  LOBBY_GAME_LIST_LIMIT,
  LOBBY_GAME_LIST_LIMIT_MOBILE,
} from '@/constant/lobby';
import { CasinoContainer } from '@/containers/desktop/casino/CasinoContainer';
import { RouterPathEnum } from '@/enums';
import { getCasinoGameList, getGameProviders } from '@/services';
import { getDeviceInfo } from '@/utils/device';
import { getUser } from '@/utils/user';
import { redirect } from 'next/navigation';

type Props = {
  category: string;
  searchParams: {
    partner: string;
    keyword: string;
  };
};

export default async function CasinoWrapper({ category, searchParams }: Props) {
  const currentCategory = CASINO_CATEGORY.find(
    (item) => item.slugKey === category,
  );

  if (!currentCategory) {
    redirect(RouterPathEnum.NotFound);
  }

  const { isMobile } = await getDeviceInfo();
  const gameLimit = isMobile
    ? LOBBY_GAME_LIST_LIMIT_MOBILE
    : LOBBY_GAME_LIST_LIMIT;

  const searchGameParams = {
    ...searchParams,
    limit: gameLimit,
    type: currentCategory.type,
    page: 1,
  };
  const [gameList, gameProviders, user] = await Promise.all([
    getCasinoGameList(searchGameParams),
    getGameProviders({}),
    getUser(),
  ]);

  const initialData: LobbyInitialData = {
    gameList,
    gameProviders,
    params: searchGameParams,
  };

  return (
    <CasinoContainer
      currentCategory={currentCategory}
      initialData={initialData}
      isLoggedIn={!!user}
    />
  );
}
