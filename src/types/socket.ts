export type JackpotGbData = {
  [key: string]: {
    [key: string]: {
      configValue: number;
      currentValue: number;
      id: string | number;
      name: string;
      on: boolean
    };
  };
};


export type JackpotData = {
  [key: string]: number;
};

export type GameLiveStreamData = {
  mapGameId: string;
  activeUsers: number;
  betting: Array<{ value: number }>;
  history: Array<{ sessionId: string }>;
};

export type GameLiveStreamDataList = {
  [key: string]: GameLiveStreamData;
};

export type NotificationItem = {
  type: string;
  // Add other notification fields
};

type SetGameLiveStreamData = React.Dispatch<React.SetStateAction<any>>;

export type SocketContextType = {
  jackpots: JackpotData;
  b52Views: GameLiveStreamData | null;
  goViews: GameLiveStreamData | null;
  b52Jackpot: GameLiveStreamDataList | null;
  goJackpot: GameLiveStreamDataList | null;
  jackpotGb: JackpotGbData;
  setB52Jackpot: SetGameLiveStreamData;
  setGoJackpot: SetGameLiveStreamData;
};
