export type TrackingGameStartedParams = {
  gameId: string;
  gameType: string;
  gameName: string;
};

export type TrackingTimeSpentOnPageParams = {
  pageUrl: string;
  timeSpent: number;
};

export type TrackingButtonClickParams = {
  buttonId?: string;
  buttonName?: string;
};

export type TrackingProfileCompletionParams = {
  hasEmail: boolean;
  hasUserBanks: boolean;
  userId?: string;
};

export type TrackingTransactionParams = {
  amount?: string | number;
  currency: string;
  method: string;
};

export type TrackingPromotionParams = {
  promotionId: string;
  promotionName: string;
};
