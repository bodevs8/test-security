'use client';

import type { GetBetHistoryParams } from '@/types/bet-history';
import type { ApiResponse } from '@/types/service';
import type { GetTransactionParams } from '@/types/transaction';
import { ApiEndpointEnum } from '@/enums';
import { get } from '@/services/client';

export const getTransaction = async (params: GetTransactionParams) => {
  try {
    const response = await get<ApiResponse<any>>(
      ApiEndpointEnum.TransactionHistory,
      params,
    );
    return response;
  } catch (error: any) {
    return {
      status: error.status,
      message: error.message,
      data: [],
      total: 0,
    };
  }
};

export const getBetHistory = async (params: GetBetHistoryParams) => {
  try {
    return get<ApiResponse<any>>(ApiEndpointEnum.BetHistory, params);
  } catch (error: any) {
    return {
      status: error.status,
      message: error.message,
      data: [],
      total: 0,
    };
  }
};
