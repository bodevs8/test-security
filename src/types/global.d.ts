declare global {
  type ObPlayer = {
    player?: any;
    isPlaying?: boolean;
    isLoading?: boolean;
    isPaused?: boolean;
    isMuted?: boolean;
    autoplay?: boolean;
  };

  type Window = {
    obPlayers: Record<string, ObPlayer>;
    setUpMilicastMediaMethods: (id: string) => void;
    NanoPlayer: any;
    MillicastPlayer: any;
  };

  type gtag = (
    command: 'event' | 'config' | 'set' | 'js' | 'consent',
    target: string,
    params?: {
      [key: string]: any;
    },
  ) => void;
  type dataLayer = any[];
}

declare function gtag(...args: any[]): void;
