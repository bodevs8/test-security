import type { HistoryFilterKeys } from '@/types/transaction';
import { ResponsiveView } from '@/components/ResponsiveView';
import { DEFAULT_HISTORY_LIMIT } from '@/constant/app';
import {
  ALL_VALUE,
  FILTER_ACTION,
  FILTER_STATUS,
  HistoryFilter,
} from '@/constant/transaction';
import { TransactionHistory } from '@/containers/desktop/transaction';
import { TransactionHistoryMobile } from '@/containers/mobile/transaction';
import { getTransaction } from '@/services';
import '@/styles/pages/transaction-history/transaction-table.scss';

const Transaction = async () => {
  const data = await getTransaction({
    page: 1,
    status: HistoryFilter[FILTER_STATUS[0]!.value as HistoryFilterKeys],
    action:
      FILTER_ACTION[0]!.value === ALL_VALUE ? '' : FILTER_ACTION[0]!.value,
    limit: DEFAULT_HISTORY_LIMIT,
  });

  return (
    <ResponsiveView
      mobile={<TransactionHistoryMobile data={data} />}
      desktop={<TransactionHistory data={data} />}
    />
  );
};

export default Transaction;
