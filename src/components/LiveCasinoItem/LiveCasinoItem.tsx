'use client';
import type { LiveCasinoGame } from '@/types/game';

import NanoLiveStreamVideo from '@/components/LiveStreamVideo';
import Image from 'next/image';
import { useMemo } from 'react';

type LiveCasinoItemProps = LiveCasinoGame & {
  priority?: boolean;
  isMobile?: boolean;
  showSound?: boolean;
  isPlaying?: boolean;
};

export const LiveCasinoItem = (props: LiveCasinoItemProps) => {
  const {
    title,
    img,
    imgMobile,
    partner_provider,
    partner_game_id,
    priority = false,
    isMobile = false,
  } = props;

  const jackpotId = useMemo(
    () => `jackpot_${partner_provider}_${partner_game_id}`,
    [partner_provider, partner_game_id],
  );
  // const videoRef = useRef<LiveStreamVideoRef>(null);

  return (
    <div
      className="relative size-full aspect-[420/235] overflow-hidden"
      data-jackpot-id={jackpotId}
    >
      <Image
        src={isMobile ? imgMobile : img}
        alt={title}
        fill
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        className="!object-fill block h-full aspect-video w-full"
      />

      <NanoLiveStreamVideo
        {...props}
        bgUrl={isMobile ? imgMobile : img}
        autoPlay={priority}
      />
    </div>
  );
};
