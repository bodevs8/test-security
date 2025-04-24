'use client';

import type { JackpotGameItem, TypeGameItem } from '@/types/game';
import { createContext } from 'react';

// Create context
export type GameContextType = {
  openGame: (game: TypeGameItem) => Promise<boolean | void>;
  getFrameUrl: (url: string) => Promise<any>;
  openIframeGame: (url: string) => Promise<void>;
  favoriteGame: (game: TypeGameItem) => Promise<boolean | void>;
  unfavoriteGame: (game: TypeGameItem) => Promise<boolean | void>;
  jackpotValidGames: JackpotGameItem[];
  totalJackpot: number;
};

export const GameContext = createContext<GameContextType | null>(null);
