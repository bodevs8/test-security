import type { BET_HISTORY_FILTER } from '@/constant/bet-history';

export type BetFilterStatus =
  (typeof BET_HISTORY_FILTER)[keyof typeof BET_HISTORY_FILTER];
export type BetFilterKeys = keyof typeof BET_HISTORY_FILTER;

export type GetBetHistoryParams = {
  limit: number;
  page: number;
  status: BetFilterStatus;
};

export type BetHistoryDataType = {
  id: number;
  created_time: string;
  sport_name: string;
  product: string;
  amount: number;
  stake: number;
  stake_txt?: string;
  winlost: number;
  winlost_txt?: string;
  commission: string;
  commission_txt?: string;
  ticket_status: string;
  game_your_bet: string;
  play_in_package_id?: number;
  turnover_rolling2?: number;
  turnover_rolling_txt?: number;
  turnover_rolling?: number;
};
