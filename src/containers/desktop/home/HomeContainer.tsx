import type { GamesType, HotMatchType } from '@/types/game';
import type { NewsItemType } from '@/types/news';
import dynamic from 'next/dynamic';

const JackpotGameSection = dynamic(
  () => import('./elements/JackpotGameSection'),
);
const HotMatchSection = dynamic(() => import('./elements/HotMatchSection'));
const LiveCasinoSection = dynamic(() => import('./elements/LiveCasinoSection'));
const HotGames = dynamic(() => import('./elements/HotGames'));
const PromotionSection = dynamic(() => import('./elements/PromotionSection'));
const NewsSection = dynamic(() => import('./elements/NewSection'));

type Props = {
  hotMatches: HotMatchType[];
  jackpotGames: GamesType;
  userPackageId?: number | boolean;
  posts: NewsItemType[];
};

const HomeContainer = ({
  hotMatches,
  jackpotGames,
  userPackageId,
  posts,
}: Props) => {
  return (
    <div className="x-container">
      <HotMatchSection hotMatches={hotMatches} />
      <LiveCasinoSection />
      <HotGames />
      <PromotionSection userPackageId={userPackageId} />
      <JackpotGameSection jackpotGames={jackpotGames} />
      <NewsSection posts={posts} />
    </div>
  );
};

export default HomeContainer;
