import type { IframeSports } from '@/types/iframe';
import type { ApiResponse } from '@/types/service';
import { CACHE_DURATION } from '@/constant/app';
import { get } from '@/services/client';

export const getIframeBySlug = async (apiUrl: string) => {
  try {
    const data = await get<ApiResponse<IframeSports>>(
      apiUrl,
      {},
      {
        next: { revalidate: CACHE_DURATION },
        referrer: window.location.href,
      },
    );

    return data?.data.url;
  } catch {
    return [];
  }
};
