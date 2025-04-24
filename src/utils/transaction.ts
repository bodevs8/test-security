import type { HistoryCryptoMethodEnum } from '@/enums';
import type { TransactionDataType } from '@/types/transaction';
import { DEFAULT_HISTORY_LIMIT } from '@/constant/app';
import { BANK_CODE_LIST } from '@/constant/bank';
import {
  MAPPING_BANK_ROUDED_IMAGE,
  MAPPING_CRYPTO_IMAGE,
} from '@/constant/images';
import { MAPPING_E_WALLET_IMAGE } from '@/constant/images/ewallet';
import { MAPPING_PHONE_CARD_IMAGE } from '@/constant/images/phone-card';
import {
  CRYPTO_METHOD,
  MAPPING_CRYPTO,
  MAPPING_CRYPTO_NAME,
} from '@/constant/transaction';
import {
  HistoryActionsEnum,
  HistoryBankCodeEnum,
  HistoryCardProviderEnum,
  HistoryEwalletEnum,
  HistoryLocalesMethodEnum,
  HistoryLocalesTypeEnum,
  HistoryMethodsEnum,
  HistoryPackageEnum,
  HistoryStatusEnum,
} from '@/enums';
import { getBankFromCode } from './bank';

export const getTypeTransaction = (item: TransactionDataType) => {
  if (!item) {
    return '';
  }
  switch (item.type) {
    case HistoryPackageEnum.PROMOTION:
    case HistoryPackageEnum.COMMISSION:
    case HistoryPackageEnum.PROMOTION_CANCEL:
      return HistoryLocalesTypeEnum.PROMOTION;
    case HistoryPackageEnum.PAYMENT:
      return item.action === HistoryActionsEnum.DEPOSIT
        ? HistoryLocalesTypeEnum.DEPOSIT
        : HistoryLocalesTypeEnum.WITHDRAW;
    default:
      return '';
  }
};

export function getCryptoIcon(provider: string | undefined | null) {
  if (!provider) {
    return '';
  }

  const iconName = provider?.toLowerCase() ?? '';
  const cryptoImage = MAPPING_CRYPTO[iconName] ?? iconName;

  return MAPPING_CRYPTO_IMAGE[cryptoImage] ?? '';
}

export function getCryptoName(provider: string | undefined | null) {
  if (!provider) {
    return '';
  }

  const providerName = provider?.toLowerCase();
  return MAPPING_CRYPTO_NAME[providerName] ?? provider;
}

export function getPhoneCardIcon(provider: string | undefined) {
  if (!provider) {
    return '';
  }

  const PROVIDER: Record<string, string> = {
    mobifone: 'mobiphone',
  };
  const providerTransform = PROVIDER[provider] ?? provider;

  return MAPPING_PHONE_CARD_IMAGE[providerTransform];
}

export function getBankCodeIcon(item: TransactionDataType) {
  const toBankCode = item?.to_bank_code
    ? item?.to_bank_code?.toLowerCase()
    : null;
  let cardProvider = item?.card_provider
    ? item?.card_provider?.toLowerCase()
    : null;

  // P2P
  if (toBankCode === HistoryBankCodeEnum.P2P) {
    return MAPPING_CRYPTO_IMAGE.btc;
  }
  const method = item.method?.toLowerCase() ?? '';

  // wallet
  if (
    method === HistoryEwalletEnum.MOMO ||
    toBankCode?.includes(HistoryEwalletEnum.MOMO)
  ) {
    return MAPPING_E_WALLET_IMAGE.momo;
  }
  if (
    method === HistoryEwalletEnum.ZALOPAY ||
    method.includes(HistoryEwalletEnum.ZALO) ||
    toBankCode?.includes(HistoryEwalletEnum.ZALO)
  ) {
    return MAPPING_E_WALLET_IMAGE.zalo;
  }
  if (
    method === HistoryEwalletEnum.VIETTEL_MONEY ||
    method.includes(HistoryEwalletEnum.VIETTEL) ||
    (method !== HistoryBankCodeEnum.PHONE_CARD &&
      toBankCode?.includes(HistoryEwalletEnum.VIETTEL))
  ) {
    return MAPPING_E_WALLET_IMAGE.viettel;
  }

  // phone card
  const cardProviderList = [
    HistoryCardProviderEnum.VIETTEL,
    HistoryCardProviderEnum.MOBIFONE,
    HistoryCardProviderEnum.MOBIPHONE,
    HistoryCardProviderEnum.VINAPHONE,
    HistoryCardProviderEnum.VINAFONE,
    HistoryCardProviderEnum.VIETNAMMOBILE,
    HistoryCardProviderEnum.VIETNAMOBILE,
    HistoryCardProviderEnum.VIETNAM_MOBILE,
  ];
  if (
    cardProvider ||
    (toBankCode &&
      cardProviderList.includes(
        toBankCode?.toLowerCase() as HistoryCardProviderEnum,
      ))
  ) {
    cardProvider = cardProvider ?? toBankCode?.toLowerCase() ?? '';
    return getPhoneCardIcon(cardProvider);
  }

  // IBanking
  if (toBankCode) {
    const bankIcon = getBankFromCode(toBankCode) ?? '';
    return MAPPING_BANK_ROUDED_IMAGE[bankIcon];
  }
  return '';
}

