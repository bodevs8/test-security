import type { DepositMenuItem, HeroBannerItem } from '@/types/app';
import type {
  GuidelineMenuCategory,
  MenuItem,
  TopMenuItem,
} from '@/types/menu';
import {
  AccountLinkEnum,
  CasinoLinkEnum,
  CategoryTypeEnum,
  CockfightQueryEnum,
  DepositLinkEnum,
  DepositMethodEnum,
  IframeLinkEnum,
  PromotionSlugEnum,
  RouterPathEnum,
  WithdrawLinkEnum,
} from '@/enums';

import { WithDrawMethodEnum } from '@/enums/withdraw';

import CodePayIcon from '@/public/images/deposit/method/codepay.webp';

import CryptoIcon from '@/public/images/deposit/method/crypto.webp';
import EwalletIcon from '@/public/images/deposit/method/e-wallet.webp';
import FlexpayIcon from '@/public/images/deposit/method/flexpay.webp';
import CodePayMaintainIcon from '@/public/images/deposit/method/maintain/codepay.webp';
import CryptoMaintainIcon from '@/public/images/deposit/method/maintain/crypto.webp';
import EwalletMaintainIcon from '@/public/images/deposit/method/maintain/e-wallet.webp';
import FlexpayMaintainIcon from '@/public/images/deposit/method/maintain/flexpay.webp';
import PhoneCardMaintainIcon from '@/public/images/deposit/method/maintain/phone-card.webp';
import PhoneCardIcon from '@/public/images/deposit/method/phone-card.webp';
import Banner1Mb from '@/public/images/header/banner/banner-1-mb.webp';
import Banner1 from '@/public/images/header/banner/banner-1.webp';
import AskMeBetFish from '@/public/images/sub-menu/ask-me-bet-fish.webp';
import AtomLucky from '@/public/images/sub-menu/atom-lucky.webp';
import B52Poker from '@/public/images/sub-menu/b52-poker.webp';
import B52TableGame from '@/public/images/sub-menu/b52-tablegame.webp';
import BaccaratCasino from '@/public/images/sub-menu/batcarat-casino.webp';
import BaucuaCasino from '@/public/images/sub-menu/baucua-casino.webp';
import BlackjackCasino from '@/public/images/sub-menu/blackjack-casino.webp';
import BtiSport from '@/public/images/sub-menu/bti-sport.webp';
import ESport from '@/public/images/sub-menu/e-sport.webp';
import EvoplaySlots from '@/public/images/sub-menu/evolay-slots.webp';
import EvoplayGameNhanh from '@/public/images/sub-menu/evoplay-gamenhanh.webp';
import Ga28 from '@/public/images/sub-menu/ga28-daga.webp';
import Go88Poker from '@/public/images/sub-menu/go88-poker.webp';
import Go88TableGame from '@/public/images/sub-menu/go88-tablegame.webp';
import GoTableGame from '@/public/images/sub-menu/go-tablegame.webp';
import ImSport from '@/public/images/sub-menu/im-sport.webp';
import JiliFish from '@/public/images/sub-menu/jili-fish.webp';
import KSport from '@/public/images/sub-menu/k-sport.webp';
import KenoLocPhat from '@/public/images/sub-menu/keno-locphat.webp';
import KenoSieuToc from '@/public/images/sub-menu/keno-sieutoc.webp';
import KenoVietlott from '@/public/images/sub-menu/keno-vietlott.webp';
import Keno from '@/public/images/sub-menu/keno.webp';
import KingMarkerTableGame from '@/public/images/sub-menu/kingmaker-tablegame.webp';
import LoDe3Mien from '@/public/images/sub-menu/lo-de-3-mien.webp';
import LoDeMd5 from '@/public/images/sub-menu/lo-de-md5.webp';
import LoDeSieuToc from '@/public/images/sub-menu/lo-de-sieu-toc.webp';
import Number2Lucky from '@/public/images/sub-menu/number-game-2-lucky.webp';
import NumberLucky from '@/public/images/sub-menu/number-game-lucky.webp';
import PokerCasino from '@/public/images/sub-menu/poker-casino.webp';
import PragmaticSlots from '@/public/images/sub-menu/pragmatic-slots.webp';
import QtechFish from '@/public/images/sub-menu/qtech-fish.webp';
import QtechGameNhanh from '@/public/images/sub-menu/qtech-gamenhanh.webp';
import QtechSlots from '@/public/images/sub-menu/qtech-slots.webp';
import QuaySo5Lucky from '@/public/images/sub-menu/quay-so-5-lucky.webp';
import QuaySoSexyLucky from '@/public/images/sub-menu/quay-so-sexy-lucky.webp';
import QuaySoThanTaiLucky from '@/public/images/sub-menu/quay-so-than-tai-sexy.webp';
import RikPoker from '@/public/images/sub-menu/rik-poker.webp';
import RikSlots from '@/public/images/sub-menu/rik-slots.webp';
import RikTableGame from '@/public/images/sub-menu/rik-tablegame.webp';
import RouletteCasino from '@/public/images/sub-menu/roulete-casino.webp';
import SabaSport from '@/public/images/sub-menu/saba-sport.webp';
import SpriteGameNhanh from '@/public/images/sub-menu/spribe-gamenhanh.webp';
import TaixiuCasino from '@/public/images/sub-menu/taixiu-casino.webp';
import TechplayFish from '@/public/images/sub-menu/techplay-fish.webp';
import TechplayGameNhanh from '@/public/images/sub-menu/techplay-gamenhanh.webp';
import TechplayPoker from '@/public/images/sub-menu/techplay-poker.webp';
import TechplaySlots from '@/public/images/sub-menu/techplay-slots.webp';
import TechplayTableGame from '@/public/images/sub-menu/techplay-tablegame.webp';
import VirtualSport from '@/public/images/sub-menu/virtual-sport.webp';
import Ws168Daga from '@/public/images/sub-menu/ws168-daga.webp';
import XocdiaCasino from '@/public/images/sub-menu/xocdia-casino.webp';
import SuKienBg from '@/public/images/top-menu/event-bg.svg';
import SuKienIcon from '@/public/images/top-menu/event-icon.webp';
import PromotionBg from '@/public/images/top-menu/promotion-bg.svg';
import PromotionIcon from '@/public/images/top-menu/promotion-icon.webp';
import VipClubBg from '@/public/images/top-menu/vip-bg.svg';
import VipClubIcon from '@/public/images/top-menu/vip-icon.webp';

