import type { ApiResponse } from '@/types/service';
import type { UserBankType } from '@/types/userbank';
import { ApiEndpointEnum } from '@/enums';
import { get } from '@/services';
import { cookies } from 'next/headers';

export const getUserBank = async () => {
  try {
    const cookieStore = await cookies();
    const response = await get<ApiResponse<UserBankType[]>>(
      ApiEndpointEnum.UserBank,
      {},
      {
        cache: 'no-store',
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
