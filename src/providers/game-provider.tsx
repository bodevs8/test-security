'use client';
import type { IframeLinkEnum } from '@/enums';
import type { TypeGameItem, UrlResponse } from '@/types/game';
import type { ApiResponseError } from '@/types/service';
import type { PropsWithChildren } from 'react';
import { Loading } from '@/components/Loading';
import { PROTECTED_LINKS } from '@/constant/app';
import { JACKPOT_GAME } from '@/constant/game';
import { IFRAME_SPORTS_GAMES } from '@/constant/iframe';
import { GameContext } from '@/contexts/game-context';
import {
  GameProviderEnum,
  ModalIdEnum,
  QueryKeyEnum,
  ResponseStatusEnum,
} from '@/enums';
import { useModalStore, useUserStore } from '@/hooks/stores';
import { useTrackingGame, useTrackingPage } from '@/hooks/tracking';
import { useToast } from '@/hooks/utils';
import {
  favoriteGameRequest,
  getFrameUrlRequest,
  getGameUrlRequest,
  getIframeBySlug,
  getJackpotGameList,
  unfavoriteGameRequest,
} from '@/services/client';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

type GameProviderProps = {
  isMobile: boolean;
  isSafari: boolean;
};

export const GameProvider = ({
  children,
  isMobile,
  isSafari,
}: PropsWithChildren<GameProviderProps>) => {
  useTrackingPage();
  const t = useTranslations();
  const { error } = useToast();
  const { trackGameStarted } = useTrackingGame();
  const router = useRouter();
  const searchParams = useSearchParams();
  const routeParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  const modalStore = useModalStore((state) => state);
  const { isLoggedIn } = useUserStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  const [jackpotGames, setJackpotGames] = useState<Record<string, number>>({});

  const showGameError = useCallback(
    (message: string) => {
      error(message || t('errors.game_error'));
    },
    [error, t],
  );

  const showMaintainGame = useCallback(() => {
    modalStore.openModal(ModalIdEnum.MaintainGame, true);
  }, [modalStore]);

  const showUsePromotion = useCallback(() => {
    modalStore.openModal(ModalIdEnum.UsePromotion, true);
  }, [modalStore]);

  const showErrorModal = useCallback(
    (message: string) => {
      modalStore.openModal(ModalIdEnum.ErrorApi, true, message);
    },
    [modalStore],
  );

  const getGameUrl = useCallback(
    async (game: TypeGameItem) => {
      if (isLoggedIn) {
        const { data } = await getGameUrlRequest(game);
        if (data.value?.status === ResponseStatusEnum.ShowMessage) {
          showGameError(data?.value?.message);
        } else {
          return { data };
        }
      } else {
        modalStore.openModal(ModalIdEnum.Login, true);
      }
      return { data: { value: null } };
    },
    [isLoggedIn, modalStore, showGameError],
  );

  const getUrlByOs = useCallback(
    (data: UrlResponse) => {
      return isMobile && data?.url_mobile ? data?.url_mobile : data?.url;
    },
    [isMobile],
  );

  const getGameUrlNoAuth = async (queryParams: TypeGameItem) => {
    try {
      const { data } = await getGameUrlRequest(queryParams);
      if (data.value?.status === 'SHOW_MESSAGE') {
        return { data: { value: null } };
      } else {
        return { data };
      }
    } catch {
      return { data: { value: null } };
    }
  };

  const setRollbackUrl = (data: string): string => {
    try {
      const ruFieldNames = ['ru', 'leaveUrl', 'backToLobby'];
      const url = new URL(data);
      const siteUrl = process.env.NEXT_PUBLIC_APP_URL || '';

      ruFieldNames.forEach((name) => {
        if (url.searchParams.has(name)) {
          url.searchParams.set(name, siteUrl);
        }
      });
      if (url.searchParams.get('LoginUrl')) {
        url.searchParams.set('LoginUrl', `${siteUrl}/?openModal=login`);
      }
      if (url.searchParams.get('signupUrl')) {
        url.searchParams.set('signupUrl', `${siteUrl}/?openModal=register`);
      }
      if (url.searchParams.get('homeURL')) {
        url.searchParams.set('homeURL', `${siteUrl}`);
      }
      return url.href;
    } catch {
      return '';
    }
  };

  const openNewTab = (url: string | URL | undefined, newTab: Window | null) => {
    if (!newTab) {
      newTab = window.open('about:blank', '_blank');
    }
    setTimeout(() => {
      if (url) {
        if (newTab) {
          newTab.location.href = url as string;
        }
      } else {
        newTab?.close();
      }
    });
  };

  const handleOpenGameUrl = useCallback(
    (url: string, newTab: Window | null) => {
      if (!url || url.includes('undefined')) {
        newTab?.close();
        showMaintainGame();
        return false;
      }

      if (typeof window !== 'undefined') {
        const newUrl = setRollbackUrl(url);
        openNewTab(newUrl, newTab);
      }
      return true;
    },
    [showMaintainGame],
  );

  const handleOpenGameHtml = useCallback(
    (url: string, newTab: Window | null) => {
      if (!url) {
        newTab?.close();
        showMaintainGame();
        return false;
      }
      if (!newTab) {
        newTab = window.open('about:blank', '_blank');
      }
      setTimeout(() => {
        newTab?.document.open();
        newTab?.document.write(url);
        newTab?.document.close();
      });
      return true;
    },
    [showMaintainGame],
  );

  const openGameNoAuth = useCallback(
    async (game: TypeGameItem) => {
      const newTab = isSafari ? window.open('about:blank', '_blank') : null;
      try {
        const { data } = await getGameUrlNoAuth(game);
        if (data.value?.data) {
          return handleOpenGameUrl(getUrlByOs(data.value?.data), newTab);
        }
      } catch {
        newTab?.close();
      }
      return false;
    },
    [isSafari, getUrlByOs, handleOpenGameUrl],
  );

  const parseUrl = (url: string) => {
    // Remove leading slash if present
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;

    // Split the URL by '?' to separate path and query params
    const [path, queryString] = cleanUrl.split('?');

    // Parse query params into an object
    const params: Record<string, string> = {};
    if (queryString) {
      queryString.split('&').forEach((param) => {
        const [key, value] = param.split('=');
        params[key!] = value!;
      });
    }

    return { path, params };
  };

  const openIframeGame = useCallback(
    async (url: string) => {
      let { path, params } = parseUrl(url);

      if (PROTECTED_LINKS.includes(url as IframeLinkEnum) && !isLoggedIn) {
        modalStore.openModal(ModalIdEnum.Login, true);

        routeParams.set('returnUrl', url);
        router.push(`?${routeParams.toString()}`);
      } else {
        const newTab = isSafari ? window.open('about:blank', '_blank') : null;
        try {
          if (path?.startsWith('/')) {
            path = path.slice(1, path.length);
          }
          let requestUrl: string = IFRAME_SPORTS_GAMES[path!]!;
          if (Object.keys(params).length > 0) {
            requestUrl = `${requestUrl}&${new URLSearchParams(params).toString()}`;
          }
          const iframeData = await getIframeBySlug(requestUrl!);
          trackGameStarted({
            gameId: path!,
            gameType: path!,
            gameName: 'iframe',
          });
          handleOpenGameUrl(iframeData as string, newTab);
        } catch {
          newTab?.close();
        }
      }
    },
    [
      isSafari,
      handleOpenGameUrl,
      modalStore,
      router,
      routeParams,
      isLoggedIn,
      trackGameStarted,
    ],
  );

  const openGame = useCallback(
    async (game: TypeGameItem) => {
      if (!isLoggedIn) {
        modalStore.openModal(ModalIdEnum.Login, true);
        return;
      }
      if (game.maintain) {
        showMaintainGame();
        return;
      }
      if (game.deny_info) {
        showUsePromotion();
        return;
      }

      setIsLoading(true);

      const newTab = isSafari ? window.open('about:blank', '_blank') : null;

      try {
        const { data, message, status } = await getGameUrlRequest(game);
        if (message && status === ResponseStatusEnum.ShowMessage) {
          showErrorModal(message);
          return;
        }
        if (data) {
          trackGameStarted({
            gameId:
              game.id?.toString() || game.partner_game_id?.toString() || '',
            gameType: game.partner_provider || '',
            gameName: game.name || '',
          });
          if (game.partner_provider === GameProviderEnum.PGSoft) {
            return handleOpenGameHtml(getUrlByOs(data), newTab);
          } else {
            return handleOpenGameUrl(getUrlByOs(data), newTab);
          }
        } else {
          newTab?.close();
        }
      } catch (error: any) {
        newTab?.close();
        if (error.message) {
          showGameError(error.message);
        } else {
          showMaintainGame();
        }
      } finally {
        setIsLoading(false);
      }
      return false;
    },
    [
      isSafari,
      getUrlByOs,
      handleOpenGameUrl,
      modalStore,
      showErrorModal,
      showGameError,
      showMaintainGame,
      handleOpenGameHtml,
      isLoggedIn,
      showUsePromotion,
      trackGameStarted,
    ],
  );

  const getFrameUrl = useCallback(async (url: string) => {
    try {
      const { data } = await getFrameUrlRequest(url);
      if (data.value?.status === ResponseStatusEnum.ShowMessage) {
        return { data: { value: null } };
      } else {
        return { data };
      }
    } catch {
      return { data: { value: null } };
    }
  }, []);

  const favoriteGame = useCallback(
    async (game: TypeGameItem) => {
      if (!isLoggedIn) {
        modalStore.openModal(ModalIdEnum.Login, true);
        throw new Error('Error Favorite: Require Login');
      }

      try {
        await favoriteGameRequest(game);
      } catch (error) {
        const apiError = error as ApiResponseError;

        if (apiError.status === ResponseStatusEnum.FailedValidate) {
          modalStore.openModal(ModalIdEnum.ErrorFavoriteGameLimit);
        } else {
          showGameError(apiError.message);
        }
        throw new Error(apiError.message || 'Error Favorite');
      }
    },
    [isLoggedIn, modalStore, showGameError],
  );

  const unfavoriteGame = useCallback(
    async (game: TypeGameItem) => {
      if (!isLoggedIn) {
        modalStore.openModal(ModalIdEnum.Login, true);
        throw new Error('Error Unfavorite: Require Login');
      }

      try {
        await unfavoriteGameRequest(game);
      } catch (error) {
        const apiError = error as ApiResponseError;
        showGameError(apiError.message);
        throw new Error(apiError.message || 'Error Favorite');
      }
    },
    [isLoggedIn, modalStore, showGameError],
  );

  const { data: jackpotData } = useQuery({
    queryKey: [QueryKeyEnum.JackpotGameList],
    queryFn: getJackpotGameList,
  });

  useEffect(() => {
    if (jackpotData) {
      setJackpotGames(jackpotData);
    }
  }, [jackpotData]);

  const jackpotValidGames = useMemo(() => {
    const validGames = JACKPOT_GAME.filter((game) => {
      if (!game.partner_game_id) return false;
      const jackpotValue = jackpotGames[game.partner_game_id];
      return jackpotValue && jackpotValue >= game.jackpot_trigger;
    });

    const mappedGames = validGames.map((game) => ({
      ...game,
      image: `/asset/images/events/jackpot/games/thumbGame/${game.image}.webp`,
      jackpot_value: jackpotGames[game.partner_game_id!] ?? 0,
    }));

    return mappedGames.sort((a, b) => {
      if (a.is_live_stream !== b.is_live_stream) {
        return a.is_live_stream ? -1 : 1;
      }
      if ((a.partner === 'go') !== (b.partner === 'go')) {
        return a.partner === 'go' ? -1 : 1;
      }
      return (b.jackpot_value ?? 0) - (a.jackpot_value ?? 0);
    });
  }, [jackpotGames]);

  const totalJackpot = useMemo(() => {
    return (
      jackpotValidGames?.reduce(
        (acc, item) => acc + (item?.jackpot_value || 0),
        0,
      ) || 0
    );
  }, [jackpotValidGames]);

  const value = useMemo(
    () => ({
      jackpotValidGames,
      setJackpotGames,
      totalJackpot,
      getGameUrl,
      openGame,
      openGameNoAuth,
      getFrameUrl,
      favoriteGame,
      unfavoriteGame,
      openIframeGame,
    }),
    [
      jackpotValidGames,
      setJackpotGames,
      totalJackpot,
      getGameUrl,
      openGame,
      openGameNoAuth,
      getFrameUrl,
      favoriteGame,
      unfavoriteGame,
      openIframeGame,
    ],
  );

  return (
    <GameContext value={value}>
      {children}
      {isLoading && <Loading fixed />}
    </GameContext>
  );
};
