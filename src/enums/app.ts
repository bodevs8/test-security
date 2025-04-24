export enum StatusCodeEnum {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  ValidationFailed = 422,
  InternalServerError = 500,
  GoneRequest = 410,
  PreconditionFailed = 412,
  PageNotFound = 404,
  AccessTokenExpired = 440,
}

export enum ResponseStatusEnum {
  Ok = 'OK',
  Invalid = 'INVALID',
  Error = 'ERROR',
  NotFound = 'NOT_FOUND',
  ShowMessage = 'SHOW_MESSAGE',
  ChangeExRate = 'CHANGE_EX_RATE',
  FailValidate = 'FAIL_VALIDATE',
  FailedValidate = 'VALIDATE_FAILED',
}

export enum ToastTypeEnum {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum ModalTypeEnum {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CONFIRM = 'confirm',
}

export enum CarouselArrowPositionEnum {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum SortEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export enum RegisterMethodEnum {
  PASSWORD = 1,
  GOOGLE = 2,
}

export enum CategoryTypeEnum {
  Hot = 'hot',
  New = 'new',
  Live = 'live',
  Branding = 'branding',
  Available = 'available',
  Maintain = 'maintain',
  Coming = 'coming',
  CurrentlyApplying = 'currently_applying',
  NotAvailable = 'not_available',
}

export enum SizeEnum {
  Default = 'default',
  Small = 'small',
  Large = 'large',
}

export enum HashEnum {
  Odds = 'ty-le-keo',
}

export enum RouterPathEnum {
  Home = '/',
  Sports = '/ca-cuoc-bong-da',
  SportSaba = '/ca-cuoc-bong-da/saba',
  SportK = '/ca-cuoc-bong-da/ksports',
  SportIM = '/ca-cuoc-bong-da/im',
  SportBTI = '/ca-cuoc-bong-da/bti',
  VirtualSport = '/ca-cuoc-bong-da#virtual-sport',
  ESport = '/ca-cuoc-bong-da#e-sport',
  Odds = '/ca-cuoc-bong-da#ty-le-keo',
  LiveCasino = '/casino-truc-tuyen',
  Lottery = '/lo-de-online',
  LotteryLode = '/lo-de-online#results-lode',
  LoDe3Mien = '/lo-de-3-mien',
  LoDeSieuToc = '/lo-de-sieu-toc',
  LoDeMd5 = '/lo-de-md5',
  VipClub = '/vip-club',
  Slots = '/slots-game',
  GameBai = '/game-bai-doi-thuong',
  Jackpot = '/game-no-hu',
  Fishing = '/ban-ca-online',
  TableGame = '/table-game',
  QuaySo = '/quay-so',
  Keno = '/xo-so-keno',
  FastGame = '/game-nhanh',
  LobbyGame = '/cong-game',
  Promotions = '/khuyen-mai',
  News = '/tin-tuc',
  ReferAFriend = '/refer-a-friend',
  Line = '/line',
  LiveChat = '',
  Affiliate = '/affiliate',
  Event = '/su-kien',
  Term = '/chinh-sach-va-dieu-khoan',
  Policy = '/chinh-sach-bao-mat',
  PromotionTerm = '/chinh-sach-khuyen-mai',
  SportBettingGuide = '/huong-dan-cuoc-the-thao',
  CasinoBettingGuide = '/huong-dan-cuoc-casino',
  LotteryGuide = '/huong-dan-cuoc-lo-de',
  EGameGuide = '/huong-dan-cuoc-e-game',
  Guideline = '/huong-dan',
  PromotionGuide = '/huong-dan-khuyen-mai',
  Faq = '/giai-dap',
  Help = '/tro-giup',
  NotFound = '/404',
  MainTain = '/maintain',
  ResetPassword = '/reset-password',
  Favorite = '/yeu-thich',
  Cockfight = '/da-ga-online',
  SabaSport = '/saba-sports',
  IMSport = '/im-sport',
  MeoHay = '/meo-cuoc-the-thao',
  DepositGuide = '/huong-dan-nap-tien',
  WithdrawGuide = '/huong-dan-rut-tien',
  P2PGuide = '/huong-dan-giao-dich-p2p',
}

export enum AccountLinkEnum {
  Prefix = '/tai-khoan',
  Overview = '/tong-quan',
  P2P = '/p2p',
  Deposit = '/nap-tien',
  Withdraw = '/rut-tien',
  TransactionHistory = '/lich-su-giao-dich',
  BetHistory = '/lich-su-ca-cuoc',
  BankInfo = '/thong-tin-ngan-hang',
  MyProfile = '/ho-so-ca-nhan',
  Password = '/mat-khau',
  PromotionApplied = '/khuyen-mai-ap-dung',
}

export enum DepositLinkEnum {
  CodePay = '/nap-tien/codepay',
  Flexpay = '/nap-tien/flexpay',
  Crypto = '/nap-tien/tien-ao',
  Ewallet = '/nap-tien/vi-dien-tu',
  PhoneCard = '/nap-tien/the-cao',
}

export enum CasinoLinkEnum {
  All = '/casino-truc-tuyen',
  XocDia = '/casino-truc-tuyen/xoc-dia',
  BauCua = '/casino-truc-tuyen/bau-cua',
  Baccarat = '/casino-truc-tuyen/baccarat',
  Blackjack = '/casino-truc-tuyen/blackjack',
  Roulette = '/casino-truc-tuyen/roulette',
  SicBo = '/casino-truc-tuyen/tai-xiu',
  Poker = '/casino-truc-tuyen/poker',
  RongHo = '/casino-truc-tuyen/rong-ho',
  Other = '/casino-truc-tuyen/other',
}

export enum CasinoSlugEnum {
  All = 'all',
  Blackjack = 'blackjack',
  XocDia = 'xoc-dia',
  BauCua = 'bau-cua',
  Baccarat = 'baccarat',
  Poker = 'poker',
  RongHo = 'rong-ho',
  TaiXiu = 'tai-xiu',
  Roulette = 'roulette',
  Other = 'other',
}

export enum WithdrawLinkEnum {
  Bank = '/rut-tien/ngan-hang',
  Crypto = '/rut-tien/tien-ao',
  PhoneCard = '/rut-tien/the-cao',
  Coin12 = '/rut-tien/coin12',
}

export enum IframeLinkEnum {
  KSport = '/ksports',
  BTI = '/btisports',
  KSPORT_VIRTUAL = '/virtual-ksports',
  INPLAY = '/im-play',
  IM_E = '/im-esports',
  IBC = '/imsports',
  SABA_VIRTUAL = '/virtual-saba-sports',
  SABA_E = '/e-saba-sports',
  OSPORT = '/saba-sports',
  PRAGMATIC_VIRTUAL = '/pp-sports',
  COCKFIGHT_WS168 = '/ws168',
  COCKFIGHT_GA28 = '/ga28',
  Volta = '/volta',
}

export enum CockfightQueryEnum {
  WS168 = '/gameUrl?p=ws168',
  GA28 = '/gameUrl?p=ga28',
}

export enum CurrencyUnit {
  DEFAULT_CURRENCY_VND = 'VND',
  DEFAULT_CURRENCY_D = 'D',
}

export enum TextAlignEnum {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export enum ScreenBreakpointEnum {
  Mobile = 768,
  Tablet = 1024,
  Desktop = 1280,
  DesktopLarge = 1440,
}

export enum PackageIdEnum {
  Welcome = 2,
  Return = 1,
}

export enum BankStatusEnum {
  Active = 0,
  Inactive = 1,
}

export enum Coin12LinkEnum {
  CreateWallet = '/register',
  Deposit = '/faqs?tab=tai-khoan&detail=cach-dang-ky-tai-khoan&lang=vi',
  Withdraw = '/faqs?tab=transaction',
}

export enum LobbyCategoryEnum {
  Game = 1,
  Casino = 2,
}

export enum TextTransformEnum {
  CAPITALIZE = 'capitalize',
  NONE = 'none',
}

export enum LiveCasinoGameEnum {
  B52 = 'b52',
  Go = 'go',
  Sungame = 'sungame',
  Game789 = 'game789',
}

export enum BottomMenuTypeEnum {
  GateGames = 'gate-games',
  LiveChat = 'live-chat',
  Link = 'link',
}

export enum BottomMenuIdEnum {
  Home = 'home',
  GateGames = 'gate-games',
  Promotion = 'promotion',
  Deposit = 'deposit',
  Account = 'account',
  LiveChat = 'live-chat',
}
