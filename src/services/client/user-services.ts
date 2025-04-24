import type {
  AccountProfileResponse,
  VipInfoResponse,
} from '@/types/account-info';
import type { UserData, UserPromotionData } from '@/types/auth';
import type { ApiResponse } from '@/types/service';
import type { VerifyUpdateEmailResponse } from '@/types/user';
import type { CreateUserBankParams, UserBankType } from '@/types/userbank';
import { DEFAULT_USER_DATA } from '@/constant/app';
import { ApiEndpointEnum } from '@/enums';
import { get, post } from '@/services/client';

async function fetchData<T>(
  endpoint: ApiEndpointEnum,
): Promise<{ data: T | null }> {
  try {
    const response = await get<ApiResponse<T>>(
      endpoint,
      {},
      {
        cache: 'no-store',
      },
    );
    return {
      data: response?.data || null,
    };
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return {
      data: null,
    };
  }
}

export const createUserBank = async (params: CreateUserBankParams) => {
  return post<ApiResponse<void>>(ApiEndpointEnum.CreateUserBank, params);
};

export const clearCookies = async () => {
  return post<ApiResponse<void>>(ApiEndpointEnum.ClearCookies, {});
};

export const getUserBank = async () => {
  try {
    const response = await get<ApiResponse<UserBankType[]>>(
      ApiEndpointEnum.UserBank,
      {},
      { cache: 'no-store' },
    );
    return response.data;
  } catch {
    return [];
  }
};

export const getVipInfo = () =>
  fetchData<VipInfoResponse[]>(ApiEndpointEnum.VipInfo);

export const getAccountProfile = () =>
  fetchData<AccountProfileResponse>(ApiEndpointEnum.VipProfile);

export const getReferralCode = () =>
  fetchData<string>(ApiEndpointEnum.ReferralCode);

export const getReferralFriends = () =>
  fetchData<string[]>(ApiEndpointEnum.ReferralFriends);

export const refreshUserInfo = async (): Promise<UserData> => {
  try {
    const res = await get<ApiResponse<UserData>>(
      ApiEndpointEnum.RefreshUserInfo,
      {},
      {
        cache: 'no-store',
      },
    );
    return res?.user ?? DEFAULT_USER_DATA;
  } catch (error) {
    console.error(error);
    return DEFAULT_USER_DATA;
  }
};

export const getUserInfo = async (): Promise<UserPromotionData> => {
  try {
    const res = await get<ApiResponse<UserPromotionData>>(
      ApiEndpointEnum.GetInfo,
    );
    return res?.data;
  } catch (error) {
    console.error(error);
    return {
      created_time: '',
      deposit_amount: 0,
      description: '',
      end_time: '',
      multiplier: 0,
      name: '',
      package_id: 0,
      turnover: 0,
      type: '',
      promotion_amount: 0,
      rolling: 0,
    };
  }
};

export const getBetToday = async (): Promise<number> => {
  try {
    const res = await get<ApiResponse<any>>(ApiEndpointEnum.GetBet, {
      type: 'TODAY',
    });
    return res?.data?.stake || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const getTodayCommission = async (): Promise<number> => {
  try {
    const res = await get<ApiResponse<any>>(ApiEndpointEnum.GetCommission, {
      type: 'TODAY',
    });
    return res?.data?.total || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const getTotalCommission = async (): Promise<number> => {
  try {
    const res = await get<ApiResponse<any>>(ApiEndpointEnum.GetCommission, {
      type: 'ALL',
    });
    return res?.data?.total || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const updateUserInfo = async (params: { fullname: string }) => {
  return post<ApiResponse<void>>(ApiEndpointEnum.UpdateUserInfo, params);
};

export const verifyUpdateEmail = async () => {
  return post<ApiResponse<VerifyUpdateEmailResponse>>(
    ApiEndpointEnum.VerifyUpdateEmail,
    {},
  );
};

export const getOtpUser = async (params: { email: string }) => {
  return get<ApiResponse<any>>(ApiEndpointEnum.GetOtpUser, params);
};

export const emailOTPVerification = async (params: { code: string }) => {
  return post<ApiResponse<any>>(ApiEndpointEnum.EmailOTPVerification, params);
};

export const telegramOTPVerification = async (params: { otp: string }) => {
  return post<ApiResponse<any>>(
    ApiEndpointEnum.TelegramOTPVerification,
    params,
  );
};
