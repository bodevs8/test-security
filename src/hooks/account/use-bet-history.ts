'use client';

import type { BetFilterKeys, GetBetHistoryParams } from '@/types/bet-history';
import { DEFAULT_HISTORY_LIMIT, RESPONSE_STATUS } from '@/constant/app';
import { BET_FILTER_STATUS, BET_HISTORY_FILTER } from '@/constant/bet-history';
import { getBetHistory } from '@/services/client';
import { calculateTotalPages } from '@/utils/transaction';
import { useEffect, useMemo, useState, useTransition } from 'react';

export const useBetHistory = (
  initData?: any,
  historyRef?: React.RefObject<HTMLDivElement | null> | null,
) => {
  const [isPending, startTransition] = useTransition();
  const defaultParams = {
    page: 1,
    status: BET_FILTER_STATUS[0]!.value,
    limit: DEFAULT_HISTORY_LIMIT,
  };
  const [betHistoryData, setBetHistoryData] = useState(initData?.data || []);
  const [queryParams, setQueryParam] =
    useState<GetBetHistoryParams>(defaultParams);
  const [totalPages, setTotalPages] = useState(
    calculateTotalPages(initData?.total),
  );
  const [isMounted, setIsMounted] = useState(false);

  const isEmpty = useMemo(
    () => !betHistoryData || betHistoryData.length === 0,
    [betHistoryData],
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (historyRef?.current) {
      const accountContainer = document.querySelector('.account-mobile-layout');
      if (accountContainer) {
        accountContainer.scrollTo({ top: 0, behavior: 'instant' });
      }
      historyRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const getBetHistoryData = async (customParams?: GetBetHistoryParams) => {
    startTransition(async () => {
      const params = customParams ?? queryParams;

      const payload = {
        ...params,
        status: BET_HISTORY_FILTER[params.status as BetFilterKeys] ?? '',
      };
      let response = await getBetHistory(payload);
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }

      scrollToTop();
      if (response.status === RESPONSE_STATUS.OK) {
        setTotalPages(calculateTotalPages(response?.total ?? 0));
        setBetHistoryData(response.data);
      } else {
        setTotalPages(0);
        setBetHistoryData([]);
      }
    });
  };

  useEffect(() => {
    if (isMounted) {
      getBetHistoryData();
    } else {
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams.page, queryParams.status]);

  return {
    betHistoryData,
    isPending,
    queryParams,
    totalPages,
    isEmpty,
    getBetHistoryData,
    setQueryParam,
    defaultParams,
  };
};