import dayjs from 'dayjs';
import { GUIDELINE_LINKS } from './guidelines/guideline';
import { HEADER_MENU_MB_IMAGES } from './images/gate-game';
import { HEADER_MENU_PC_IMAGES } from './images/header';

export const DEFAULT_BRAND_NAME = 'T06FURY';
export const DEFAULT_PAGINATE = { currentPage: 1, perPage: 20 };
export const DEFAULT_SORT = { sortField: 'createdAt', sortDirection: 'desc' };
export const DEFAULT_DATE_RANGE = [
  dayjs().startOf('month'),
  dayjs().endOf('date'),
];
export const REGEX_EMAIL =
  /(?=.*^[\w@.+]+$)(?=.*^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$).*/i;
export const CACHE_DURATION = 300; // 5 minutes
export const DEFAULT_CURRENCY_UNIT = 'VND';
export const DEFAULT_CURRENCY_SEPARATOR = ',';
export const DEFAULT_NUMBER_INPUT_MAX_LENGTH = 15;
export const DEFAULT_INPUT_MAX_LENGTH = 255;
export const DEFAULT_INPUT_MAX_LENGTH_BANK = 60;
export const TOAST_DURATION = 3000;
export const TIMEOUT_TRACKING_EVENT = 3000;
export const MAX_PAGE = 5;
export const LIMIT_SEASONS = 20;
export const LIMIT_RECOMMENDED_GAMES = 20;
export const RESPONSE_STATUS = {
  OK: 'OK',
  SHOW_MESSAGE: 'SHOW_MESSAGE',
};
export const RESPONSE_MESSAGE = {
  MANY_UNSUCCESS: 'MANY_UNSUCCESS',
};
export const FAIL_VALIDATE = 'FAIL_VALIDATE';
export const STATUS_DEPOSIT_AVAILABLE = 1;
export const DEFAULT_HISTORY_LIMIT = 10;
export const GUIDELINE_URL = 'huong-dan';
export const MAX_LENGTH_PHONE = 5;
export const MAX_BANK_ACCOUNT = 10;
export const TIMEOUT_FOCUS_INPUT_SEARCH = 300;
const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';
export const HEADER_MENU_ITEMS: MenuItem[] = [
  {
    id: 'sports',
    label: 'Common.menu.sports',
    icon: HEADER_MENU_PC_IMAGES.sport!,
    iconWhite: HEADER_MENU_PC_IMAGES.sport!,
    iconActive: HEADER_MENU_PC_IMAGES.sport!,
    iconGateGame: HEADER_MENU_MB_IMAGES.sport!,
    to: RouterPathEnum.Sports,
    tagType: CategoryTypeEnum.Hot,
    activeRoutes: [
      IframeLinkEnum.KSport,
      IframeLinkEnum.BTI,
      IframeLinkEnum.KSPORT_VIRTUAL,
      IframeLinkEnum.INPLAY,
      IframeLinkEnum.IM_E,
      IframeLinkEnum.IBC,
      IframeLinkEnum.SABA_VIRTUAL,
      IframeLinkEnum.SABA_E,
      IframeLinkEnum.OSPORT,
      IframeLinkEnum.PRAGMATIC_VIRTUAL,
    ],
    children: [
      {
        id: 'k-sports',
        to: IframeLinkEnum.KSport,
        icon: 'icon-provider-ksport',
        label: 'Pages.SportsPage.sub_menu.k_sports',
        iconWhite: KSport,
        iconActive: '',
      },
      {
        id: 'saba-sports',
        to: IframeLinkEnum.OSPORT,
        icon: 'icon-provider-saba',
        label: 'Pages.SportsPage.sub_menu.saba',
        iconWhite: SabaSport,
        iconActive: '',
      },

      {
        id: 'im-sports',
        to: IframeLinkEnum.IBC,
        icon: 'icon-provider-im',
        label: 'Pages.SportsPage.sub_menu.im_sports',
        iconWhite: ImSport,
        iconActive: '',
      },
      {
        id: 'bti-sports',
        to: IframeLinkEnum.BTI,
        icon: 'icon-provider-bti',
        label: 'Pages.SportsPage.sub_menu.bti_sports',
        iconWhite: BtiSport,
        iconActive: '',
      },
      {
        id: 'saba-virtual-sports',
        to: `${RouterPathEnum.Sports}#virtual-sport`,
        icon: '',
        label: 'Pages.SportsPage.sub_menu.saba_virtual_sports',
        iconWhite: VirtualSport,
        iconActive: '',
      },
      {
        id: 'e-sport',
        to: `${RouterPathEnum.Sports}#e-sport`,
        icon: '',
        label: 'Pages.SportsPage.sub_menu.e_sport',
        iconWhite: ESport,
        iconActive: '',
      },
    ],
  },
  {
    id: 'live-casino',
    label: 'Common.menu.live_casino',
    icon: HEADER_MENU_PC_IMAGES.liveCasino!,
    iconWhite: HEADER_MENU_PC_IMAGES.liveCasino!,
    iconActive: HEADER_MENU_PC_IMAGES.liveCasino!,
    iconGateGame: HEADER_MENU_MB_IMAGES.liveCasino!,
    to: RouterPathEnum.LiveCasino,
    activeRoutes: [CasinoLinkEnum.RongHo, CasinoLinkEnum.Other],
    tagType: CategoryTypeEnum.Live,
    children: [
      {
        id: 'taixiu',
        to: CasinoLinkEnum.SicBo,
        icon: '',
        label: 'Pages.Casino.game_category.tai_xiu',
        iconWhite: TaixiuCasino,
        iconActive: '',
      },
      {
        id: 'xocdia',
        to: CasinoLinkEnum.XocDia,
        icon: '',
        label: 'Pages.Casino.game_category.xocdia',
        iconWhite: XocdiaCasino,
        iconActive: '',
      },
      {
        id: 'bau-cua',
        to: CasinoLinkEnum.BauCua,
        icon: '',
        label: 'Pages.Casino.game_category.bau_cua',
        iconWhite: BaucuaCasino,
        iconActive: '',
      },
      {
        id: 'baccarat',
        to: CasinoLinkEnum.Baccarat,
        icon: '',
        label: 'Pages.Casino.game_category.baccarat',
        iconWhite: BaccaratCasino,
        iconActive: '',
      },
      {
        id: 'blackjack',
        to: CasinoLinkEnum.Blackjack,
        icon: '',
        label: 'Pages.Casino.game_category.blackjack',
        iconWhite: BlackjackCasino,
        iconActive: '',
      },
      {
        id: 'roulette',
        to: CasinoLinkEnum.Roulette,
        icon: '',
        label: 'Pages.Casino.game_category.roulette',
        iconWhite: RouletteCasino,
        iconActive: '',
      },
      {
        id: 'poker',
        to: CasinoLinkEnum.Poker,
        icon: '',
        label: 'Pages.Casino.game_category.poker',
        iconWhite: PokerCasino,
        iconActive: '',
      },
    ],
  },
  {
    id: 'game-bai',
    label: 'Common.menu.card_game',
    icon: HEADER_MENU_PC_IMAGES.gameBai!,
    iconWhite: HEADER_MENU_PC_IMAGES.gameBai!,
    iconActive: HEADER_MENU_PC_IMAGES.gameBai!,
    iconGateGame: HEADER_MENU_MB_IMAGES.gameBai!,
    to: RouterPathEnum.GameBai,
    children: [
      {
        id: 'go88',
        to: `${RouterPathEnum.GameBai}?partner=go`,
        icon: 'icon-provider-go',
        label: 'Common.sub_menu.go88',
        iconWhite: Go88Poker,
        iconActive: '',
      },
      {
        id: 'rik',
        to: `${RouterPathEnum.GameBai}?partner=rik`,
        icon: 'icon-provider-rik',
        label: 'Common.sub_menu.rik',
        iconWhite: RikPoker,
        iconActive: '',
      },
      {
        id: 'b52',
        to: `${RouterPathEnum.GameBai}?partner=b52`,
        icon: 'icon-provider-b52',
        label: 'Common.sub_menu.b52',
        iconWhite: B52Poker,
        iconActive: '',
      },
      {
        id: 'techplay',
        to: `${RouterPathEnum.GameBai}?partner=vingame`,
        icon: 'icon-provider-techplay',
        label: 'Common.sub_menu.techplay',
        iconWhite: TechplayPoker,
        iconActive: '',
      },
    ],
  },
  {
    id: 'quay-so',
    label: 'Common.menu.number_game',
    icon: HEADER_MENU_PC_IMAGES.quaySo!,
    iconWhite: HEADER_MENU_PC_IMAGES.quaySo!,
    iconActive: HEADER_MENU_PC_IMAGES.quaySo!,
    iconGateGame: HEADER_MENU_MB_IMAGES.quaySo!,
    to: RouterPathEnum.QuaySo,
    children: [
      {
        id: 'atom',
        to: '',
        icon: '',
        gameQuery: {
          partner_game_id: 'atom',
          partner_provider: 'vingame',
          name: 'Atom',
        },
        label: 'Common.sub_menu.atom',
        iconWhite: AtomLucky,
        iconActive: '',
      },
      {
        id: 'quay-so-5',
        to: '',
        icon: '',
        gameQuery: {
          partner_game_id: 'quayso5',
          partner_provider: 'vingame',
          name: 'QUAY SỐ 5',
        },
        label: 'Common.sub_menu.number_game_5',
        iconWhite: QuaySo5Lucky,
        iconActive: '',
      },
      {
        id: 'number-game',
        to: '',
        icon: '',
        gameQuery: {
          partner_game_id: '1000',
          partner_provider: 'vingame',
          name: 'NUMBERS GAME',
        },
        label: 'Common.sub_menu.number_game',
        iconWhite: NumberLucky,
        iconActive: '',
      },
      {
        id: 'number-game-2',
        to: '',
        icon: '',
        gameQuery: {
          partner_game_id: 'numbergame2',
          partner_provider: 'vingame',
          name: 'Number Game 2',
        },
        label: 'Common.sub_menu.number_game_2',
        iconWhite: Number2Lucky,
        iconActive: '',
      },
      {
        id: 'sexy',
        to: '',
        icon: '',
        gameQuery: {
          partner_game_id: 'quayso2',
          partner_provider: 'vingame',
          name: 'QUAY SỐ SEXY',
        },
        label: 'Common.sub_menu.number_sexy',
        iconWhite: QuaySoSexyLucky,
        iconActive: '',
      },
      {
        id: 'than-tai',
        to: '',
        icon: '',
        gameQuery: {
          partner_game_id: 'quayso',
          partner_provider: 'vingame',
          name: 'QUAY SỐ THẦN TÀI',
        },
        label: 'Common.sub_menu.number_lucky',
        iconWhite: QuaySoThanTaiLucky,
        iconActive: '',
        customClass: '!pl-[0.833vw] 3xl:!pl-4',
      },
    ],
  },
  {
    id: 'keno',
    label: 'Common.menu.keno',
    icon: HEADER_MENU_PC_IMAGES.keno!,
    iconWhite: HEADER_MENU_PC_IMAGES.keno!,
    iconActive: HEADER_MENU_PC_IMAGES.keno!,
    iconGateGame: HEADER_MENU_MB_IMAGES.keno!,
    to: RouterPathEnum.Keno,
    children: [
      {
        id: 'keno-loc-phat',
        to: '',
        icon: '',
        gameQuery: {
          partner_game_id: 'ktrng3995',
          partner_provider: 'vingame',
          name: 'Keno Lộc Phát',
        },
        label: 'Common.sub_menu.keno_loc_phat',
        iconWhite: KenoLocPhat,
        iconActive: '',
      },
      {
        id: 'keno-sieu-toc',
        to: '',
        icon: '',
        gameQuery: {
          partner_game_id: '2000',
          partner_provider: 'vingame',
          name: 'KENO SIÊU TỐC',
        },
        label: 'Common.sub_menu.keno_sieu_toc',
        iconWhite: KenoSieuToc,
        iconActive: '',
      },
      {
        id: 'keno',
        to: '',
        icon: '',
        gameQuery: {
          partner_game_id: 'keno',
          partner_provider: 'spribe',
          name: 'Keno Vietlott',
        },
        label: 'Common.sub_menu.keno',
        iconWhite: Keno,
        iconActive: '',
      },
      {
        id: 'keno-vietlott',
        to: '',
        icon: '',
        gameQuery: {
          partner_game_id: 'keno-vietlot',
          partner_provider: 'vingame',
          name: 'Keno Vietlott',
        },
        label: 'Common.sub_menu.keno_vietlott',
        iconWhite: KenoVietlott,
        iconActive: '',
      },
    ],
  },
  {
    id: 'lottery',
    label: 'Common.menu.lottery',
    icon: HEADER_MENU_PC_IMAGES.lode!,
    iconWhite: HEADER_MENU_PC_IMAGES.lode!,
    iconActive: HEADER_MENU_PC_IMAGES.lode!,
    iconGateGame: HEADER_MENU_MB_IMAGES.lode!,
    to: RouterPathEnum.Lottery,
    children: [
      {
        id: 'lo-de-3-mien',
        to: RouterPathEnum.LoDe3Mien,
        icon: '',
        label: 'Common.sub_menu.lo_de_3_mien',
        iconWhite: LoDe3Mien,
        iconActive: '',
      },
      {
        id: 'lo-de-sieu-toc',
        to: RouterPathEnum.LoDeSieuToc,
        icon: '',
        label: 'Common.sub_menu.lo_de_sieu_toc',
        iconWhite: LoDeSieuToc,
        iconActive: '',
      },
      {
        id: 'lo-de-md5',
        to: RouterPathEnum.LoDeMd5,
        icon: '',
        label: 'Common.sub_menu.lo_de_md5',
        iconWhite: LoDeMd5,
        iconActive: '',
      },
    ],
  },
  {
    id: 'da-ga',
    label: 'Common.menu.cockfight',
    icon: HEADER_MENU_PC_IMAGES.cockfight!,
    iconWhite: HEADER_MENU_PC_IMAGES.cockfight!,
    iconActive: HEADER_MENU_PC_IMAGES.cockfight!,
    iconGateGame: HEADER_MENU_MB_IMAGES.cockfight!,
    to: RouterPathEnum.Cockfight,
    tagType: CategoryTypeEnum.New,
    children: [
      {
        id: 'ws168',
        to: '',
        icon: 'icon-provider-ws168',
        gameQuery: {
          api_url: CockfightQueryEnum.WS168,
        },
        label: 'Common.sub_menu.cockfight_ws168',
        iconWhite: Ws168Daga,
        iconActive: '',
        customClass: '!text-[32px] !bottom-[0.217vw] 3xl:!bottom-1',
      },
      {
        id: 'ga28',
        to: '',
        icon: 'icon-provider-ga28',
        gameQuery: {
          api_url: CockfightQueryEnum.GA28,
        },
        label: 'Common.sub_menu.cockfight_ga28',
        iconWhite: Ga28,
        iconActive: '',
        customClass: '!text-[32px] !bottom-[0.217vw] 3xl:!bottom-1',
      },
    ],
  },
  {
    id: 'ban-ca',
    label: 'Common.menu.fishing',
    icon: HEADER_MENU_PC_IMAGES.fishing!,
    iconWhite: HEADER_MENU_PC_IMAGES.fishing!,
    iconActive: HEADER_MENU_PC_IMAGES.fishing!,
    iconGateGame: HEADER_MENU_MB_IMAGES.fishing!,
    to: RouterPathEnum.Fishing,
    children: [
      {
        id: 'techplay',
        to: `${RouterPathEnum.Fishing}?partner=techplay`,
        icon: 'icon-provider-techplay',
        label: 'Common.sub_menu.techplay',
        iconWhite: TechplayFish,
        iconActive: '',
      },
      {
        id: 'qtech',
        to: `${RouterPathEnum.Fishing}?partner=qtech`,
        icon: 'icon-provider-qtech',
        label: 'Common.sub_menu.qtech',
        iconWhite: QtechFish,
        iconActive: '',
      },
      {
        id: 'jili',
        to: `${RouterPathEnum.Fishing}?partner=jili`,
        icon: 'icon-provider-jili',
        label: 'Common.sub_menu.jili',
        iconWhite: JiliFish,
        iconActive: '',
      },
      {
        id: 'askmebet',
        to: `${RouterPathEnum.Fishing}?partner=AskMeBet`,
        icon: 'icon-provider-askmebet',
        label: 'Common.sub_menu.askmebet',
        iconWhite: AskMeBetFish,
        iconActive: '',
      },
    ],
  },
  {
    id: 'no-hu',
    label: 'Common.menu.jackpot',
    icon: HEADER_MENU_PC_IMAGES.jackpot!,
    iconWhite: HEADER_MENU_PC_IMAGES.jackpot!,
    iconActive: HEADER_MENU_PC_IMAGES.jackpot!,
    iconGateGame: HEADER_MENU_MB_IMAGES.jackpot!,
    to: RouterPathEnum.Jackpot,
    tagType: CategoryTypeEnum.Hot,
  },
  {
    id: 'slots',
    label: 'Common.menu.slots',
    icon: HEADER_MENU_PC_IMAGES.slots!,
    iconWhite: HEADER_MENU_PC_IMAGES.slots!,
    iconActive: HEADER_MENU_PC_IMAGES.slots!,
    iconGateGame: HEADER_MENU_MB_IMAGES.slots!,
    to: RouterPathEnum.Slots,
    children: [
      {
        id: 'rik',
        to: `${RouterPathEnum.Slots}?partner=rik`,
        icon: 'icon-provider-rik',
        label: 'Common.sub_menu.rik',
        iconWhite: RikSlots,
        iconActive: '',
      },
      {
        id: 'techplay',
        to: `${RouterPathEnum.Slots}?partner=techplay`,
        icon: 'icon-provider-techplay',
        label: 'Common.sub_menu.techplay',
        iconWhite: TechplaySlots,
        iconActive: '',
      },
      {
        id: 'pragmatic',
        to: `${RouterPathEnum.Slots}?partner=pragmatic`,
        icon: 'icon-provider-pragmatic',
        label: 'Common.sub_menu.pragmatic',
        iconWhite: PragmaticSlots,
        iconActive: '',
      },
      {
        id: 'evoplay',
        to: `${RouterPathEnum.Slots}?partner=evoplay`,
        icon: 'icon-provider-evoplay',
        label: 'Common.sub_menu.evoplay',
        iconWhite: EvoplaySlots,
        iconActive: '',
      },
      {
        id: 'qtech',
        to: `${RouterPathEnum.Slots}?partner=qtech`,
        icon: 'icon-provider-qtech',
        label: 'Common.sub_menu.qtech',
        iconWhite: QtechSlots,
        iconActive: '',
      },
    ],
  },
  {
    id: 'game-nhanh',
    label: 'Common.menu.turbo',
    icon: HEADER_MENU_PC_IMAGES.fastGame!,
    iconWhite: HEADER_MENU_PC_IMAGES.fastGame!,
    iconActive: HEADER_MENU_PC_IMAGES.fastGame!,
    iconGateGame: HEADER_MENU_MB_IMAGES.fastGame!,
    to: RouterPathEnum.FastGame,
    children: [
      {
        id: 'techplay',
        to: `${RouterPathEnum.FastGame}?partner=techplay`,
        icon: 'icon-provider-techplay',
        label: 'Common.sub_menu.techplay',
        iconWhite: TechplayGameNhanh,
        iconActive: '',
      },
      {
        id: 'spribe',
        to: `${RouterPathEnum.FastGame}?partner=spribe`,
        icon: 'icon-provider-spribe',
        label: 'Common.sub_menu.spribe',
        iconWhite: SpriteGameNhanh,
        iconActive: '',
      },
      {
        id: 'evoplay',
        to: `${RouterPathEnum.FastGame}?partner=evoplay`,
        icon: 'icon-provider-evoplay',
        label: 'Common.sub_menu.evoplay',
        iconWhite: EvoplayGameNhanh,
        iconActive: '',
      },
      {
        id: 'qtech',
        to: `${RouterPathEnum.FastGame}?partner=qtech`,
        icon: 'icon-provider-qtech',
        label: 'Common.sub_menu.qtech',
        iconWhite: QtechGameNhanh,
        iconActive: '',
      },
    ],
  },
  {
    id: 'table-game',
    label: 'Common.menu.table_game',
    icon: HEADER_MENU_PC_IMAGES.tableGame!,
    iconWhite: HEADER_MENU_PC_IMAGES.tableGame!,
    iconActive: HEADER_MENU_PC_IMAGES.tableGame!,
    iconGateGame: HEADER_MENU_MB_IMAGES.tableGame!,
    to: RouterPathEnum.TableGame,
    children: [
      {
        id: 'techplay',
        to: `${RouterPathEnum.TableGame}?partner=techplay`,
        icon: 'icon-provider-techplay',
        label: 'Common.sub_menu.techplay',
        iconWhite: TechplayTableGame,
        iconActive: '',
      },
      {
        id: 'go88',
        to: `${RouterPathEnum.TableGame}?partner=go`,
        icon: 'icon-provider-go',
        label: 'Common.sub_menu.go88',
        iconWhite: Go88TableGame,
        iconActive: '',
      },
      {
        id: 'rik',
        to: `${RouterPathEnum.TableGame}?partner=rik`,
        icon: 'icon-provider-rik',
        label: 'Common.sub_menu.rik',
        iconWhite: RikTableGame,
        iconActive: '',
      },
      {
        id: 'b52',
        to: `${RouterPathEnum.TableGame}?partner=b52`,
        icon: 'icon-provider-b52',
        label: 'Common.sub_menu.b52',
        iconWhite: B52TableGame,
        iconActive: '',
      },
      {
        id: 'playngo',
        to: `${RouterPathEnum.TableGame}?partner=playngo`,
        icon: 'icon-provider-playngo',
        label: 'Common.sub_menu.play_n_go',
        iconWhite: GoTableGame,
        iconActive: '',
      },
      {
        id: 'kingmaker',
        to: `${RouterPathEnum.TableGame}?partner=kingmaker`,
        icon: 'icon-provider-kingmaker',
        label: 'Common.sub_menu.kingmaker',
        iconWhite: KingMarkerTableGame,
        iconActive: '',
      },
    ],
  },
  {
    id: 'gate-games',
    label: 'Common.menu.gate_games',
    icon: HEADER_MENU_PC_IMAGES.gateGame!,
    iconWhite: HEADER_MENU_PC_IMAGES.gateGame!,
    iconActive: HEADER_MENU_PC_IMAGES.gateGame!,
    iconGateGame: HEADER_MENU_MB_IMAGES.gateGame!,
    to: RouterPathEnum.LobbyGame,
  },
  {
    id: 'favorite',
    label: 'Common.menu.favorite',
    icon: HEADER_MENU_PC_IMAGES.favorite!,
    iconWhite: HEADER_MENU_PC_IMAGES.favorite!,
    iconActive: HEADER_MENU_PC_IMAGES.favorite!,
    iconGateGame: HEADER_MENU_MB_IMAGES.favorite!,
    to: RouterPathEnum.Favorite,
    showOnLoggedIn: true,
  },
];

