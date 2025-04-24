import type { HistoryFilter } from '@/constant/transaction';
import type { HistoryActionsEnum } from '@/enums';

export type HistoryFilterStatus =
  (typeof HistoryFilter)[keyof typeof HistoryFilter];
export type HistoryFilterKeys = keyof typeof HistoryFilter;

export type GetTransactionParams = {
  limit: number;
  page: number;
  status: HistoryFilterStatus;
  action: HistoryActionsEnum | string;
};

export type TransactionDataType = {
  code: string | undefined | null;
  type: string;
  to_bank_code: string | undefined | null;
  bank_trancode: string | undefined | null;
  action: string;
  id: number | string;
  created_time: string;
  amount: number | string;
  amount_txt: number;
  method: string;
  method_txt: string;
  last_updated_time: string;
  status: string;
  title: string;
  live_check?: string | undefined;
  card_provider?: string | undefined;
  card_serial?: string | undefined;
};
