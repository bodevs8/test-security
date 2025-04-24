import type { LoginWithTokenParams, UserData } from '@/types/auth';
import type { ApiResponse } from '@/types/service';
import { ApiEndpointEnum, ResponseStatusEnum } from '@/enums';
import { get } from '@/services';

export const loginWithTokenRequest = async (params: LoginWithTokenParams) => {
  const response = await get<ApiResponse<UserData[]>>(
    ApiEndpointEnum.LoginWithToken,
    params,
  );
  if (response.status === ResponseStatusEnum.Ok) {
    return response.data[0];
  }
  return undefined;
};