export const TOP_MENU_ITEMS: TopMenuItem[] = [
  {
    key: 'vip-club',
    title: `${process.env.NEXT_PUBLIC_BRAND_NAME} VIP`,
    href: RouterPathEnum.VipClub,
    icon: VipClubIcon,
    backgroundImage: VipClubBg,
    order: 1,
    titleClass: 'text-white',
  },
  {
    key: 'khuyen-mai',
    href: RouterPathEnum.Promotions,
    title: 'Khuyến Mãi',
    icon: PromotionIcon,
    backgroundImage: PromotionBg,
    order: 2,
    titleClass: 'text-dark-700',
  },
  {
    key: 'su-kien',
    title: 'Sự Kiện',
    href: RouterPathEnum.Event,
    icon: SuKienIcon,
    backgroundImage: SuKienBg,
    order: 3,
    titleClass: 'text-dark-700',
  },
];

export const AUTO_PLAY_DELAY_SWIPER = 3000;
export const MOBILE_SPACE_BETWEEN_SWIPER = 12;

export const HERO_BANNER: HeroBannerItem[] = [
  {
    id: 1,
    title: 'Cầu thủ quốc tế',
    subTitle: 'Đối tác chính của',
    content: brandName,
    image: Banner1,
    imageMb: Banner1Mb,
    imageTablet: Banner1,
    href: `${RouterPathEnum.Promotions}/${PromotionSlugEnum.CashbackSportBonus}`,
  },
  {
    id: 2,
    title: 'Cầu thủ quốc tế',
    subTitle: 'Đối tác chính của',
    content: brandName,
    image: Banner1,
    imageMb: Banner1Mb,
    imageTablet: Banner1,
    href: `${RouterPathEnum.Promotions}/${PromotionSlugEnum.CashbackSportBonus}`,
  },
  {
    id: 3,
    title: 'Cầu thủ quốc tế',
    subTitle: 'Đối tác chính của',
    content: brandName,
    image: Banner1,
    imageMb: Banner1Mb,
    imageTablet: Banner1,
    href: `${RouterPathEnum.Promotions}/${PromotionSlugEnum.CashbackSportBonus}`,
  },
  {
    id: 4,
    title: 'Cầu thủ quốc tế',
    subTitle: 'Đối tác chính của',
    content: brandName,
    image: Banner1,
    imageMb: Banner1Mb,
    imageTablet: Banner1,
    href: `${RouterPathEnum.Promotions}/${PromotionSlugEnum.CashbackSportBonus}`,
  },
  {
    id: 5,
    title: 'Cầu thủ quốc tế',
    subTitle: 'Đối tác chính của',
    content: brandName,
    image: Banner1,
    imageMb: Banner1Mb,
    imageTablet: Banner1,
    href: `${RouterPathEnum.Promotions}/${PromotionSlugEnum.CashbackSportBonus}`,
  },
];

