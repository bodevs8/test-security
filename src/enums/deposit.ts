export enum DepositMethodEnum {
  INDEX = 'index',
  CODEPAY = 'codepay',
  FLEXPAY = 'flexpay',
  CRYPTO = 'crypto',
  EWALLET = 'ewallet',
  PHONE_CARD = 'phone_card',
}

export enum StepDepositEnum {
  PREPARE = 0,
  FORM = 1,
  RESULT = 2,
}

export enum PhoneCardStatusEnum {
  Active = 1,
  InActive = 0,
}

export enum FlexpayTabEnum {
  TURBO = 'turbo',
  SONIC = 'sonic',
}

export enum FlexpayProviderEnum {
  GOPAY = 'GOPAY',
}

export enum FlexpayWalletEnum {
  FASTPAY = 'FASTPAY',
}

export enum EwalletTabEnum {
  TURBO = 'turbo',
  SONIC = 'sonic',
  LUCKY = 'lucky',
}

export enum EwalletMethodEnum {
  Momo = 'MOMO',
  ZaloPay = 'ZALO_PAY',
  ViettelPay = 'VIETTEL_PAY',
}

export enum LinkCrytoEnum {
  KDG = 'https://scan.kdong.io/address',
  USDT = 'https://tronscan.org/#/address',
  ETH = 'https://etherscan.io/address',
  BNB = 'https://bscscan.com/address',
}

export enum EWalletTabEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}
