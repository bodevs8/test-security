import type {
  CryptoDataType,
  CryptoDetailDataType,
  IndexDepositType,
  PhoneCardType,
} from '@/types/deposit';
import type { ApiResponse } from '@/types/service';
import { CACHE_DURATION } from '@/constant/app';
import { ApiEndpointEnum } from '@/enums';
import { get } from '@/services';
import { cookies } from 'next/headers';

export const getDepositIndex = async () => {
  try {
    const cookieStore = await cookies();
    const data = await get<ApiResponse<IndexDepositType>>(
      ApiEndpointEnum.IndexDeposit,
      {},
      {
        cache: 'no-store',
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    return data?.data;
  } catch {
    return null;
  }
};

export const getCryptoList = async () => {
  const cookieStore = await cookies();

  try {
    const data = await get<ApiResponse<CryptoDataType[]>>(
      ApiEndpointEnum.DepositCrypto,
      {},
      {
        cache: 'no-store',
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    return data?.data;
  } catch {
    return [];
  }
};

export const getCryptoByNetwork = async (network: string) => {
  const cookieStore = await cookies();
  try {
    const data = await get<ApiResponse<CryptoDetailDataType[]>>(
      ApiEndpointEnum.DetailDepositCrypto,
      { network },
      {
        next: { revalidate: CACHE_DURATION },
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    return data?.data ?? [];
  } catch {
    return [];
  }
};

export const getPhoneCardList = async () => {
  try {
    const cookieStore = await cookies();
    const data = await get<ApiResponse<PhoneCardType>>(
      ApiEndpointEnum.PhoneCard,
      {},
      {
        cache: 'no-store',
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    return data?.cardlist ?? data.data ?? {};
  } catch {
    return {};
  }
};

export const getDepositTransactionInfo = async (endpoint: ApiEndpointEnum) => {
  try {
    const cookieStore = await cookies();
    const data = await get<ApiResponse<any>>(
      endpoint,
      {},
      {
        cache: 'no-store',
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );
    return data?.data?.[0] ?? null;
  } catch {
    return null;
  }
};
