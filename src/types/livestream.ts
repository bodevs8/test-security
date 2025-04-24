export type TokenInfo = {
  id: string;
  key: string;
  options?: any;
  command?: string;
  gameId?: string;
};

export type VerifyTokenParams = {
  divId: string;
  groupId: string;
  streamName: string;
  site: string;
  options?: any;
  tokenInfo?: TokenInfo | undefined;
};
