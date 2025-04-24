import type { ScheduleCompetition, ScheduleMatches } from '@/types/schedule';
import type { ApiResponse } from '@/types/service';
import { ApiEndpointEnum } from '@/enums';
import { get } from '@/services';

export const getScheduleCompetitions = async () => {
  try {
    const response = await get<ApiResponse<ScheduleCompetition[]>>(
      ApiEndpointEnum.ScheduleCompetitions,
      {},
      {
        cache: 'no-store',
      },
    );
    return response.data;
  } catch {
    return [];
  }
};

export const getScheduleMatches = async (
  params: Record<string, string | number | boolean>,
) => {
  try {
    const response = await get<ApiResponse<ScheduleMatches[]>>(
      ApiEndpointEnum.ScheduleMatches,
      params,
      {
        cache: 'no-store',
      },
    );
    return response.data;
  } catch {
    return [];
  }
};
