import type { IframeSports } from '@/types/iframe';
import type { ApiResponse } from '@/types/service';
import { CACHE_DURATION } from '@/constant/app';
import { get } from '@/services';
import { cookies, headers } from 'next/headers';

export const getIframeBySlug = async (apiUrl: string) => {
  try {
    const headersList = await headers();
    const cookieStore = await cookies();
    const data = await get<ApiResponse<IframeSports>>(
      apiUrl,
      {},
      {
        next: { revalidate: CACHE_DURATION },
        referrer:
          headersList.get('referer') || process.env.__NEXT_PRIVATE_ORIGIN,
        headers: {
          'user-agent': headersList.get('user-agent')!,
          Cookie: cookieStore.toString(),
        },
      },
    );

    return data?.data.url;
  } catch {
    return [];
  }
};
