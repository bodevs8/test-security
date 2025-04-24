import type { ApiResponse } from '@/types/service';
import type { WithdrawCryptoType } from '@/types/withdraw';
import { ApiEndpointEnum } from '@/enums';
import { get } from '@/services';
import { cookies } from 'next/headers';

export const getWithdrawCryptoList = async () => {
  try {
    const cookieStore = await cookies();
    const response = await get<ApiResponse<WithdrawCryptoType[]>>(
      ApiEndpointEnum.WithdrawCryptoList,
      {},
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
