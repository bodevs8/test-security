'use client';

import type { CryptoDetailDataType, IndexDepositType } from '@/types/deposit';
import type { ApiResponse } from '@/types/service';
import { CACHE_DURATION } from '@/constant/app';
import { ApiEndpointEnum } from '@/enums';
import { get } from '@/services/client';

export const getDepositTransactionInfo = async (
  endpoint: ApiEndpointEnum | string,
) => {
  return get<ApiResponse<any>>(
    endpoint,
    {},
    {
      cache: 'no-store',
    },
  );
};

export const getCryptoByNetwork = async (network: string) => {
  return get<ApiResponse<CryptoDetailDataType[]>>(
    `${ApiEndpointEnum.DetailDepositCrypto}?network=${network}`,
    {
      next: { revalidate: CACHE_DURATION },
    },
  );
};

export const getTransactionData = async () => {
  const response = await get<ApiResponse<IndexDepositType>>(
    ApiEndpointEnum.IndexDeposit,
    {},
    { cache: 'no-store' },
  );
  return response.data;
};
