'use client';

import type { DepositFlexpayParamsType } from '@/types/deposit';
import type { ApiResponse } from '@/types/service';
import { ApiEndpointEnum } from '@/enums';
import { post } from '@/services/client';

export const depositFlexpay = async (params: DepositFlexpayParamsType) => {
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
