'use client';

import type {
  GetTransactionParams,
  HistoryFilterKeys,
} from '@/types/transaction';
import { RESPONSE_STATUS } from '@/constant/app';
import {
  FILTER_ACTION,
  FILTER_STATUS,
  HistoryFilter,
} from '@/constant/transaction';
import { getTransaction } from '@/services/client';
import { calculateTotalPages } from '@/utils/transaction';
import { useEffect, useMemo, useState, useTransition } from 'react';

export const useTransaction = (
  initData?: any,
  historyRef?: React.RefObject<HTMLDivElement | null> | null,
) => {
  const [isPending, startTransition] = useTransition();
  const defaultParams = {
    page: 1,
    status: FILTER_STATUS[0]!.value,
    action: FILTER_ACTION[0]!.value,
    limit: 10,
  };
  const [transactionData, setTransactionData] = useState(initData?.data || []);
  const [queryParams, setQueryParam] =
    useState<GetTransactionParams>(defaultParams);
  const [totalPages, setTotalPages] = useState(
    calculateTotalPages(initData?.total),
  );
  const [isMounted, setIsMounted] = useState(false);

  const isEmpty = useMemo(
    () => !transactionData || transactionData.length === 0,
    [transactionData],
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

  const getTransactionData = async (customParams?: GetTransactionParams) => {
    startTransition(async () => {
      const params = customParams ?? queryParams;

      const payload = {
        ...params,
        status:
          params.status === FILTER_STATUS[0]?.value
            ? ''
            : (HistoryFilter[params.status as HistoryFilterKeys] ?? ''),
        action: params.action === FILTER_ACTION[0]?.value ? '' : params.action,
      };
      let response = await getTransaction(payload);
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }

      scrollToTop();
      if (response.status === RESPONSE_STATUS.OK) {
        setTotalPages(calculateTotalPages(response?.total ?? 0));
        setTransactionData(response.data);
      } else {
        setTotalPages(0);
        setTransactionData([]);
      }
    });
  };

  useEffect(() => {
    if (isMounted) {
      getTransactionData();
    } else {
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams.status, queryParams.action, queryParams.page]);

  return {
    transactionData,
    isPending,
    queryParams,
    totalPages,
    isEmpty,
    getTransactionData,
    setQueryParam,
    defaultParams,
  };
};
