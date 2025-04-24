'use client';

import type { ApiResponse } from '@/types/service';
import type { TransactionDataType } from '@/types/transaction';
import { FilterTransaction } from '@/components/FilterTransactionHistory';
import { TransactionStickyHeader } from '@/components/TransactionStickyHeader';
import { useTransaction } from '@/hooks/account';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { TransactionContent } from './elements/TransactionContent';

type Props = {
  data: ApiResponse<TransactionDataType[]>;
};

export const TransactionHistoryMobile = ({ data }: Props) => {
  const t = useTranslations();
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
  const historyRef = useRef<HTMLDivElement>(null);

  const [isSticky, setIsSticky] = useState(false);
  const scrollToTop = () => {
    if (historyRef.current) {
      historyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRefreshHistory = () => {
    setQueryParam(defaultParams);
    getTransactionData(defaultParams);
    scrollToTop();
  };

  const handleChangePage = (page: number) => {
    scrollToTop();
    setQueryParam((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleScroll = () => {
    if (historyRef.current) {
      setIsSticky(historyRef.current.scrollTop > 0);
    }
  };

  return (
    <div
      ref={historyRef}
      className="transaction-history bg-teriary-light-300 w-full h-[calc(100vh-92px-54px)] overflow-y-auto overflow-x-hidden"
      onScroll={handleScroll}
    >
      <TransactionStickyHeader
        onClick={handleRefreshHistory}
        title={t('Pages.Account.transaction_history.refresh.title')}
        isSticky={isSticky}
      />
      <div className={clsx('x-container relative', { 'h-full': isPending })}>
        <TransactionContent
          isPending={isPending}
          transactionData={transactionData}
          totalPages={totalPages}
          queryParams={queryParams}
          handleChangePage={handleChangePage}
        />
      </div>
      <div className="fixed fixed-footer bottom-[54px] left-0 z-3 w-full">
        <FilterTransaction
          isEmpty={isEmpty}
          setQueryParam={setQueryParam}
          getTransactionData={getTransactionData}
          defaultParams={defaultParams}
          queryParams={queryParams}
          isMobile
          className="w-full p-4 h-[76px] bg-primary-light-0"
          filterClassName="grid grid-cols-2 gap-3 w-full"
          filterStatusClassName="!w-[unset]"
          filterActionClassName="!w-[unset]"
        />
      </div>
    </div>
  );
};
