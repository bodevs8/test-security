import type { BetFilterKeys } from '@/types/bet-history';
import { ResponsiveView } from '@/components/ResponsiveView';
import { DEFAULT_HISTORY_LIMIT } from '@/constant/app';
import { BET_FILTER_STATUS, BET_HISTORY_FILTER } from '@/constant/bet-history';
import { BetHistoryContainer } from '@/containers/desktop/transaction';
import { BetHistoryMobile } from '@/containers/mobile/transaction/bet-history';
import { getBetHistory } from '@/services';
import '@/styles/pages/bet-history/bet-table.scss';
import '@/styles/responsive/pages/account/bet-history/bet-history.scss';

const BetHistory = async () => {
  const data = await getBetHistory({
    page: 1,
    status:
      BET_HISTORY_FILTER[BET_FILTER_STATUS[0]!.value as BetFilterKeys] ?? '',
    limit: DEFAULT_HISTORY_LIMIT,
  });

  return (
    <ResponsiveView
      mobile={<BetHistoryMobile data={data} />}
      desktop={<BetHistoryContainer data={data} />}
    />
  );
};

export default BetHistory;
