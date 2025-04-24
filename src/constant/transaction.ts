import {
  HistoryActionsEnum,
  HistoryCryptoMethodEnum,
  HistoryCryptoNameEnum,
  HistoryCryptoTypeEnum,
  HistoryLocalesTypeEnum,
  HistoryStatusEnum,
  HistoryTypesEnum,
} from '@/enums';

export const HISTORY_SUCCESS = [
  HistoryStatusEnum.FINISHED,
  HistoryStatusEnum.SUCCESS,
];

export const HISTORY_PENDING = [
  HistoryStatusEnum.PENDING,
  HistoryStatusEnum.CC_PENDING,
  HistoryStatusEnum.SMART_PAY_PROCESSING,
  HistoryStatusEnum.PHONE_CARD_PROCESSING,
  HistoryStatusEnum.MOMO_PROCESSING,
  HistoryStatusEnum.APPROVED,
  HistoryStatusEnum.PROCESSING,
  HistoryStatusEnum.DRAFT,
];

export const HISTORY_CANCEL = [
  HistoryStatusEnum.CANCEL,
  HistoryStatusEnum.CANCELLED,
  HistoryStatusEnum.FAIL,
  HistoryStatusEnum.DELETE,
];

export const ALL_VALUE = 'ALL';

export const HistoryFilter = {
  ALL: '',
  [HistoryTypesEnum.HISTORY_SUCCESS]: HISTORY_SUCCESS,
  [HistoryTypesEnum.HISTORY_PENDING]: HISTORY_PENDING,
  [HistoryTypesEnum.HISTORY_CANCEL]: HISTORY_CANCEL,
};

export const FILTER_STATUS = [
  {
    label: 'filter.status.all',
    value: ALL_VALUE,
  },
  {
    label: 'filter.status.success',
    value: HistoryTypesEnum.HISTORY_SUCCESS,
  },
  {
    label: 'filter.status.processing',
    value: HistoryTypesEnum.HISTORY_PENDING,
  },
  {
    label: 'filter.status.cancel',
    value: HistoryTypesEnum.HISTORY_CANCEL,
  },
];

export const FILTER_ACTION = [
  {
    label: 'filter.action.all',
    value: ALL_VALUE,
  },
  {
    label: 'filter.action.withdraw',
    value: HistoryActionsEnum.WITHDRAW,
  },
  {
    label: 'filter.action.deposit',
    value: HistoryActionsEnum.DEPOSIT,
  },
];

export const CRYPTO_METHOD = [
  HistoryCryptoMethodEnum.CRYPTO,
  HistoryCryptoMethodEnum.CRYPTO_PAY,
];

export const MAPPING_CRYPTO: Record<string, HistoryCryptoTypeEnum> = {
  usdttrc20: HistoryCryptoTypeEnum.USDT,
  kdgkchain: HistoryCryptoTypeEnum.KDG,
  kchain: HistoryCryptoTypeEnum.KDG,
  etherc20: HistoryCryptoTypeEnum.ETHEREUM,
  eth: HistoryCryptoTypeEnum.ETHEREUM,
  bnbbep20: HistoryCryptoTypeEnum.BINANCE,
  bnb: HistoryCryptoTypeEnum.BINANCE,
  p2p: HistoryCryptoTypeEnum.BITCOIN,
};

export const MAPPING_CRYPTO_NAME: Record<string, HistoryCryptoNameEnum> = {
  usdttrc20: HistoryCryptoNameEnum.USDT,
  kdgkchain: HistoryCryptoNameEnum.KDG,
  kchain: HistoryCryptoNameEnum.KDG,
  etherc20: HistoryCryptoNameEnum.ETH,
  bnbbep20: HistoryCryptoNameEnum.BNB,
};

export const TRANSACTION_TYPE_STYLES: Record<HistoryLocalesTypeEnum, string> = {
  [HistoryLocalesTypeEnum.DEPOSIT]: 'text-primary-100 bg-deposit-card',
  [HistoryLocalesTypeEnum.WITHDRAW]: 'text-secondary-100 bg-withdraw-card',
  [HistoryLocalesTypeEnum.PROMOTION_CANCEL]:
    'text-purple-100 bg-cancel-promotion-card',
  [HistoryLocalesTypeEnum.PROMOTION]: 'text-yellow-100 bg-promotion-card',
};
