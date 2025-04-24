'use client';

import type { ApiResponse } from '@/types/service';
import type { WithdrawBankParamsType } from '@/types/withdraw';
import { ApiEndpointEnum } from '@/enums';
import { post } from '@/services/client';

export const withdrawBank = async (params: WithdrawBankParamsType) => {
  try {
    return await post<ApiResponse<any>>(ApiEndpointEnum.WithdrawBank, params, {
      cache: 'no-store',
    });
  } catch (error: any) {
    return {
      status: error.status,
      message: error.message,
    };
  }
};