export const OFFCANVAS_BOTTOM_MENU: MenuItem[] = [
  {
    id: 'tin-tuc',
    label: 'Pages.Account.menu.news',
    icon: '/images/header/news.svg',
    iconWhite: '/images/header/news-white.svg',
    iconActive: '/images/header/news-active.svg',
    to: RouterPathEnum.News,
  },
  {
    id: 'telegram',
    label: 'Pages.Account.menu.telegram',
    icon: '/images/header/telegram.svg',
    iconWhite: '/images/header/telegram-white.svg',
    iconActive: '/images/header/telegram-active.svg',
    to: process.env.NEXT_PUBLIC_TELEGRAM_URL || '',
    isExternal: true,
  },
  {
    id: 'contact',
    label: 'Pages.Account.menu.contact',
    icon: '/images/header/live-chat.svg',
    iconWhite: '/images/header/live-chat-white.svg',
    iconActive: '/images/header/live-chat-active.svg',
    to: process.env.NEXT_PUBLIC_LIVE_CHAT_LINK || '',
    isNewTab: true,
  },
];

export const GUIDELINE_MENUS: GuidelineMenuCategory[] = [
  {
    id: 'legal',
    title: 'Hỗ trợ & pháp lý',
    items: [
      {
        id: GUIDELINE_LINKS.ABOUT_US,
        title: 'Về Chúng Tôi',
      },
      {
        id: GUIDELINE_LINKS.HELP_CENTER,
        title: 'Trung Tâm Hỗ Trợ',
      },
      {
        id: GUIDELINE_LINKS.TERMS_AND_CONDITIONS,
        title: 'Điều khoản & Điều kiện',
      },
      {
        id: GUIDELINE_LINKS.PRIVACY_POLICY,
        title: 'Chính Sách Bảo Mật',
      },
      {
        id: GUIDELINE_LINKS.PROMOTION_TERM,
        title: 'Sự Kiện & Khuyến Mãi',
      },
    ],
  },
  {
    id: 'faq',
    title: 'FAQ',
    items: [
      {
        id: GUIDELINE_LINKS.FAQ,
        title: 'Câu hỏi thường gặp',
      },
    ],
  },
  {
    id: 'huong-dan',
    title: 'Hướng dẫn',
    items: [
      {
        id: GUIDELINE_LINKS.PROMOTION_USAGE,
        title: 'Sử dụng khuyến mãi',
      },
      {
        id: GUIDELINE_LINKS.DEPOSIT_GUIDE,
        title: 'Hướng dẫn nạp tiền',
      },
      {
        id: GUIDELINE_LINKS.WITHDRAWAL_GUIDE,
        title: 'Hướng dẫn rút tiền',
      },
      {
        id: GUIDELINE_LINKS.BINANCE_GUIDE,
        title: 'Hướng dẫn Binance',
      },
      {
        id: GUIDELINE_LINKS.REMITANO_GUIDE,
        title: 'Hướng dẫn Remitano',
      },
      {
        id: GUIDELINE_LINKS.HUOBI_GUIDE,
        title: 'Hướng dẫn Huobi',
      },
      {
        id: GUIDELINE_LINKS.COIN12_GUIDE,
        title: 'Hướng dẫn Coin12',
      },
      {
        id: GUIDELINE_LINKS.P2P_GUIDE,
        title: 'Hướng dẫn sử dụng P2P',
      },
      {
        id: GUIDELINE_LINKS.REGISTER_GUIDE,
        title: 'Tạo tài khoản',
      },
      {
        id: GUIDELINE_LINKS.ADD_BANK_GUIDE,
        title: 'Thêm tài khoản ngân hàng',
      },
    ],
  },
  {
    id: 'meo-hay',
    title: 'Mẹo hay',
    items: [
      {
        id: GUIDELINE_LINKS.SPORTS_TIPS,
        title: 'Mẹo Cược Thể Thao',
      },
      {
        id: GUIDELINE_LINKS.CASINO_TIPS,
        title: 'Mẹo Cược Casino',
      },
      {
        id: GUIDELINE_LINKS.LOTTERY_TIPS,
        title: 'Mẹo Xổ Số',
      },
      {
        id: GUIDELINE_LINKS.EGAMES_TIPS,
        title: 'Mẹo Khi Chơi E-Games',
      },
    ],
  },
];