export const replaceMethod = (method: string | undefined | null) => {
  if (!method) {
    return '';
  }
  const methodTransform = method.toLowerCase();

  if (methodTransform.includes(HistoryMethodsEnum.CASHBACK)) {
    return HistoryLocalesMethodEnum.CASHBACK;
  }

  if (
    methodTransform?.includes(HistoryEwalletEnum.VIETTEL) ||
    methodTransform?.includes(HistoryEwalletEnum.ZALO)
  ) {
    return HistoryLocalesMethodEnum.EWALLET;
  }

  const enumValue =
    HistoryLocalesMethodEnum[
      methodTransform as keyof typeof HistoryLocalesMethodEnum
    ];
  return enumValue ?? methodTransform;
};

export function calculateTotalPages(
  total: number,
  perPage = DEFAULT_HISTORY_LIMIT,
) {
  if (!total) return 0;
  return Math.ceil(total / perPage);
}

export const getBankCodeDataView = (data: TransactionDataType) => {
  const methodLowerCase = data.method?.toLowerCase() ?? '';
  const toBankCode = data.to_bank_code?.toLowerCase() ?? '';
  const cryptoName = getCryptoName(toBankCode);
  const isCryptoMethod = CRYPTO_METHOD.includes(
    methodLowerCase as HistoryCryptoMethodEnum,
  );
  const bankIcon = getBankCodeIcon(data);
  const bankNameMapping = BANK_CODE_LIST.find(
    (bank) =>
      bank.bank_code.toLowerCase() === toBankCode ||
      bank.bank_code_codepay?.toLowerCase() === toBankCode,
  )?.bank_name;

  const bankName =
    (toBankCode === HistoryBankCodeEnum.P2P
      ? HistoryBankCodeEnum.P2P.toUpperCase()
      : bankNameMapping || data?.to_bank_code) || data.card_provider;

  return {
    isCryptoMethod,
    cryptoName,
    bankIcon,
    bankName,
    toBankCode,
  };
};

export const getBankTrancodeDataView = (data: TransactionDataType) => {
  const method = (data.method ?? '').toLowerCase();
  const isMethodPhoneCard =
    data.method === HistoryMethodsEnum.PHONE_CARD &&
    data.action === HistoryActionsEnum.WITHDRAW &&
    data.status === HistoryStatusEnum.FINISHED;
  const isShowBankTrancode =
    data.bank_trancode &&
    [HistoryStatusEnum.FINISHED, HistoryStatusEnum.SUCCESS].includes(
      data.status as HistoryStatusEnum,
    ) &&
    [
      HistoryLocalesMethodEnum.CODEPAY,
      HistoryLocalesMethodEnum.NICEPAY,
      HistoryLocalesMethodEnum.FLEXPAY,
    ].includes(method as HistoryLocalesMethodEnum);

  return {
    isMethodPhoneCard,
    isShowBankTrancode,
  };
};
