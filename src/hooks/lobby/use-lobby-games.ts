import type { OptionType } from '@/types/app';
import type {
  CasinoCategory,
  GameProviderOption,
  LobbyCategory,
  LobbyInitialData,
  RequestParams,
  TypeGameItem,
} from '@/types/game';
import { DEFAULT_PAGINATE } from '@/constant/app';
import { CASINO_KEY } from '@/constant/game';
import { LOBBY_GAME_LIST_LIMIT } from '@/constant/lobby';
import { LobbyTypeEnum } from '@/enums';

import { useDevice } from '@/hooks/utils';
import {
  getCasinoGameList,
  getFavoriteGames,
  getGameProviders,
  getGames,
} from '@/services/client';
import {
  providerIconMapping,
  providerImageMapping,
  providerNameMapping,
} from '@/utils/game';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';

export const useLobbyGames = (
  isCasino: boolean,
  currentCategory: LobbyCategory | CasinoCategory,
  initData: LobbyInitialData,
) => {
  const [isPending, startTransition] = useTransition();
  const { isMobile } = useDevice();

  const [gameList, setGameList] = useState<TypeGameItem[]>(
    initData.gameList?.items || [],
  );

  const [totalPage, setTotalPage] = useState(initData.gameList?.totalPage || 0);

  const defaultParams = useMemo(
    () => ({
      page: DEFAULT_PAGINATE.currentPage,
      limit: LOBBY_GAME_LIST_LIMIT,
      type: currentCategory?.type || '',
      partner: '',
      sort: '',
      filter: '',
      keyword: '',
    }),
    [currentCategory?.type],
  );

  const [requestParams, setRequestParams] = useState<
    RequestParams
  >(initData.params || defaultParams);

  const [gameProvidersOptions, setGameProvidersOptions] = useState<
    OptionType[]
  >([]);

  const mapProviderToOption = (providerKey: string) => {
    const providerImage = providerImageMapping(providerKey);
    return {
      value: providerKey,
      label: providerNameMapping(providerKey),
      icon: `icon-provider-${providerIconMapping(providerKey)}`,
      ...(providerImage
        ? {
          iconImage: providerImage?.default,
          iconActiveImage: providerImage?.active,
        }
        : {}),
    };
  };

  const createProviderOptions = useCallback(
    (providers: GameProviderOption[]) => {
      if (providers.length === 0) {
        return [];
      }
      return providers?.map(el => mapProviderToOption(el.key)) || [];
    },
    [],
  );

  const handleSearchGame = useCallback(
    (params: RequestParams = requestParams) => {
      const lobbyFilterElement = document.querySelector(
        '.lobby-filter',
      ) as HTMLElement;
      if (lobbyFilterElement) {
        window.scrollTo({
          top: isMobile
            ? lobbyFilterElement.offsetTop - 280
            : lobbyFilterElement.offsetTop - 250,
          behavior: 'smooth',
        });
      }

      setRequestParams(params);
    },
    [requestParams, isMobile],
  );

  // Handler for favorite games

  const handleCreateFavoriteProviderOptions = useCallback(async (items: TypeGameItem[]) => {
    const providersResponse = await getGameProviders({});
    if (!providersResponse?.favorite || providersResponse?.favorite?.length < 2) {
      const uniqueProviders = new Set<string>();
      const options = items
        .map(item => item.partner_provider)
        .filter((provider): provider is string => {
          if (provider && !uniqueProviders.has(provider)) {
            uniqueProviders.add(provider);
            return true;
          }
          return false;
        })
        .map(mapProviderToOption)
      setGameProvidersOptions(options || []);
    }
  }, []);

  const handleGetGameFavorite = useCallback(
    async (params: RequestParams, init = false) => {
      if (isPending) {
        return;
      }
      try {
        startTransition(async () => {
          if (!init) {
            handleSearchGame(params);
          }
          const response = await getFavoriteGames(params);
          const { items, totalPage } = response;
          if (!params.partner && !params.keyword) {
            handleCreateFavoriteProviderOptions(items);
          }
          setTotalPage(totalPage || 0);
          setGameList(items || []);
        });
      } catch (error) {
        setGameList([]);
        console.error('Error fetching favorite games:', error);
      }
    },
    [handleCreateFavoriteProviderOptions, handleSearchGame],
  );

  // Handler for casino games
  const handleGetGameCasino = useCallback(
    async (params: RequestParams, init = false) => {
      if (isPending) {
        return;
      }
      try {
        startTransition(async () => {
          if (!init) {
            handleSearchGame(params);
          }
          const casinoParams = {
            ...params,
            lobbyType: LobbyTypeEnum.CASINO,
          };
          const response = await getCasinoGameList(casinoParams);
          const { items, totalPage } = response;

          setTotalPage(totalPage || 0);
          setGameList(items || []);
        });
      } catch (error) {
        console.error('Error fetching casino games:', error);
      }
    },
    [handleSearchGame, isPending],
  );

  // Handler for regular games
  const handleGetGameRegular = useCallback(
    async (params: RequestParams, init = false) => {
      if (isPending) {
        return;
      }
      try {
        startTransition(async () => {
          if (!init) {
            handleSearchGame(params);
          }
          const response = await getGames(params);
          const { items, totalPage } = response;

          setTotalPage(totalPage || 0);
          setGameList(items || []);
        });
      } catch (error) {
        console.error('Error fetching regular games:', error);
      }
    },
    [handleSearchGame, isPending],
  );

  useEffect(() => {
    const key = isCasino ? CASINO_KEY : currentCategory?.partnerKey;
    const providers = initData.gameProviders?.[key || ''];
    if (providers) {
      const options = createProviderOptions(providers);
      setGameProvidersOptions(options);
    }
  }, [initData.gameProviders, currentCategory, createProviderOptions, isCasino]);

  return {
    gameList,
    totalPage,
    isPending,
    requestParams,
    gameProvidersOptions,
    handleGetGameFavorite,
    handleGetGameCasino,
    handleGetGameRegular,
  };
};
