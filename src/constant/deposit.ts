import type { ResultFieldMappingType } from '@/types/deposit';
import { EwalletMethodEnum, PackageIdEnum } from '@/enums';
import Binance from '@/public/images/box-note/crypto/binance.svg';
import CardTipCoin12 from '@/public/images/box-note/crypto/coin12.svg';
import Huobi from '@/public/images/box-note/crypto/huobi.svg';
import Remitano from '@/public/images/box-note/crypto/remitano.svg';

import MomoImage from '@/public/images/ewallet/momo.webp';
import ViettelImage from '@/public/images/ewallet/viettelmoney.webp';
import ZaloImage from '@/public/images/ewallet/zalopay.webp';
import { GUIDELINE_LINKS } from './guidelines/guideline';

export const DEPOSIT_CONSTANT: Record<string, string> = {
  tracking_cryptoUrl: process.env.NEXT_PUBLIC_DEPOSIT_CRYPTO_URL || '',
};

export const CRYPTO_TUTORIAL_DATA = [
  {
    href: `/${GUIDELINE_LINKS.BINANCE_GUIDE}`,
    image: Binance,
    key: 'binance',
  },
  {
    href: `/${GUIDELINE_LINKS.REMITANO_GUIDE}`,
    image: Remitano,
    key: 'remitano',
  },
  {
    href: `/${GUIDELINE_LINKS.HUOBI_GUIDE}`,
    image: Huobi,
    key: 'huobi',
  },
  {
    href: `/${GUIDELINE_LINKS.COIN12_GUIDE}`,
    image: CardTipCoin12,
    key: 'coin12',
  },
];

export const MIN_AMOUNT_DEPOSIT = 50000; // VND
export const MAX_AMOUNT_DEPOSIT = 300000000; // VND
export const PRESET_AMOUNT_DEPOSIT = [
  50, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000,
  1000000,
];

export const MIN_AMOUNT_WITHDRAW = 100000; // VND
export const MAX_AMOUNT_WITHDRAW = 1000000000; // VND

export const SELECT_PACKAGE = [
  {
    value: PackageIdEnum.Return,
    label: 'Pages.Account.deposit.codepay.form.package.return',
  },
  {
    value: PackageIdEnum.Welcome,
    label: 'Pages.Account.deposit.codepay.form.package.welcome',
  },
];

export const REFRESH_TIMER = 4000;
export const REDIRECT_TIMER = 30;
export const RENEW_TIMER = 60;
export const EXPIRED_TIMER = 10 * 60; // 10 minutes
export const IGNORE_CARD_LIST = ['ZING'];

export const FIELD_MAPPING: ResultFieldMappingType = {
  invoice: {
    flexpay: 'id',
    codepay: 'invoice_id',
  },
  qr: {
    flexpay: 'qr_code',
    codepay: 'qrcode',
  },
  bank: {
    flexpay: 'real_bank_code',
    codepay: 'bank_code',
  },
  account: {
    flexpay: 'account_no',
    codepay: 'bank_account_no',
  },
  name: {
    flexpay: 'account_name',
    codepay: 'bank_account_name',
  },
  note: {
    flexpay: 'desc_code',
    codepay: 'code',
  },
};
export const EWALLET_MAPPING_PROVIDER = {
  turbo: 'ONEVNPAY',
  sonic: 'GOPAY',
  lucky: '',
};

export const EWALLET_MAPPING_WALLET = {
  [EwalletMethodEnum.Momo]: 'Momo',
  [EwalletMethodEnum.ZaloPay]: 'Zalo Pay',
  [EwalletMethodEnum.ViettelPay]: 'Viettel Pay',
};

export const EWALLET_MAPPING_ICON = {
  [EwalletMethodEnum.Momo]: MomoImage,
  [EwalletMethodEnum.ZaloPay]: ZaloImage,
  [EwalletMethodEnum.ViettelPay]: ViettelImage,
};

export const REFRESH_INTERVAL = 5000;
