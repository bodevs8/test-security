import type { StaticImageData } from 'next/image';
import GameBaiMB from '@/public/images/header/menu/mb/card.svg';
import CockFightMB from '@/public/images/header/menu/mb/cock-fight.svg';
import FastGameMB from '@/public/images/header/menu/mb/fast-game.svg';
import FavoriteMB from '@/public/images/header/menu/mb/favorite.svg';
import FishingMB from '@/public/images/header/menu/mb/fishing.svg';
import GateGameMB from '@/public/images/header/menu/mb/gate-game.svg';
import JackpotMB from '@/public/images/header/menu/mb/jackpot.svg';
import KenoMB from '@/public/images/header/menu/mb/keno.svg';
import LiveCasinoMB from '@/public/images/header/menu/mb/live-casino.svg';
import LoDeMB from '@/public/images/header/menu/mb/lo-de.svg';
import QuaySoMB from '@/public/images/header/menu/mb/quay-so.svg';
import SlotsMB from '@/public/images/header/menu/mb/slot.svg';
import SportMB from '@/public/images/header/menu/mb/sport.svg';
import TableGameMB from '@/public/images/header/menu/mb/table-game.svg';

export const HEADER_MENU_MB_IMAGES: Record<string, StaticImageData> = {
  sport: SportMB,
  liveCasino: LiveCasinoMB,
  gameBai: GameBaiMB,
  quaySo: QuaySoMB,
  keno: KenoMB,
  lode: LoDeMB,
  cockfight: CockFightMB,
  fishing: FishingMB,
  jackpot: JackpotMB,
  slots: SlotsMB,
  fastGame: FastGameMB,
  tableGame: TableGameMB,
  gateGame: GateGameMB,
  favorite: FavoriteMB,
};
