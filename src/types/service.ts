import type { ResponseStatusEnum } from '@/enums';

export type ApiResponse<T> = {
  status: ResponseStatusEnum;
  code: number;
  data: T;
  message: string;
  total?: number;
  cardlist?: T;
  user?: T;
};

export type ApiLotteryResponse<T> = {
  attrs: any[];
  rows: T;
  success: boolean;
};

export type ApiResponseError = {
  status: string;
  code: number;
  message: string;
};

export type ApiNewsResponse<T> = {
  posts: T;
  total?: number;
  status: ResponseStatusEnum;
  code: number;
  message: string;
  data?: T;
};
