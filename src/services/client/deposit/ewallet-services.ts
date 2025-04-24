'use client';

import type { DepositEwalletParamsType } from '@/types/deposit';
import type { ApiResponse } from '@/types/service';
import { ApiEndpointEnum } from '@/enums';
import { get, post } from '@/services/client';

export const depositEwallet = async (params: DepositEwalletParamsType) => {
  try {
    return await post<ApiResponse<any>>(
      ApiEndpointEnum.DepositFlexpay,
      params,
      {
        cache: 'no-store',
      },
    );
  } catch (error: any) {
    return {
      status: error.status,
      message: error.message,
      data: [],
    };
  }
};

export const getEwalletCode = async () => {
  return get<ApiResponse<any>>(ApiEndpointEnum.GetEwalletCode, {
    cache: 'no-store',
  });
};
