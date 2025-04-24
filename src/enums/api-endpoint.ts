export enum ApiEndpointEnum {
  // authentication
  SetCookie = '/api/set-cookie',
  ClearCookies = '/api/clear-cookie',
  Login = '/api-main/v1/login',
  LoginWithToken = '/api-main/v1/user/login',
  LoginWithTokenInternal = '/api/login-with-token',
  Register = 'api-main/v1/register',
  Logout = 'api-main/v1/logout',
  SendMailResetPassword = '/api-main/v1/forgotPassword',
  SendTeleResetPassword = '/api-main/v1/user/sendOtp',
  ResetPasswordByToken = '/api-main/v1/resetPassword',
  ResetPasswordByOtp = '/api-main/v1/user/resetPasswordByOtp',
  ChangePassword = '/api-main/v1/updatePassword',
  // schedule matches
  ScheduleMatches = '/api-promotion/v1/livescore/seasons/summaries',
  ScheduleCompetitions = '/api-promotion/v1/livescore/competitions',
  HotMatch = '/api-promotion/v1/hotmatch',
  // game
  GameSearch = '/api-main/v1/game/search',
  BigWins = '/api-main/v1/home/bigwin',
  // account
  GetInfo = '/api-main/v1/account/info',
  RefreshUserInfo = '/api-main/v1/refresh',
  TransactionHistory = '/api-main/v1/lsgd',
  BetHistory = '/api-main/v1/lsb',
  GameProviders = '/api-main/v1/config/providers',
  GetBet = '/api-main/v1/account/bet',
  GetCommission = '/api-main/v1/account/commission',
  CancelPromotion = '/api-main/v1/payment/cancelpromotion',
  UserBank = '/api-main/v1/account/userbank',
  CreateUserBank = '/api-main/v1/account/createBank',
  VipProfile = '/api-promotion/v1/vip/profile',
  ReferralCode = '/api-promotion/v1/referral/code',
  ReferralFriends = '/api-promotion/v1/referral/list',
  UpdateUserInfo = '/api-main/v1/updateInfo',
  VerifyUpdateEmail = '/api-main/v1/user/verify-update-info',
  GetOtpUser = '/api-main/v1/user/getOTP',
  EmailOTPVerification = '/api-main/v1/user/emailOTPVerification',
  TelegramOTPVerification = '/api-main/v1/user/telegramOTPVerification',
  // News
  GetPosts = '/api-main/v1/posts/new',
  GetPostDetail = '/api-main/v1/post',
  GetPostsMostView = '/api-main/v1/posts/most/view',
  // Iframe
  IframeSaba = '/api-main/v1/athena/sportUrl',
  IframeKSports = '/api-main/v1/tp/ksportUrl?loginPath=?openModal=login&registerPath=?openModal=register',
  IframeVolta = '/api-main/v1/tp/ksportUrl?loginPath=ksports&login=true&sportType=1_10',
  IframeBtiSports = '/api-main/v1/gameUrl?partnerProvider=bti',
  IframeImSports = '/api-main/v1/gameUrl?partnerProvider=im&gId=sport',
  IframeSabaE = '/api-main/v1/athena/esportsUrl',
  IframeImPlayE = '/api-main/v1/gameUrl?partnerProvider=im&partnerGameId=esport',
  IframeImPlay = '/api-main/v1/gameUrl?partnerProvider=im&gameName=vsport',
  IframeSabaVitrual = '/api-main/v1/athena/vsUrl',
  IframeKsportVirtual = '/api-main/v1/tp/ksportUrl?loginPath=?openModal=login&registerPath=?openModal=register&leagueId&matchId&sportType=1_8',
  IframePragmaticVirtual = '/api-main/v1/gameUrl?p=pragmatic&gId=vpfh3',
  IframeLoDeSieuToc = '/api-main/v1/lodeVirtualUrl',
  IframeLoDe3Mien = '/api-main/v1/play/lo-de-3-mien',
  GameUrl = '/api-main/v1/gameUrl',

  // Payment
  IndexDeposit = '/api-main/v1/payment/indexdeposit',
  DepositCrypto = '/api-main/v1/payment/crypto/deposit',
  DetailDepositCrypto = '/api-main/v1/payment/crypto/address',
  PhoneCard = '/api-main/v1/payment/gwinfo',
  DepositNicepayInfo = '/api-main/v1/payment/nicepayInfo',
  DepositFlexpay = '/api-main/v1/payment/ewallet',
  WithdrawCryptoList = '/api-main/v1/payment/crypto/withdraw',
  WithdrawCrypto = '/api-main/v1/payment/withdraw-crypto',
  DepositPhoneCard = '/api-main/v1/payment/depositcard',
  WithdrawBank = '/api-main/v1/payment/withdrawbank',
  GetEwalletCode = '/api-main/v1/payment/ewalletCode',

  // Lottery
  LotteryCity = '/api-lottery/v1/cities',
  LotteryResult = '/api-lottery/v1/results',
  // Vip
  VipInfo = '/api-promotion/v1/vips',
  WithdrawPhoneCard = '/api-main/v1/payment/withdrawcard',
  DepositCodepay = '/api-main/v1/payment/nicepay',

  // Casino
  CasinoGameList = '/api-main/v1/casino/search',

  // Favorite
  FavoriteGameList = '/api-main/v1/search/lobby/game',
  FavoriteGame = '/api-main/v1/game/favorite',
  FavoriteCasino = '/api-main/v1/casino/favorite',
  UnfavoriteGame = '/api-main/v1/game/unfavorite',
  UnfavoriteCasino = '/api-main/v1/casino/unfavorite',

  // Jackpot
  JackpotGameList = '/api-main/v1/slot/jackpot',
}
