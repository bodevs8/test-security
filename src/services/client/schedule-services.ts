import type { ScheduleMatches } from '@/types/schedule';
import type { ApiResponse } from '@/types/service';
import { ApiEndpointEnum } from '@/enums';
import { get } from '@/services/client';

export const getScheduleMatches = async (
  params: Record<string, string | number | boolean | undefined>,
) => {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined),
    );

    const response = await get<ApiResponse<ScheduleMatches[]>>(
      ApiEndpointEnum.ScheduleMatches,
      filteredParams,
    );
    return response.data;
  } catch {
    return [];
  }
};
