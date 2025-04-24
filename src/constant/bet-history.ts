import { BetStatusEnum } from '@/enums';

export const BET_WIN = [
  BetStatusEnum.WIN,
  BetStatusEnum.WON,
  BetStatusEnum.HAFT_WIN,
  BetStatusEnum.HAFT_WON,
  BetStatusEnum.HALF_WIN,
  BetStatusEnum.HALF_WON,
];

export const BET_LOSE = [
  BetStatusEnum.LOSE,
  BetStatusEnum.HAFT_LOSE,
  BetStatusEnum.HALF_LOSE,
  BetStatusEnum.HAFT_LOST,
  BetStatusEnum.HALF_LOST,
];

export const BET_CANCEL = [
  BetStatusEnum.CANCEL,
  BetStatusEnum.CANCELED,
  BetStatusEnum.REFUND,
  BetStatusEnum.VOID,
];
export const BET_REJECT = [BetStatusEnum.REJECT];
export const BET_HALF_WIN = [
  BetStatusEnum.HAFT_WIN,
  BetStatusEnum.HAFT_WON,
  BetStatusEnum.HALF_WIN,
  BetStatusEnum.HALF_WON,
];

export const BET_HAFL_LOSE = [
  BetStatusEnum.HAFT_LOSE,
  BetStatusEnum.HALF_LOSE,
  BetStatusEnum.HAFT_LOST,
  BetStatusEnum.HALF_LOST,
];

export const BET_PROCESSING = [
  BetStatusEnum.PENDING,
  BetStatusEnum.OPENED,
  BetStatusEnum.RUNNING,
  BetStatusEnum.RUNING,
  BetStatusEnum.PROCESSING,
  BetStatusEnum.BET,
  BetStatusEnum.WAITING,
  BetStatusEnum.OPEN,
];

export const BET_DRAW = [BetStatusEnum.DRAW];

export const BET_TIP = [BetStatusEnum.TIP, BetStatusEnum.TIPS];

export const BET_HISTORY_FILTER = {
  [BetStatusEnum.ALL]: '',
  [BetStatusEnum.WIN]: BET_WIN,
  [BetStatusEnum.LOSE]: BET_LOSE,
  [BetStatusEnum.CANCEL]: BET_CANCEL,
  [BetStatusEnum.REJECT]: BET_REJECT,
  [BetStatusEnum.TIP]: BET_TIP,
  [BetStatusEnum.HALF_WIN]: BET_HALF_WIN,
  [BetStatusEnum.HALF_LOSE]: BET_HAFL_LOSE,
  [BetStatusEnum.PROCESSING]: BET_PROCESSING,
  [BetStatusEnum.DRAW]: BET_DRAW,
};

export const ALL_VALUE = 'ALL';

export const BET_FILTER_STATUS = [
  {
    label: 'filter.status.all',
    value: ALL_VALUE,
  },
  {
    label: 'filter.status.win',
    value: BetStatusEnum.WIN,
  },
  {
    label: 'filter.status.half_win',
    value: BetStatusEnum.HALF_WIN,
  },
  {
    label: 'filter.status.lose',
    value: BetStatusEnum.LOSE,
  },
  {
    label: 'filter.status.half_lose',
    value: BetStatusEnum.HALF_LOSE,
  },
  {
    label: 'filter.status.tip',
    value: BetStatusEnum.TIP,
  },
  {
    label: 'filter.status.cancel',
    value: BetStatusEnum.CANCEL,
  },
  {
    label: 'filter.status.draw',
    value: BetStatusEnum.DRAW,
  },
  {
    label: 'filter.status.reject',
    value: BetStatusEnum.REJECT,
  },
  {
    label: 'filter.status.processing',
    value: BetStatusEnum.PROCESSING,
  },
];