export const DEPOSIT_MENU: DepositMenuItem[] = [
  {
    id: DepositMethodEnum.CODEPAY,
    label: 'Pages.Account.deposit.menus.codepay',
    tag: CategoryTypeEnum.New,
    url: DepositLinkEnum.CodePay,
    icon: CodePayIcon,
    iconMaintain: CodePayMaintainIcon,
  },
  {
    id: DepositMethodEnum.CRYPTO,
    label: 'Pages.Account.deposit.menus.crypto',
    tag: CategoryTypeEnum.New,
    url: DepositLinkEnum.Crypto,
    icon: CryptoIcon,
    iconMaintain: CryptoMaintainIcon,
  },
  {
    id: DepositMethodEnum.FLEXPAY,
    label: 'Pages.Account.deposit.menus.flexpay',
    url: DepositLinkEnum.Flexpay,
    icon: FlexpayIcon,
    iconMaintain: FlexpayMaintainIcon,
  },
  {
    id: DepositMethodEnum.EWALLET,
    label: 'Pages.Account.deposit.menus.ewallet',
    url: DepositLinkEnum.Ewallet,
    icon: EwalletIcon,
    iconMaintain: EwalletMaintainIcon,
  },
  {
    id: DepositMethodEnum.PHONE_CARD,
    label: 'Pages.Account.deposit.menus.phone_card',
    url: DepositLinkEnum.PhoneCard,
    icon: PhoneCardIcon,
    iconMaintain: PhoneCardMaintainIcon,
  },
];

