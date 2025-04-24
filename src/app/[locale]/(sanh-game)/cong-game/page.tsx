import { LobbyGameContainer } from '@/containers/desktop/lobby';
import { GameCategoryEnum, GameSortEnum } from '@/enums';
import { getDeviceInfo } from '@/utils/device';

type Props = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    partner: string;
    keyword: string;
  }>;
};

export default async function GameNoHuPage({ searchParams }: Props) {
  const [{ isMobile }, resolveSearchParam] = await Promise.all([
    getDeviceInfo(),
    searchParams,
  ]);

  return (
    <LobbyGameContainer
      category={GameCategoryEnum.All}
      searchParams={{
        ...resolveSearchParam,
        filter: GameSortEnum.Hot,
        sort: GameSortEnum.Top,
      }}
      isMobile={isMobile}
    />
  );
}
