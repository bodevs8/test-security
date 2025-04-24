export enum HistoryStatusEnum {
  ALL = 'ALL',
  CANCEL = 'CANCEL',
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
  DELETE = 'DELETE',
  CANCELLED = 'CANCELLED',
  CC_PENDING = 'CC_PENDING',
  PROCESSING = 'PROCESSING',
  CC_PROCESSING = 'CC_PROCESSING',
  SMART_PAY_PROCESSING = 'SMART_PAY_PROCESSING',
  PHONE_CARD_PROCESSING = 'PHONE_CARD_PROCESSING',
  MOMO_PROCESSING = 'MOMO_PROCESSING',
  APPROVED = 'APPROVED',
  WAITING = 'WAITING',
  DRAFT = 'DRAFT',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  COMMISSION = 'COMMISSION',
  REFUND = 'REFUND',
}

export enum HistoryMethodsEnum {
  PHONE_CARD = 'phone_card',
  ATM = 'ATM',
  MOMO = 'momo',
  COMMISSION = 'COMMISSION',
  BANK = 'Bank',
  BANK_ACCOUNT = 'bank_account',
  IBANKING = 'ibanking',
  IBANKING_CP = 'IBankingCP',
  CRYPTO = 'Crypto',
  SYSTEM = 'system',
  CASHBACK = 'cashback',
  P2P = 'p2p',
}

export enum HistoryActionsEnum {
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT',
}

export enum HistoryPackageEnum {
  PAYMENT = 'PAYMENT',
  PROMOTION_CANCEL = 'PROMOTION_CANCEL',
  PROMOTION = 'PROMOTION',
  COMMISSION = 'COMMISSION',
}

export enum HistoryTypesEnum {
  HISTORY_SUCCESS = 'HISTORY_SUCCESS',
  HISTORY_PENDING = 'HISTORY_PENDING',
  HISTORY_CANCEL = 'HISTORY_CANCEL',
}

export enum HistoryCryptoMethodEnum {
  CRYPTO = 'crypto',
  CRYPTO_PAY = 'cryptopay',
}

export enum HistoryCryptoTypeEnum {
  USDT = 'usdt',
  KDG = 'kdg',
  ETHEREUM = 'ethereum',
  BINANCE = 'binance',
  BITCOIN = 'bitcoin',
}

export enum HistoryCryptoNameEnum {
  USDT = 'USDT (TRC20)',
  KDG = 'KDG (KCHAIN)',
  ETH = 'ETH (ERC20)',
  BNB = 'BNB (BEP20)',
}

export enum HistoryBankCodeEnum {
  P2P = 'p2p',
  CRYPTO = 'crypto',
  EWALLET = 'ewallet',
  PHONE_CARD = 'phone_card',
}

export enum HistoryEwalletEnum {
  MOMO = 'momo',
  ZALOPAY = 'zalopay',
  ZALO = 'zalo',
  VIETTEL_MONEY = 'viettelmoney',
  VIETTEL = 'viettel',
}

export enum HistoryCardProviderEnum {
  VIETTEL = 'viettel',
  MOBIFONE = 'mobifone',
  MOBIPHONE = 'mobiphone',
  VINAPHONE = 'vinaphone',
  VINAFONE = 'vinafone',
  VIETNAMMOBILE = 'vietnammobile',
  VIETNAM_MOBILE = 'vietnam_mobile',
  VIETNAMOBILE = 'vietnamobile',
}

export enum HistoryLocalesMethodEnum {
  CASHBACK = 'cashback',
  P2P = 'p2p',
  PHONE_CARD = 'phone_card',
  BANK_ACCOUNT = 'bank_account',
  CRYPTO = 'crypto',
  CRYPTO_PAY = 'cryptopay',
  IBANKING = 'ibanking',
  EWALLET = 'ewallet',
  MOMO = 'momo',
  ZALOPAY = 'zalopay',
  VIETTEL_MONEY = 'viettel_money',
  REFUND = 'refund',
  NICEPAY = 'nicepay',
  CODEPAY = 'codepay',
  FLEXPAY = 'flexpay',
  CANCEL_PROMOTION = 'cancel_promotion',
  VIP_LEVEL_UP = 'vip_level_up',
  VIP_NEW_YEAR = 'vip_new_year',
  SYSTEM = 'system',
}

export enum HistoryLocalesTypeEnum {
  DEPOSIT = 'action_type.deposit',
  WITHDRAW = 'action_type.withdraw',
  PROMOTION_CANCEL = 'action_type.cancel_promotion',
  PROMOTION = 'action_type.promotion',
}
