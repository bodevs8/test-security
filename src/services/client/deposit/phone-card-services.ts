import type { DepositPhoneCardFormValues } from '@/types/deposit';
import type { ApiResponse } from '@/types/service';
import { ApiEndpointEnum } from '@/enums';
import { post } from '../api-client-service';

export const phoneCardDepositRequest = async (
  params: DepositPhoneCardFormValues,
) => {
  try {
    return await post<ApiResponse<any>>(
      ApiEndpointEnum.DepositPhoneCard,
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
