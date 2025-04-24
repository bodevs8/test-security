import { BaseSection } from '@/components/BaseSection';
import { HotGameItem } from '@/components/HotGameItem';

import { HOT_GAME_LIST } from '@/constant/game';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

const HotGames = () => {
  const t = useTranslations('Pages.HomePage.hot_games');

  const games = useMemo(() => {
    return HOT_GAME_LIST.sort((a, b) => {
      return a.orderOnPc - b.orderOnPc;
    });
  }, []);

  return (
    <div className="mt-10">
      <BaseSection
        title={t('title')}
        iconName="hot-game"
        contentClassName="mt-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 gap-x-3 lg:gap-3 xl:gap-4 2xl:gap-5 w-full overflow-hidden">
          {games.map((item, index) => (
            <HotGameItem key={item.id} item={item} priority={index < 5} />
          ))}
        </div>
      </BaseSection>
    </div>
  );
};

export default HotGames;
