import type { LobbyCategory } from '@/types/game';
import {
  CasinoCategoryEnum,
  CasinoLinkEnum,
  CasinoSlugEnum,
  CockfightQueryEnum,
  GameCategoryEnum,
  GamePartnerKeyEnum,
  GameSortEnum,
  RouterPathEnum,
} from '@/enums';

import BaccaratIcon from '@/public/icons/lobby/baccarat.svg';
import BauCuaIcon from '@/public/icons/lobby/bau-cua.svg';
import BlackjackIcon from '@/public/icons/lobby/blackjack.svg';
import IconAll from '@/public/icons/lobby/icon-all.svg';
import IconCardGame from '@/public/icons/lobby/icon-card-game.svg';
import IconCockFight from '@/public/icons/lobby/icon-cock-fight.svg';
import IconFishing from '@/public/icons/lobby/icon-fishing.svg';
import IconJackpot from '@/public/icons/lobby/icon-jackpot.svg';
import IconKeno from '@/public/icons/lobby/icon-keno.svg';
import IconLottery from '@/public/icons/lobby/icon-lottery.svg';
import IconNumberGame from '@/public/icons/lobby/icon-number-game.svg';
import IconQuickGame from '@/public/icons/lobby/icon-quick-game.svg';
import IconSlots from '@/public/icons/lobby/icon-slots.svg';
import IconTableGame from '@/public/icons/lobby/icon-table-game.svg';
import OtherIcon from '@/public/icons/lobby/other.svg';
import PokerIcon from '@/public/icons/lobby/poker.svg';
import RongHoIcon from '@/public/icons/lobby/rong-ho.svg';
import RouletteIcon from '@/public/icons/lobby/roulette.svg';
import TaiXiuIcon from '@/public/icons/lobby/tai-xiu.svg';
import XocDiaIcon from '@/public/icons/lobby/xocdia.svg';

export const MIN_SEARCH_LENGTH = 2;

export const LOBBY_FAVORITE_CATEGORY: LobbyCategory = {
  type: GameCategoryEnum.Favorite,
  partnerKey: GamePartnerKeyEnum.Favorite,
  title: 'Pages.Lobby.game_category.favorite.title',
  link: RouterPathEnum.Favorite,
  icon: 'icon-favorite',
  iconSvg: '',
};

export const LOBBY_CATEGORY: LobbyCategory[] = [
  {
    type: GameCategoryEnum.All,
    partnerKey: GamePartnerKeyEnum.CardGame,
    title: 'Pages.Lobby.game_category.all.title',
    link: RouterPathEnum.LobbyGame,
    icon: 'icon-all',
    iconSvg: IconAll,
  },
  {
    type: GameCategoryEnum.CardGame,
    partnerKey: GamePartnerKeyEnum.CardGame,
    title: 'Pages.Lobby.game_category.game_cards.title',
    link: RouterPathEnum.GameBai,
    icon: 'icon-card-game',
    iconSvg: IconCardGame,
  },
  {
    type: GameCategoryEnum.NumberGame,
    partnerKey: GamePartnerKeyEnum.NumberGame,
    title: 'Pages.Lobby.game_category.number_game.title',
    link: RouterPathEnum.QuaySo,
    icon: 'icon-number-game',
    iconSvg: IconNumberGame,
  },
  {
    type: GameCategoryEnum.Keno,
    partnerKey: GamePartnerKeyEnum.Keno,
    title: 'Pages.Lobby.game_category.keno.title',
    link: RouterPathEnum.Keno,
    icon: 'icon-keno',
    iconSvg: IconKeno,
  },
  {
    type: GameCategoryEnum.Lottery,
    partnerKey: GamePartnerKeyEnum.Lottery,
    title: 'Pages.Lobby.game_category.lottery.title',
    link: RouterPathEnum.Lottery,
    icon: 'icon-lottery',
    iconSvg: IconLottery,
    isLobby: true,
  },
  {
    type: GameCategoryEnum.CockFight,
    partnerKey: GamePartnerKeyEnum.CockFight,
    title: 'Pages.Lobby.game_category.cock_fight.title',
    link: RouterPathEnum.Cockfight,
    icon: 'icon-cock-fight',
    iconSvg: IconCockFight,
    isLobby: true,
  },
  {
    type: GameCategoryEnum.Fishing,
    partnerKey: GamePartnerKeyEnum.Fishing,
    title: 'Pages.Lobby.game_category.fishing.title',
    link: RouterPathEnum.Fishing,
    icon: 'icon-fishing',
    iconSvg: IconFishing,
  },
  {
    type: GameCategoryEnum.NoHu,
    partnerKey: GamePartnerKeyEnum.NoHu,
    title: 'Pages.Lobby.game_category.nohu.title',
    link: RouterPathEnum.Jackpot,
    icon: 'icon-jackpot',
    iconSvg: IconJackpot,
  },
  {
    type: GameCategoryEnum.Slots,
    partnerKey: GamePartnerKeyEnum.Slots,
    title: 'Pages.Lobby.game_category.slots.title',
    link: RouterPathEnum.Slots,
    icon: 'icon-slots',
    iconSvg: IconSlots,
  },
  {
    type: GameCategoryEnum.FastGame,
    partnerKey: GamePartnerKeyEnum.FastGame,
    title: 'Pages.Lobby.game_category.instant.title',
    link: RouterPathEnum.FastGame,
    icon: 'icon-quick-game',
    iconSvg: IconQuickGame,
  },
  {
    type: GameCategoryEnum.TableGame,
    partnerKey: GamePartnerKeyEnum.TableGame,
    title: 'Pages.Lobby.game_category.tables_ingames.title',
    link: RouterPathEnum.TableGame,
    icon: 'icon-table-game',
    iconSvg: IconTableGame,
  },
];

