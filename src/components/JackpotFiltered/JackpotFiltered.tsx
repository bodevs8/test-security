import type { GamesType } from '@/types/game';
import { BaseSectionTitle } from '@/components/BaseSectionTitle';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { JackpotFilteredSwiper } from './JackpotFilteredSwiper';

type JackpotFilteredProps = {
  jackpotGames: GamesType;
  showTitle?: boolean;
};

export const JackpotFiltered = ({
  jackpotGames,
  showTitle = true,
}: JackpotFilteredProps) => {
  const t = useTranslations();
  const games = useMemo(() => jackpotGames?.items || [], [jackpotGames]);

  return (
    <div className="relative z-3">
      <div className="flex items-center justify-center lg:justify-between">
        {showTitle && (
          <BaseSectionTitle
            title={t('Pages.HomePage.jackpot.title')}
            iconName="jackpot"
            className="max-lg:!hidden"
          />
        )}
        <div className="flex items-center gap-3"></div>
      </div>
      <div className="mt-6">
        <JackpotFilteredSwiper games={games} />
      </div>
    </div>
  );
};
