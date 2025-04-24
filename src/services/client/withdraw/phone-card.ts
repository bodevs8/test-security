import type { ApiResponse } from '@/types/service';
import type {
  ResponseWithdrawPhoneCard,
  WithdrawPhoneCardFormRequest,
} from '@/types/withdraw';
import { ApiEndpointEnum } from '@/enums';
import { post } from '@/services/client';

export const phoneCardWithdrawRequest = async (
  params: WithdrawPhoneCardFormRequest,
) => {
  try {
    return await post<ApiResponse<ResponseWithdrawPhoneCard>>(
      ApiEndpointEnum.WithdrawPhoneCard,
      params,
      { cache: 'no-store' },
    );
  } catch (error: any) {
    return {
      status: error.status,
      message: error.message,
    };
  }
};