export const WITHDRAW_MENU: DepositMenuItem[] = [
  {
    id: WithDrawMethodEnum.Bank,
    label: 'Pages.Account.withdraw.menus.bank',
    url: WithdrawLinkEnum.Bank,
    icon: CodePayIcon,
    iconMaintain: CodePayMaintainIcon,
  },
  {
    id: WithDrawMethodEnum.PhoneCard,
    label: 'Pages.Account.withdraw.menus.phone_card',
    url: WithdrawLinkEnum.PhoneCard,
    icon: PhoneCardIcon,
    iconMaintain: PhoneCardMaintainIcon,
  },
  {
    id: WithDrawMethodEnum.Crypto,
    label: 'Pages.Account.withdraw.menus.crypto',
    url: WithdrawLinkEnum.Crypto,
    icon: CryptoIcon,
    iconMaintain: CryptoMaintainIcon,
  },
  {
    id: WithDrawMethodEnum.Coin12,
    label: 'Pages.Account.withdraw.menus.coin12',
    tag: CategoryTypeEnum.New,
    url: WithdrawLinkEnum.Coin12,
    icon: EwalletIcon,
    iconMaintain: EwalletMaintainIcon,
  },
];

export const PROTECTED_LINKS = [
  IframeLinkEnum.SABA_E,
  IframeLinkEnum.IM_E,
  IframeLinkEnum.SABA_VIRTUAL,
  IframeLinkEnum.KSPORT_VIRTUAL,
  IframeLinkEnum.INPLAY,
  IframeLinkEnum.PRAGMATIC_VIRTUAL,
  RouterPathEnum.Favorite,
];

