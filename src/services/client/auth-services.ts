'use client';
import type {
  ChangePasswordParams,
  ForgotPasswordByEmailParams,
  ForgotPasswordByTelegramParams,
  LoginParams,
  LoginWithTokenParams,
  RegisterParams,
  ResetPasswordByOtpParams,
  ResetPasswordByTokenParams,
  UserData,
} from '@/types/auth';
import type { ApiResponse } from '@/types/service';
import { ApiEndpointEnum, ResponseStatusEnum } from '@/enums';
import { get, post } from '@/services/client';

export const loginRequest = async (params: LoginParams) => {
  try {
    const response = await post<ApiResponse<UserData[]>>(
      ApiEndpointEnum.Login,
      params,
    );
    return response;
  } catch (error: any) {
    return {
      status: error.status,
      message: error.message,
      data: [] as UserData[],
    };
  }
};

export const registerRequest = async (params: RegisterParams) => {
  try {
    const response = await post<ApiResponse<UserData[]>>(
      ApiEndpointEnum.Register,
      params,
    );
    return response;
  } catch (error: any) {
    return {
      status: error.status,
      message: error.message,
      data: [] as UserData[],
    };
  }
};

export const logoutRequest = async () => {
  try {
    const response = await post<ApiResponse<void>>(ApiEndpointEnum.Logout, {});
    return response;
  } catch (error: any) {
    return {
      status: error.status,
      message: error.message,
    };
  }
};

export const forgotPasswordByEmailRequest = async (
  params: ForgotPasswordByEmailParams,
) => {
  return post<ApiResponse<void>>(ApiEndpointEnum.SendMailResetPassword, params);
};

export const forgotPasswordByTelegramRequest = async (
  params: ForgotPasswordByTelegramParams,
) => {
  return get<ApiResponse<void>>(ApiEndpointEnum.SendTeleResetPassword, params);
};

export const resetPasswordByTokenRequest = async (
  params: ResetPasswordByTokenParams,
) => {
  return post<ApiResponse<void>>(ApiEndpointEnum.ResetPasswordByToken, params);
};

export const resetPasswordByOtpRequest = async (
  params: ResetPasswordByOtpParams,
) => {
  return post<ApiResponse<void>>(ApiEndpointEnum.ResetPasswordByOtp, params);
};

export const changePasswordRequest = async (params: ChangePasswordParams) => {
  try {
    const response = await post<ApiResponse<void>>(
      ApiEndpointEnum.ChangePassword,
      params,
    );
    return response;
  } catch (error: any) {
    return {
      status: error.status,
      message: error.message,
    };
  }
};

export const loginWithTokenRequest = async (params: LoginWithTokenParams) => {
  const response = await get<ApiResponse<UserData>>(
    ApiEndpointEnum.LoginWithTokenInternal,
    params,
  );
  if (response.status === ResponseStatusEnum.Ok) {
    return response.data;
  }
  return undefined;
};

export const setCookieRequest = async (params: any) => {
  return post<ApiResponse<void>>(ApiEndpointEnum.SetCookie, params);
};
