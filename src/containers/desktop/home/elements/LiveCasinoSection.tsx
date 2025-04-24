import type { LiveCasinoGame, LiveCasinoSmallThumb } from '@/types/game';
import { BaseSection } from '@/components/BaseSection';
import { LiveCasinoItem } from '@/components/LiveCasinoItem';
import LiveCasinoSmall from '@/components/LiveCasinoSmall/LiveCasinoSmall';
import { LIVE_CASINO_GAME_LIST, LIVE_CASINO_GAMES } from '@/constant/game';
import { RouterPathEnum } from '@/enums';
import React from 'react';

const LiveCasinoSection = () => {
  return (
    <div className="w-full mt-10 mb-5">
      <BaseSection
        title="Live Casino"
        iconName="live-casino"
        loadMoreHref={RouterPathEnum.LiveCasino}
      />
      <div className="mt-2.5 grid grid-cols-3 gap-2.5">
        {LIVE_CASINO_GAMES.map((item: LiveCasinoGame, index: number) => (
          <LiveCasinoItem key={index} {...item} priority showSound />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-5 gap-3 xl:gap-4 2xl:gap-5">
        {LIVE_CASINO_GAME_LIST.map(
          (item: LiveCasinoSmallThumb, index: number) => (
            <LiveCasinoSmall key={index} {...item} />
          ),
        )}
      </div>
    </div>
  );
};

export default LiveCasinoSection;
