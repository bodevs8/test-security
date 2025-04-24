import type { LotteryResult, LotteryResultParam } from '@/types/app';
import type { LotteryCity } from '@/types/lottery';
import type { ApiLotteryResponse } from '@/types/service';
import { ApiEndpointEnum } from '@/enums';
import { get } from '@/services/client';

export const getResult = async (params: LotteryResultParam) => {
  try {
    const response = await get<ApiLotteryResponse<LotteryResult>>(
      ApiEndpointEnum.LotteryResult,
      params,
    );
    return (
      response.rows || {
        result: {},
      }
    );
  } catch (error) {
    console.error(error);
    return {
      result: {},
    };
  }
};

export const getCity = async (date: string) => {
  try {
    const response = await get<ApiLotteryResponse<LotteryCity[]>>(
      ApiEndpointEnum.LotteryCity,
      {
        date,
      },
    );
    return response.rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};
