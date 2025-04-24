'use client';

import type { ApiResponse } from '@/types/service';
import type {
  WithdrawCryptoParams,
  WithdrawCryptoType,
} from '@/types/withdraw';
import { ApiEndpointEnum } from '@/enums';
import { get, post } from '@/services/client';

export const submitWithdrawCrypto = async (data: WithdrawCryptoParams) => {
  try {
    const response = await post<ApiResponse<any>>(
      ApiEndpointEnum.WithdrawCrypto,
      data,
    );
    return response;
  } catch (error: any) {
    return {
      status: error.status,
      message: error.message,
    };
  }
};

export const getCryptoList = async () => {
  try {
    const response = await get<ApiResponse<WithdrawCryptoType[]>>(
      ApiEndpointEnum.WithdrawCryptoList,
    );
    return response.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
