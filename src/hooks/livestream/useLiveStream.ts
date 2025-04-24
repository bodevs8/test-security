import { useState } from 'react';

type VerifyTokenParams = {
  divId: string;
  groupId: string;
  streamName: string;
  site: string;
  options?: Record<string, any>;
};

export function useLiveStream() {
  const MAX_RETRY = 5;
  const [obPlayers, setObPlayers] = useState<{ [key: string]: any }>();
  const liveStreamUrl =
    process.env.NEXT_PUBLIC_LIVE_STREAM_URL ||
    'https://api-csn-s.gameland.today/api/v1/stream/';
  const defaultUrl = process.env.NEXT_PUBLIC_LIVE_STREAM_DEFAULT_URL;
  const defaultWs =
    process.env.NEXT_PUBLIC_LIVE_STREAM_DEFAULT_WS ||
    'wss://bintu-h5live-secure.nanocosmos.de/h5live/authstream';
  const defaultHls =
    process.env.NEXT_PUBLIC_LIVE_STREAM_DEFAULT_HLS ||
    'https://bintu-h5live-secure.nanocosmos.de/h5live/authhttp/playlist.m3u8';

  const defaultServer = {
    websocket: defaultWs,
    hls: defaultHls,
  };

  let countRetry = 0;

  const setupPlayer = (
    config: any,
    divId: string,
    streamName: string,
  ): void => {
    config.source.entries[0].h5live.rtmp.streamname = streamName;
    console.warn('div id', divId);
    console.warn('config', { ...config });
    const player = new (window as any).NanoPlayer(divId);
    player.setup(config).then(
      () => {
        if (!obPlayers) {
          setObPlayers((prev: any) => ({
            ...prev,
            player,
            divId,
            isMuted: true,
            isErrored: null,
            isLoading: null,
            isPlaying: null,
            isPaused: null,
          }));
        }
        if (!config?.playback?.autoplay) {
          setObPlayers((prev: any) => ({
            ...prev,
            isPaused: true,
          }));
        }
      },
      (error: any) => {
        console.error(error);
        setObPlayers(() => ({}));
      },
    );
  };

  const verifyToken = async ({
    divId,
    groupId,
    streamName,
    site,
    options = {},
  }: VerifyTokenParams) => {
    const config = {
      source: {
        entries: [
          {
            h5live: {
              server: defaultServer,
              rtmp: { url: defaultUrl, streamname: '' },
              security: { jwtoken: '' },
            },
          },
        ],
      },
      playback: {
        autoplay: true,
        automute: true,
        muted: true,
        faststart: true,
        latencyControlMode: 'balancedadaptive',
      },
      style: {
        displayMutedAutoplay: false,
        controls: false,
        fullScreenControl: false,
        interactive: true,
      },
      events: {
        onLoading: () => {
          console.warn('livestream', divId, 'loading');
          setObPlayers((prev: any) => ({
            ...prev,
            isLoading: true,
            isPaused: false,
          }));
          console.warn('livestream', divId, obPlayers);
        },
        onReady: () => {
          console.warn('livestream', divId, 'onReady');
          setObPlayers((prev: any) => ({
            ...prev,
            isMuted: true,
            isLoading: false,
          }));
          console.warn('livestream', divId, obPlayers);
        },
        onPlay: () => {
          console.warn('livestream', divId, 'is playing');
          setObPlayers((prev: any) => ({
            ...prev,
            isPlaying: true,
            isLoading: false,
            isPaused: false,
          }));
          console.warn('livestream', divId, obPlayers);
        },
        onMute: () => {
          console.warn('livestream', divId, 'is muted');
          setObPlayers((prev: any) => ({
            ...prev,
            isMuted: true,
          }));
          console.warn('livestream', divId, obPlayers);
        },
        onUnmute: () => {
          console.warn('livestream', divId, 'is unmuted');
          setObPlayers((prev: any) => ({
            ...prev,
            isMuted: false,
          }));
          console.warn('livestream', divId, obPlayers);
        },
        onPause: () => {
          console.warn('livestream', divId, 'is paused');
          setObPlayers((prev: any) => ({
            ...prev,
            isPlaying: false,
            isPaused: true,
            isLoading: false,
          }));
          console.warn('livestream', divId, obPlayers);
        },
        onError: () => {
          if (obPlayers) {
            obPlayers?.player.destroy();
            setObPlayers(() => null);
          }
          retryVerifyToken({ divId, groupId, streamName, site });
        },
        onWebSocketError: () =>
          retryVerifyToken({ divId, groupId, streamName, site }),
      },
      ...options,
    };
    try {
      const result = await fetchStreamData(liveStreamUrl, {
        groupId: groupId || '',
        streamId: streamName || '',
        site: site || '',
      });
      if (result?.data?.token && config.source.entries[0]) {
        config.source.entries[0].h5live.security.jwtoken = result.data.token;
      }

      setupPlayer(config, divId, streamName);
    } catch {
      retryVerifyToken({ divId, groupId, streamName, site });
    }
  };
  async function fetchStreamData(
    url: string,
    payload: Record<string, unknown>,
  ) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  function retryVerifyToken(params: VerifyTokenParams): void {
    if (++countRetry <= MAX_RETRY) {
      verifyToken(params);
    }
  }

  const loadMillicastPlayer = async () => {
    if (typeof window === 'undefined' || (window as any).MillicastPlayer)
      return (window as any).MillicastPlayer;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://cdn.jsdelivr.net/npm/@millicast/sdk@latest/dist/millicast.umd.js';
      script.async = true;
      script.onload = () => resolve((window as any).MillicastPlayer);
      script.onerror = () =>
        reject(new Error('Failed to load Millicast Player.'));
      document.head.appendChild(script);
    });
  };

  const handlePlay = () => {
    console.warn('obPlayers pause play', { ...obPlayers });
    if (!obPlayers) return;
    console.warn('obPlayers pause', obPlayers.player.play);
    obPlayers.isPlaying ? obPlayers.player?.pause() : obPlayers.player?.play();
  };

  const handlePause = () => {
    console.warn('obPlayers mute pause', { ...obPlayers });
    if (!obPlayers) return;
    console.warn('obPlayers[playerId] pause', obPlayers.player.pause);
    obPlayers.isPlaying ? obPlayers.player?.pause() : obPlayers.player?.play();
  };

  const handleMute = () => {
    console.warn('obPlayers mute ahiih', obPlayers);
    if (!obPlayers) return;
    console.warn('obPlayers mute', obPlayers.isMuted);
    obPlayers.isMuted ? obPlayers.player?.unmute() : obPlayers.player?.mute();
  };

  const handleUnmute = () => {
    if (!obPlayers) return;
    obPlayers.isMuted ? obPlayers.player?.unmute() : obPlayers.player?.mute();
  };

  return {
    verifyToken,
    loadMillicastPlayer,
    obPlayers,
    handlePlay,
    handlePause,
    handleMute,
    handleUnmute,
    fetchStreamData,
  };
}
