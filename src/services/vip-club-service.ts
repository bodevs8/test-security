import type {
  AccountProfileResponse,
  VipInfoResponse,
} from '@/types/account-info';
import type { ApiResponse } from '@/types/service';
import { CACHE_DURATION } from '@/constant/app';
import { ApiEndpointEnum } from '@/enums';
import { get } from '@/services';
import { cookies } from 'next/headers';

export const getVipInfo = async () => {
  try {
    const cookieStore = await cookies();
    const response = await get<ApiResponse<VipInfoResponse[]>>(
      ApiEndpointEnum.VipInfo,
      {},
      {
        next: { revalidate: CACHE_DURATION },
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );
    return response.data;
  } catch {
    return [];
  }
};

export const getAccountProfile = async () => {
  try {
    const cookieStore = await cookies();
    const response = await get<ApiResponse<AccountProfileResponse>>(
      ApiEndpointEnum.VipProfile,
      {},
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { revalidate: 0 },
      },
    );
    return response.data;
  } catch {
    return null;
  }
};
