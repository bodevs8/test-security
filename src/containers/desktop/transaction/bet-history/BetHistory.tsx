'use client';

import { FilterBetHistory } from '@/components/FilterBetHistory';
import { Loading } from '@/components/Loading';
import { useBetHistory } from '@/hooks/account';
import TableBetHistory from './elements/TableBetHistory';

type Props = {
  data: any;
};

const BetHistoryContainer = ({ data }: Props) => {
  const {
    betHistoryData,
    isPending,
    queryParams,
    totalPages,
    isEmpty,
    getBetHistoryData,
    setQueryParam,
    defaultParams,
  } = useBetHistory(data);

  return (
    <div className="bet-history bg-primary-light-0 w-full p-4 xl:p-6 h-full box-border grid grid-rows-[auto_1fr] rounded-[8px]">
      <div className="w-full">
        <FilterBetHistory
          isEmpty={isEmpty}
          setQueryParam={setQueryParam}
          getBetHistoryData={getBetHistoryData}
          defaultParams={defaultParams}
          queryParams={queryParams}
          className="flex-wrap xspc:flex-nowrap"
        />
      </div>
      <div className="w-full h-full box-border relative xspc:overflow-hidden mt-6">
        {isPending && <Loading />}
        <TableBetHistory
          betHistoryData={betHistoryData}
          setQueryParam={setQueryParam}
          queryParams={queryParams}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export { BetHistoryContainer };
