'use client';

import { GameContext } from '@/contexts/game-context';
import { use } from 'react';

export const useGameContext = () => {
  const context = use(GameContext);

  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }

  return context;
};