export const HIDE_HEADER_LINKS = [AccountLinkEnum.Overview];

export const DEFAULT_USER_DATA = {
  token: '',
  etoken: '',
  id: 0,
  fullname: '',
  phone: '',
  username: '',
  boping_id: '',
  email: '',
  type: '',
  bank_account_no: '',
  bank_code: '',
  plan_id: 0,
  package_id: 0,
  bank_name: '',
  tp_token: '',
  register_ip: '',
  momo_code: '',
  code_pay: '',
  member_id: 0,
  is_verify_email: false,
  is_verify_phone: false,
  is_verify_tele: false,
  tele_chat_id: '',
  kyc_status: '',
  identity_fullname: '',
  balance: 0,
};

export const HIDE_FOOTER_PREFIX_PATH = [
  RouterPathEnum.Lottery,
  CasinoLinkEnum.All,
  CasinoLinkEnum.XocDia,
  CasinoLinkEnum.BauCua,
  CasinoLinkEnum.Baccarat,
  CasinoLinkEnum.Blackjack,
  CasinoLinkEnum.Roulette,
  CasinoLinkEnum.SicBo,
  RouterPathEnum.LoDe3Mien,
  RouterPathEnum.LoDeSieuToc,
  RouterPathEnum.LoDeMd5,
  RouterPathEnum.GameBai,
  RouterPathEnum.Slots,
  RouterPathEnum.Jackpot,
  RouterPathEnum.Fishing,
  RouterPathEnum.TableGame,
  RouterPathEnum.QuaySo,
  RouterPathEnum.Keno,
  RouterPathEnum.FastGame,
  GUIDELINE_LINKS.DEPOSIT_GUIDE,
  GUIDELINE_LINKS.WITHDRAWAL_GUIDE,
  GUIDELINE_LINKS.ADD_BANK_GUIDE,
  GUIDELINE_LINKS.BINANCE_GUIDE,
  GUIDELINE_LINKS.REMITANO_GUIDE,
  GUIDELINE_LINKS.HUOBI_GUIDE,
  GUIDELINE_LINKS.COIN12_GUIDE,
  GUIDELINE_LINKS.P2P_GUIDE,
  GUIDELINE_LINKS.REGISTER_GUIDE,
  GUIDELINE_LINKS.PROMOTION_USAGE,
  GUIDELINE_LINKS.SPORTS_TIPS,
  GUIDELINE_LINKS.CASINO_TIPS,
  GUIDELINE_LINKS.LOTTERY_TIPS,
  GUIDELINE_LINKS.EGAMES_TIPS,
  GUIDELINE_LINKS.TERMS_AND_CONDITIONS,
  GUIDELINE_LINKS.PRIVACY_POLICY,
  GUIDELINE_LINKS.RESPONSIBLE_GAMING,
  GUIDELINE_LINKS.PROMOTION_TERM,
  GUIDELINE_LINKS.HELP_CENTER,
  GUIDELINE_LINKS.ABOUT_US,
  GUIDELINE_LINKS.FAQ,
  RouterPathEnum.Promotions,
];

