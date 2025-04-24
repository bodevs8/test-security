'use client';
import type { GamesType } from '@/types/game';
import { BaseSection } from '@/components/BaseSection';
import { GameItem } from '@/components/GameItem';
import { CategoryTypeEnum, RouterPathEnum } from '@/enums';
import { useUseJackpotGames } from '@/hooks/useQueries/use-jackpot-games';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

type Props = {
  jackpotGames: GamesType;
};

const JackpotGameSection = ({ jackpotGames }: Props) => {
  const t = useTranslations();
  const { data: clientJackpotGames } = useUseJackpotGames();

  const games = useMemo(() => {
    if (clientJackpotGames?.items) {
      return clientJackpotGames?.items || [];
    }

    return jackpotGames?.items || [];
  }, [jackpotGames, clientJackpotGames]);

  if (!games || games.length === 0) return null;

  return (
    <div className="mt-10">
      <BaseSection
        title={t('Pages.HomePage.jackpot.title')}
        iconName="jackpot"
        loadMoreHref={RouterPathEnum.Jackpot}
        contentClassName="mt-5"
      >
        <div className="grid grid-cols-7 gap-2 lg:gap-3 xl:gap-4 2xl:gap-5">
          {games.map((game, index) => (
            <GameItem
              key={`${game.id}-${game.is_favorite}-${index}`}
              game={game}
              containerClass="w-full aspect-[168/221]"
              imgClass="aspect-[168/221]"
              tagType={CategoryTypeEnum.Hot}
              priority={false}
            />
          ))}
        </div>
      </BaseSection>
    </div>
  );
};

export default JackpotGameSection;
