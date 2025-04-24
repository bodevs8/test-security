'use client';

import type { BetHistoryDataType } from '@/types/bet-history';
import type { ApiResponse } from '@/types/service';
import { FilterBetHistory } from '@/components/FilterBetHistory';
import { TransactionStickyHeader } from '@/components/TransactionStickyHeader';
import { useBetHistory } from '@/hooks/account';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { BetHistoryContent } from './elements/BetHistoryContent';

type Props = {
  data: ApiResponse<BetHistoryDataType[]>;
};

export const BetHistoryMobile = ({ data }: Props) => {
  const t = useTranslations();
  const historyRef = useRef<HTMLDivElement>(null);
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
  const [isSticky, setIsSticky] = useState(false);

  const scrollToTop = () => {
    if (historyRef.current) {
      historyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRefreshHistory = () => {
    setQueryParam(defaultParams);
    getBetHistoryData(defaultParams);
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
      className="bet-history bg-teriary-light-300 w-full h-[calc(100vh-92px-54px)] overflow-y-auto overflow-x-hidden"
      onScroll={handleScroll}
    >
      <TransactionStickyHeader
        onClick={handleRefreshHistory}
        title={t('Pages.Account.bet_history.refresh.title')}
        isSticky={isSticky}
      />
      <div className={clsx('x-container relative', { 'h-full': isPending })}>
        <BetHistoryContent
          isPending={isPending}
          betHistoryData={betHistoryData}
          totalPages={totalPages}
          queryParams={queryParams}
          handleChangePage={handleChangePage}
        />
      </div>
      <div className="fixed fixed-footer bottom-[54px] left-0 z-3 w-full">
        <FilterBetHistory
          isEmpty={isEmpty}
          setQueryParam={setQueryParam}
          getBetHistoryData={getBetHistoryData}
          defaultParams={defaultParams}
          queryParams={queryParams}
          isMobile
          className="w-full p-4 h-[76px] bg-primary-light-0"
          filterClassName="grid grid-cols-1 gap-3 w-full"
          filterStatusClassName="!w-[unset]"
        />
      </div>
    </div>
  );
};
