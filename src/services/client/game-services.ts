import type {
  GameProvidersType,
  GamesType,
  GameUrlTypeResponse,
  RequestParams,
  TypeGameItem,
} from '@/types/game';
import type { ApiResponse } from '@/types/service';
import { DEFAULT_GAME_RESPONSE } from '@/constant/game';
import {
  ApiEndpointEnum,
  LobbyCategoryEnum,
  LobbyTypeEnum,
  ResponseStatusEnum,
} from '@/enums';
import { get, post } from '@/services/client';

export const getGames = async (params: RequestParams) => {
  try {
    const response = await get<ApiResponse<GamesType>>(
      ApiEndpointEnum.GameSearch,
      params,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }

  return DEFAULT_GAME_RESPONSE;
};

export const getFrameUrlRequest = async (url: string) => {
  try {
    const { data } = await get<ApiResponse<GameUrlTypeResponse>>(url);
    if (data.value?.status === ResponseStatusEnum.ShowMessage) {
      return { data: { value: null } };
    } else {
      return { data };
    }
  } catch {
    return { data: { value: null } };
  }
};

export const favoriteGameRequest = async (game: TypeGameItem) => {
  const payload = {
    gId: game.partner_game_id,
    name: game.name,
    p: game.partner_provider,
  };
  return await post<ApiResponse<GameUrlTypeResponse>>(
    game.category_id === LobbyCategoryEnum.Game
      ? ApiEndpointEnum.FavoriteGame
      : ApiEndpointEnum.FavoriteCasino,
    payload,
  );
};

export const unfavoriteGameRequest = async (game: TypeGameItem) => {
  const payload = {
    gId: game.partner_game_id,
    name: game.name,
    p: game.partner_provider,
  };
  return await post<ApiResponse<GameUrlTypeResponse>>(
    game.category_id === LobbyCategoryEnum.Game
      ? ApiEndpointEnum.UnfavoriteGame
      : ApiEndpointEnum.UnfavoriteCasino,
    payload,
  );
};
export const getGameUrlRequest = async (game: TypeGameItem) => {
  return game.api_url
    ? await get<ApiResponse<GameUrlTypeResponse>>(`/api-main/v1${game.api_url}`)
    : await get<ApiResponse<GameUrlTypeResponse>>(ApiEndpointEnum.GameUrl, {
        partnerProvider: game.partner_provider,
        partnerGameId: game.partner_game_id,
        ...game,
      });
};

export const getCasinoGameList = async (params: RequestParams) => {
  try {
    const response = await get<ApiResponse<GamesType>>(
      ApiEndpointEnum.CasinoGameList,
      {
        ...params,
        lobbyType: LobbyTypeEnum.CASINO,
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return DEFAULT_GAME_RESPONSE;
  }
};

export const getFavoriteGames = async (
  params?: RequestParams,
): Promise<GamesType> => {
  try {
    const data = await get<ApiResponse<GamesType>>(
      ApiEndpointEnum.FavoriteGameList,
      {
        ...params,
        lobbyType: LobbyTypeEnum.ALL,
      },
    );
    return data?.data || DEFAULT_GAME_RESPONSE;
  } catch {
    return DEFAULT_GAME_RESPONSE;
  }
};

export const getJackpotGameList = async (): Promise<{
  [key: string]: number;
}> => {
  try {
    const data = await get<ApiResponse<{ [key: string]: number }>>(
      ApiEndpointEnum.JackpotGameList,
    );

    return data?.data || {};
  } catch {
    return {};
  }
};

export const getGameProviders = async (
  params?: RequestParams,
): Promise<GameProvidersType> => {
  try {
    const data = await get<ApiResponse<GameProvidersType>>(
      ApiEndpointEnum.GameProviders,
      params,
    );

    return data?.data || {};
  } catch {
    return {};
  }
};
