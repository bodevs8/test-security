'use client';

import type {
  GameLiveStreamData,
  GameLiveStreamDataList,
} from '@/types/socket';
import { SocketContext } from '@/contexts/socket-context';
import { SocketEventEnum } from '@/enums/socket';
import { useUserStore } from '@/hooks/stores';
import { loadNanoPlayer } from '@/utils/helpers';
import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [jackpots, setJackpots] = useState({});
  const [b52Views, setB52Views] = useState<GameLiveStreamData | null>(null);
  const [jackpotGb, setJackpotGb] = useState({});
  const [goViews, setGoViews] = useState<GameLiveStreamData | null>(null);

  const [b52Jackpot, setB52Jackpot] = useState<GameLiveStreamDataList | null>(
    null,
  );
  const [goJackpot, setGoJackpot] = useState<GameLiveStreamDataList | null>(
    null,
  );
  const user = useUserStore((state) => state.user);

  // Main Socket Connection
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
      reconnectionAttempts: 10,
      path: '/api-main/v1/ws',
      transports: ['websocket'],
      withCredentials: true,
      autoConnect: false,
      query: {
        token: user?.token,
      },
    });

    socket.connect();

    socket.on(SocketEventEnum.Error, (error) => {
      console.error('Socket error:', error);
    });

    socket.on(SocketEventEnum.JackpotBroadcast, (payload) => {
      setJackpots(payload);
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Livestream Jackpot Socket
  useEffect(() => {
    loadNanoPlayer();
    const socket = io(process.env.NEXT_PUBLIC_LIVESTREAM_JACKPOT_WS_URL!, {
      reconnectionAttempts: 10,
      path: '/api/v1/ws',
      transports: ['websocket'],
      withCredentials: true,
      autoConnect: false,
    });

    socket.connect();

    socket.on(SocketEventEnum.B52GameLS, (payload) => {
      const data = typeof payload === 'string' ? JSON.parse(payload) : payload;
      if (data?.gameId) {
        setB52Jackpot((prevState) => {
          if (!prevState) return { [data.gameId]: { ...data } };
          return { ...prevState, [data.gameId]: { ...data } };
        });
      }
    });

    socket.on(SocketEventEnum.GoGameLS, (payload) => {
      const data = typeof payload === 'string' ? JSON.parse(payload) : payload;
      if (data?.gameId) {
        setGoJackpot((prevState) => {
          if (!prevState) return { [data.gameId]: { ...data } };
          return { ...prevState, [data.gameId]: { ...data } };
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Live Casino Views Socket
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_VIEW_LIVE_SOCKET_URL!, {
      reconnectionAttempts: 10,
      transports: ['websocket'],
      withCredentials: true,
      autoConnect: false,
    });

    socket.connect();

    socket.on(SocketEventEnum.B52GameLS, (payload) => {
      const data = typeof payload === 'string' ? JSON.parse(payload) : payload;
      setB52Views(data);
    });

    socket.on(SocketEventEnum.GoGameLS, (payload) => {
      const data = typeof payload === 'string' ? JSON.parse(payload) : payload;
      setGoViews(data);
    });

    socket.on(SocketEventEnum.JackpotGB, (payload) => {
      setJackpotGb(payload);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      jackpots,
      b52Views,
      goViews,
      b52Jackpot,
      jackpotGb,
      goJackpot,
      setB52Jackpot,
      setGoJackpot,
    }),
    [jackpots, b52Views, goViews, b52Jackpot, goJackpot, jackpotGb],
  );

  return <SocketContext value={contextValue}>{children}</SocketContext>;
};
