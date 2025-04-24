'use client';

import type { DepositCodepayParamsType } from '@/types/deposit';
import type { ApiResponse } from '@/types/service';
import { ApiEndpointEnum } from '@/enums';
import { get, post } from '@/services/client';

export const depositCodepay = async (params: DepositCodepayParamsType) => {
  try {
    return await post<ApiResponse<any>>(
      ApiEndpointEnum.DepositCodepay,
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

export const getDepositCodepayInfo = async () => {
  return get<ApiResponse<any>>(
    ApiEndpointEnum.DepositNicepayInfo,
    {},
    {
      cache: 'no-store',
    },
  );
};
