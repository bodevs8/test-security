import { ResponsiveView } from '@/components/ResponsiveView';
import { LIMIT_JACKPOT_GAMES, LIMIT_NEWS } from '@/constant/game';
import HomeContainer from '@/containers/desktop/home/HomeContainer';
import { GameTypeEnum, NewsCategoryEnum } from '@/enums';
import { getGames, getHotMatches, getPosts } from '@/services';
import { getUser } from '@/utils/user';

export const revalidate = 60;
export const dynamic = 'auto';

async function Page() {
  const [user, hotMatches, jackpotGames, posts] = await Promise.all([
    getUser(),
    getHotMatches(),
    getGames({
      limit: LIMIT_JACKPOT_GAMES,
      type: GameTypeEnum.NoHu,
    }),
    getPosts({
      limit: LIMIT_NEWS,
      page: 1,
      category: NewsCategoryEnum.News,
    }),
  ]);

  const userPackageId = user?.package_id;
  const news = posts?.posts || [];

  return (
    <ResponsiveView
      mobile={<div />}
      desktop={
        <HomeContainer
          hotMatches={hotMatches}
          jackpotGames={jackpotGames}
          userPackageId={userPackageId}
          posts={news}
        />
      }
    />
  );
}

export default Page;
