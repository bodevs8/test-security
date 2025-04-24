import type { HotMatchType } from '@/types/game';
import type { ApiResponse } from '@/types/service';
import { CACHE_DURATION } from '@/constant/app';
import { ApiEndpointEnum } from '@/enums';
import { get } from '@/services';

export const getHotMatches = async (): Promise<HotMatchType[]> => {
  try {
    const data = await get<ApiResponse<HotMatchType[]>>(
      ApiEndpointEnum.HotMatch,
      {},
      {
        next: { revalidate: CACHE_DURATION },
        cache: 'force-cache',
      },
    );

    return data?.data;
  } catch {
    return [];
  }
};
