export enum SocketEventEnum {
  // Main Socket Events
  Error = 'error',
  JackpotBroadcast = 'jackpotbroadcast',
  JackpotGB = 'jackpotGB',
  Notification = 'notification',
  Connect = 'connect',
  ConnectError = 'connect_error',
  Disconnect = 'disconnect',

  // Live Casino Events
  B52GameLS = 'b52-gamels',
  GoGameLS = 'go-gamels',
}
