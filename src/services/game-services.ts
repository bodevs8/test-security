import type {
  BigWins,
  GameProvidersType,
  GamesType,
  RequestParams,
} from '@/types/game';
import type { ApiResponse } from '@/types/service';
import { CACHE_DURATION } from '@/constant/app';
import { DEFAULT_GAME_RESPONSE } from '@/constant/game';
import { ApiEndpointEnum } from '@/enums';
import { get } from '@/services';
import { getUser } from '@/utils/user';
import { cookies } from 'next/headers';

export const getGames = async (params?: RequestParams): Promise<GamesType> => {
  try {
    const data = await get<ApiResponse<GamesType>>(
      ApiEndpointEnum.GameSearch,
      params,
      {
        next: { revalidate: CACHE_DURATION },
      },
    );

    return data?.data || DEFAULT_GAME_RESPONSE;
  } catch {
    return DEFAULT_GAME_RESPONSE;
  }
};

export const getFavoriteGames = async (
  params?: RequestParams,
): Promise<GamesType> => {
  try {
    const user = await getUser();
    const data = await get<ApiResponse<GamesType>>(
      ApiEndpointEnum.FavoriteGameList,
      params,
      {
        next: { revalidate: CACHE_DURATION },
        headers: {
          ...(user ? { Cookie: (await cookies())?.toString() } : {}),
        },
      },
    );
    return data?.data || DEFAULT_GAME_RESPONSE;
  } catch {
    return DEFAULT_GAME_RESPONSE;
  }
};

export const getGameProviders = async (
  params?: RequestParams,
): Promise<GameProvidersType> => {
  try {
    const data = await get<ApiResponse<GameProvidersType>>(
      ApiEndpointEnum.GameProviders,
      params,
      {
        next: { revalidate: CACHE_DURATION },
      },
    );

    return data?.data || {};
  } catch {
    return {};
  }
};

export const getBigWins = async (params?: RequestParams): Promise<BigWins> => {
  try {
    const data = await get<ApiResponse<BigWins>>(
      ApiEndpointEnum.BigWins,
      params,
      { next: { revalidate: CACHE_DURATION } },
    );

    return (
      data?.data || {
        nearWin: [],
        monthWin: [],
        weekWin: [],
      }
    );
  } catch {
    return {
      nearWin: [],
      monthWin: [],
      weekWin: [],
    };
  }
};

export const getCasinoGameList = async (
  params?: RequestParams,
): Promise<GamesType> => {
  try {
    const data = await get<ApiResponse<GamesType>>(
      ApiEndpointEnum.CasinoGameList,
      params,
      {
        next: { revalidate: CACHE_DURATION },
      },
    );

    return data?.data || DEFAULT_GAME_RESPONSE;
  } catch {
    return DEFAULT_GAME_RESPONSE;
  }
};
