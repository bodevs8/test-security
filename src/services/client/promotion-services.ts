'use client';

import type { ApiResponse } from '@/types/service';
import { CACHE_DURATION } from '@/constant/app';
import { ApiEndpointEnum } from '@/enums';
import { post } from '@/services/client';

export const cancelPromotion = async () => {
  return post<ApiResponse<any>>(
    ApiEndpointEnum.CancelPromotion,
    {},
    {
      next: { revalidate: CACHE_DURATION },
    },
  );
};
