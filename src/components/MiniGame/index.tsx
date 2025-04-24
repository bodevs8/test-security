/* eslint-disable ts/ban-ts-comment */
// @ts-nocheck
'use client';

import type { MiniGameProps } from '@/types/app';
import {
  MINIGAME_DESKTOP_DEFAULT_POSITION,
  MINIGAME_MOBILE_DEFAULT_POSITION,
} from '@/constant/constants';
import { useCallback, useEffect } from 'react';

const MiniGame: React.FC<MiniGameProps> = ({ isMobile, user }) => {
  const partnerKey = process.env.NEXT_PUBLIC_MINIGAME_PARTNER_KEY;

  const setMiniGamePosition = useCallback(() => {
    if (isMobile) {
      return MINIGAME_MOBILE_DEFAULT_POSITION;
    }
    return MINIGAME_DESKTOP_DEFAULT_POSITION;
  }, [isMobile]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.vgjt.info/js/mn.js';
    script.type = 'text/javascript';
    script.defer = true;
    document.head.appendChild(script);
    document.addEventListener('resize', setMiniGamePosition);

    return () => {
      document.head.removeChild(script);
      document.removeEventListener('resize', setMiniGamePosition);
    };
  }, [isMobile, setMiniGamePosition]);

  return (
    <c2-minigame
      className={isMobile ? 'c2-mini-mb' : 'c2-mini-pc'}
      pos={
        isMobile
          ? MINIGAME_MOBILE_DEFAULT_POSITION
          : MINIGAME_DESKTOP_DEFAULT_POSITION
      }
      token={user?.tp_token ?? null}
      partner={partnerKey}
    />
  );
};

export default MiniGame;
