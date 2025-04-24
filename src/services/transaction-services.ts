import type { ApiResponse } from '@/types/service';
import type {
  GetTransactionParams,
  TransactionDataType,
} from '@/types/transaction';
import { ApiEndpointEnum, ResponseStatusEnum } from '@/enums';
import { get } from '@/services';
import { cookies } from 'next/headers';

export const getTransaction = async (
  params: GetTransactionParams,
): Promise<ApiResponse<TransactionDataType[]>> => {
  try {
    const cookieStore = await cookies();
    const res = await get<ApiResponse<TransactionDataType[]>>(
      ApiEndpointEnum.TransactionHistory,
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
