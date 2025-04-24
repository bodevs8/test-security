import type { SocketContextType } from '@/types/socket';
import { createContext } from 'react';

export const SocketContext = createContext<SocketContextType>({
  jackpots: {},
  b52Views: null,
  goViews: null,
  b52Jackpot: null,
  goJackpot: null,
  jackpotGb: {},
  setB52Jackpot: () => { },
  setGoJackpot: () => { },
});
