import type { GetBetHistoryParams } from '@/types/bet-history';
import type { ApiResponse } from '@/types/service';
import { ApiEndpointEnum, ResponseStatusEnum } from '@/enums';
import { get } from '@/services';
import { cookies } from 'next/headers';

export const getBetHistory = async (params: GetBetHistoryParams) => {
  const cookieStore = await cookies();
  try {
    const res = await get<ApiResponse<any>>(
      ApiEndpointEnum.BetHistory,
      params,
      {
        cache: 'no-store',
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );
    return res;
  } catch {
    return {
      status: ResponseStatusEnum.Error,
      code: 200,
      data: [],
      message: 'Error',
    };
  }
};