export const PROTECTED_PATHS = [
  ...PROTECTED_LINKS,
  ...Object.values(AccountLinkEnum),
  ...Object.values(DepositLinkEnum),
  ...Object.values(WithdrawLinkEnum),
];

export const LODE_PATHS = [
  RouterPathEnum.LoDe3Mien,
  RouterPathEnum.LoDeSieuToc,
  RouterPathEnum.LoDeMd5,
];

export const GATE_GAME_PATHS = [
  ...LODE_PATHS,
  ...Object.values(IframeLinkEnum),
  RouterPathEnum.Sports,
  RouterPathEnum.Lottery,
  RouterPathEnum.LiveCasino,
  RouterPathEnum.GameBai,
  RouterPathEnum.Jackpot,
  RouterPathEnum.Fishing,
  RouterPathEnum.TableGame,
  RouterPathEnum.QuaySo,
  RouterPathEnum.Keno,
  RouterPathEnum.Slots,
  RouterPathEnum.Cockfight,
  RouterPathEnum.SabaSport,
  RouterPathEnum.IMSport,
  RouterPathEnum.FastGame,
  RouterPathEnum.QuaySo,
  RouterPathEnum.Favorite,
];

export const HIDE_HEADER_CAROUSEL_PATHS = [
  ...Object.values(AccountLinkEnum),
  ...Object.values(DepositLinkEnum),
  ...Object.values(WithdrawLinkEnum),
  ...Object.values(GUIDELINE_LINKS),
  ...Object.values(IframeLinkEnum),
  RouterPathEnum.News,
  RouterPathEnum.Event,
  RouterPathEnum.LoDe3Mien,
  RouterPathEnum.LoDeSieuToc,
  RouterPathEnum.LoDeMd5,
  RouterPathEnum.VipClub,
  RouterPathEnum.NotFound,
];