export const CASINO_CATEGORY: LobbyCategory[] = [
  {
    type: CasinoCategoryEnum.All,
    title: 'Pages.Casino.game_category.all',
    slugKey: CasinoSlugEnum.All,
    link: CasinoLinkEnum.All,
    icon: 'icon-all',
    iconSvg: IconAll,
  },
  {
    type: CasinoCategoryEnum.Blackjack,
    title: 'Pages.Casino.game_category.blackjack',
    slugKey: CasinoSlugEnum.Blackjack,
    link: CasinoLinkEnum.Blackjack,
    icon: 'icon-blackjack',
    iconSvg: BlackjackIcon,
  },
  {
    type: CasinoCategoryEnum.XocDia,
    title: 'Pages.Casino.game_category.xocdia',
    slugKey: CasinoSlugEnum.XocDia,
    link: CasinoLinkEnum.XocDia,
    icon: 'icon-xocdia',
    iconSvg: XocDiaIcon,
  },
  {
    type: CasinoCategoryEnum.Roulette,
    title: 'Pages.Casino.game_category.roulette',
    slugKey: CasinoSlugEnum.Roulette,
    link: CasinoLinkEnum.Roulette,
    icon: 'icon-roulette',
    iconSvg: RouletteIcon,
  },
  {
    type: CasinoCategoryEnum.Poker,
    title: 'Pages.Casino.game_category.poker',
    slugKey: CasinoSlugEnum.Poker,
    link: CasinoLinkEnum.Poker,
    icon: 'icon-poker',
    iconSvg: PokerIcon,
  },
  {
    type: CasinoCategoryEnum.RongHo,
    title: 'Pages.Casino.game_category.rong_ho',
    slugKey: CasinoSlugEnum.RongHo,
    link: CasinoLinkEnum.RongHo,
    icon: 'icon-rong-ho',
    iconSvg: RongHoIcon,
  },
  {
    type: CasinoCategoryEnum.Baccarat,
    title: 'Pages.Casino.game_category.baccarat',
    slugKey: CasinoSlugEnum.Baccarat,
    link: CasinoLinkEnum.Baccarat,
    icon: 'icon-baccarat',
    iconSvg: BaccaratIcon,
  },
  {
    type: CasinoCategoryEnum.TaiXiu,
    title: 'Pages.Casino.game_category.tai_xiu',
    slugKey: CasinoSlugEnum.TaiXiu,
    link: CasinoLinkEnum.SicBo,
    icon: 'icon-tai-xiu',
    iconSvg: TaiXiuIcon,
  },
  {
    type: CasinoCategoryEnum.BauCua,
    title: 'Pages.Casino.game_category.bau_cua',
    slugKey: CasinoSlugEnum.BauCua,
    link: CasinoLinkEnum.BauCua,
    icon: 'icon-bau-cua',
    iconSvg: BauCuaIcon,
  },
  {
    type: CasinoCategoryEnum.Other,
    title: 'Pages.Casino.game_category.other_games',
    slugKey: CasinoSlugEnum.Other,
    link: CasinoLinkEnum.Other,
    icon: 'icon-other',
    iconSvg: OtherIcon,
  },
];

export const COCKFIGHT_GAME_LIST = [
  {
    title: 'ws168',
    gameData: {
      api_url: CockfightQueryEnum.WS168,
      partner_game_id: 'ws168',
      partner_provider: 'ws168',
      name: 'Đá gà',
    },
    banner: '/images/lobby/cockfight/ws168.webp',
  },
  {
    title: 'ga28',
    gameData: {
      api_url: CockfightQueryEnum.GA28,
      partner_game_id: 'ga28',
      partner_provider: 'ga28',
      name: 'Đá gà',
    },
    banner: '/images/lobby/cockfight/ga28.webp',
  },
];

export const PROVIDER_ICON_IMAGE = {
  rik: {
    default: '/icons/rik.svg',
    active: '/icons/rik-active.svg',
  },
};

export const LOBBY_GAME_LIST_LIMIT = 28;

export const LOBBY_GAME_LIST_LIMIT_MOBILE = 9;

export const LOBBY_FILTER = [
  {
    key: 'all',
    title: 'Common.all',
  },
  {
    key: GameSortEnum.Hot,
    title: 'Pages.Lobby.filter.hot',
  },
  {
    key: GameSortEnum.Recent,
    title: 'Pages.Lobby.filter.recent',
    requireLogin: true,
  },
  {
    key: GameSortEnum.Favorite,
    title: 'Pages.Lobby.filter.favorite',
    requireLogin: true,
  },
];
