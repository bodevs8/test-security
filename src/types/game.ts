import type {
  CasinoCategoryEnum,
  CasinoLobbyKeyEnum,
  CategoryTypeEnum,
  GameCategoryEnum,
  GameProviderEnum,
  IframeLinkEnum,
  LiveStreamEnum,
  LobbyCategoryEnum,
  LobbyTypeEnum,
  ResponseStatusEnum,
  RouterPathEnum,
  TopWinnerEnum,
} from '@/enums';
import type { StaticImageData } from 'next/image';

export type CategoryFeatured = {
  id: number;
  src: string;
  srcMobile: string;
  title: string;
  content: string;
  label?: CategoryTypeEnum;
  href: RouterPathEnum;
};

export type LobbyCategory = {
  type: GameCategoryEnum | CasinoCategoryEnum;
  title: string;
  partnerKey?: string;
  link: string;
  icon: string;
  iconSvg: StaticImageData | string;
  slugKey?: string;
  isLobby?: boolean;
  hidden?: boolean;
};

export type CasinoCategory = {
  title: string;
  link: string;
  key: string;
  icon?: string;
  type?: CasinoCategoryEnum;
  partnerKey?: string;
  lobbyKey: CasinoLobbyKeyEnum;
};

export type RequestParams = {
  page?: number;
  limit?: number;
  type?: string;
  partner?: string;
  sort?: string;
  filter?: string;
  keyword?: string;
  lobbyType?: LobbyTypeEnum;
};

export type LiveCasinoGame = {
  id: number;
  title: string;
  icon: string;
  img: string | StaticImageData;
  imgMobile: string | StaticImageData;
  partner_provider: string;
  partner_game_id: string;
  api_url?: string;
  isPlaying: boolean;
  isDisabled?: boolean;
};

export type SportBannerGame = {
  id: number;
  href: RouterPathEnum;
  img: string;
  imgTab: string;
  name: string;
};

export type IFrameLinkSports = {
  id: number;
  href: IframeLinkEnum;
  img: string;
  imgMobile: string;
  imgTab: string;
  name: string;
};

export type TypeGameItem = {
  id?: string | number;
  name?: string;
  image?: string | StaticImageData;
  image_mobile?: string | StaticImageData;
  partner_provider?: string;
  partner_game_id?: string | number;
  partner?: string;
  display_types?: any;
  api_url?: string;
  maintain?: boolean;
  tags?: string | null;
  deny_info?: boolean;
  alt?: string;
  partner_txt?: string;
  jackpot?: number | null;
  is_favorite?: boolean;
  partner_game_type?: string | number;
  video_src?: string;
  gamethumb?: string;
  isLoading?: boolean;
  live_casino_key?: string | number;
  view?: any;
  img?: string;
  table_id?: string;
  category_id?: LobbyCategoryEnum;
};

export type JackpotGameItem =
  | (TypeGameItem & {
      image: string;
      jackpot_value: number;
    })
  | undefined;

type Team = {
  name: string;
  flag_thumbnail: string;
};

type Odds = {
  rate: string;
  odds: string;
};

type Euro = {
  hTeam: {
    odds: string;
  };
  aTeam: {
    odds: string;
  };
  draw: {
    odds: string;
  };
};

export type HotMatchType = {
  teams: Team[];
  league_name: string;
  league_name_text: string;
  league_image: string;
  league_id: number;
  match_id: number;
  text_time: string;
  hdp: {
    hTeam: Odds;
    aTeam: Odds;
  };
  ou: {
    hTeam: Odds;
    aTeam: Odds;
  };
  euro: Euro;
};

export type GamesType = {
  display_type: string;
  display_types: string[];
  items: TypeGameItem[];
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type JackpotGameDefinition = {
  key: number;
  lobby_url: string;
  jackpot_trigger: number;
  jackpot_value: number;
  is_valid?: boolean;
  is_jackpot_event?: boolean;
  is_live_stream?: boolean;
} & TypeGameItem;

export type UrlResponse = {
  url: string;
  url_mobile: string;
};

export type GameUrlTypeResponse = UrlResponse & {
  value?: {
    status: ResponseStatusEnum;
    message: string;
    data?: UrlResponse;
  };
};

export type GameProviderOption = {
  key: string;
  name: string;
  label: string;
  icon?: string;
};

export type GameProvidersType = {
  [key: string]: GameProviderOption[];
};

export type TopWinnerItem = {
  username: string;
  winlost: number;
  name: string;
};

export type NearWinItem = TopWinnerItem & {
  image: string;
  partner_provider: string;
  partner_game_id: string;
};

export type BigWins = {
  nearWin: NearWinItem[];
  monthWin: NearWinItem[];
  weekWin: NearWinItem[];
};

export type TopWinnerType = {
  [TopWinnerEnum.Day]: TopWinnerItem[];
  [TopWinnerEnum.Week]: TopWinnerItem[];
  [TopWinnerEnum.Month]: TopWinnerItem[];
};

export type LiveStreamTokenType = {
  id: string;
  key: string;
};

export type LobbyInitialData = {
  gameList: GamesType;
  gameProviders: GameProvidersType;
  params: RequestParams;
  isFavoriteLobby?: boolean;
};

export type LobbyTypeOption = {
  key: string;
  label: string;
  value: string;
  icon?: string;
  iconActive?: string;
};

export type HotGame = {
  id: number;
  img: string | StaticImageData;
  imgMb: string | StaticImageData;
  title: string;
  isThumbnail?: boolean;
  href: string;
  requireLogin?: boolean;
  orderOnPc: number;
  orderOnMb: number;
};

export type LiveCasinoSmallThumb = {
  id: number;
  img: string | StaticImageData;
  imgMb: string | StaticImageData;
  provider: GameProviderEnum;
  partner_provider: GameProviderEnum;
  partner_game_id: LiveStreamEnum;
  href: string;
};
