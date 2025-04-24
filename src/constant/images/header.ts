import type { StaticImageData } from 'next/image';
import GameBaiPC from '@/public/images/header/menu/pc/card.svg';
import CockFightPC from '@/public/images/header/menu/pc/cock-fight.svg';
import FastGamePC from '@/public/images/header/menu/pc/fast-game.svg';
import FavoritePC from '@/public/images/header/menu/pc/favorite.svg';
import FishingPC from '@/public/images/header/menu/pc/fishing.svg';
import GateGamePC from '@/public/images/header/menu/pc/gate-game.svg';
import JackpotPC from '@/public/images/header/menu/pc/jackpot.svg';
import KenoPC from '@/public/images/header/menu/pc/keno.svg';
import LiveCasinoPC from '@/public/images/header/menu/pc/live-casino.svg';
import LoDePC from '@/public/images/header/menu/pc/lo-de.svg';
import QuaySoPC from '@/public/images/header/menu/pc/quay-so.svg';
import SlotsPC from '@/public/images/header/menu/pc/slot.svg';
import SportPC from '@/public/images/header/menu/pc/sport.svg';
import TableGamePC from '@/public/images/header/menu/pc/table-game.svg';

export const HEADER_MENU_PC_IMAGES: Record<string, StaticImageData> = {
  sport: SportPC,
  liveCasino: LiveCasinoPC,
  gameBai: GameBaiPC,
  quaySo: QuaySoPC,
  keno: KenoPC,
  lode: LoDePC,
  cockfight: CockFightPC,
  fishing: FishingPC,
  jackpot: JackpotPC,
  slots: SlotsPC,
  fastGame: FastGamePC,
  tableGame: TableGamePC,
  gateGame: GateGamePC,
  favorite: FavoritePC,
};
