'use client';

import { FilterTransaction } from '@/components/FilterTransactionHistory';
import { Loading } from '@/components/Loading';
import { useTransaction } from '@/hooks/account';
import TableTransaction from './elements/TableTransaction';

type Props = {
  data: any;
};

export const TransactionHistory = ({ data }: Props) => {
  const {
    transactionData,
    isPending,
    queryParams,
    totalPages,
    isEmpty,
    getTransactionData,
    setQueryParam,
    defaultParams,
  } = useTransaction(data);

  return (
    <div className="bg-primary-light-0 w-full p-4 xl:p-6 h-full box-border grid grid-rows-[auto_1fr] rounded-[8px]">
      <div className="w-full">
        <FilterTransaction
          isEmpty={isEmpty}
          setQueryParam={setQueryParam}
          getTransactionData={getTransactionData}
          defaultParams={defaultParams}
          queryParams={queryParams}
          className="flex-wrap xspc:flex-nowrap"
        />
      </div>
      <div className="w-full h-full box-border relative lg:overflow-hidden mt-6">
        {isPending && <Loading />}
        <TableTransaction
          transactionData={transactionData}
          setQueryParam={setQueryParam}
          queryParams={queryParams}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};
