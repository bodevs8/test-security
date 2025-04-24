import { LobbyGameContainer } from '@/containers/desktop/lobby';
import { GameCategoryEnum } from '@/enums';
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

export default async function GameNhanhPage({ searchParams }: Props) {
  const [{ isMobile }, resolveSearchParam] = await Promise.all([
    getDeviceInfo(),
    searchParams,
  ]);

  return (
    <LobbyGameContainer
      category={GameCategoryEnum.FastGame}
      searchParams={resolveSearchParam}
      isMobile={isMobile}
    />
  );
}
