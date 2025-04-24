import type { LiveStreamTokenType } from '@/types/game';
import { LiveStreamEnum } from '@/enums/game';

export const MAX_RETRY = 3;
export const LIVE_STREAM_KEY = Array.from(Object.values(LiveStreamEnum));
export const MILLI_CAST_PLAYERS = [
  'homepage_sungame_G1S_311',
  'sungame_G1S_311',
  'casino_sungame_G1S_311',
];
export const GAMES_DATA_CASINO: Record<
  LiveStreamEnum,
  LiveStreamTokenType | undefined
> = {
  [LiveStreamEnum.RikVgmn108]: {
    id: '41b93f00-3f85-4008-86e2-8e297e6799aa',
    key: 'XpjSI-uWCBa',
  },
  [LiveStreamEnum.RikVgmn109]: {
    id: '867f07d4-2a67-4aa0-9c9a-306489ac3ca5',
    key: 'XpjSI-Xl7Hj',
  },
  [LiveStreamEnum.RikVgmn110]: {
    id: 'dbfca645-f428-4157-858d-a52a7fd026e3',
    key: 'XpjSI-PkUx8',
  },
  [LiveStreamEnum.RikVgmn111]: {
    id: 'da3844de-812d-446d-b1e9-158eb10819c4',
    key: 'XpjSI-t7no7',
  },
  [LiveStreamEnum.GoQsTxgo101]: {
    id: '360d8af8-5d64-43df-9bd9-fa91ad6f9c60',
    key: 'XpjSI-X3Chu',
  },
  [LiveStreamEnum.GoVgmn109]: {
    id: '9291199a-50c5-434b-9e97-5aeb670927d1',
    key: 'XpjSI-MsM1Y',
  },
  [LiveStreamEnum.B52Vgmn108]: {
    id: 'f61fbb0a-2595-450e-ae70-19b04bdc5710',
    key: 'XpjSI-5emz7',
  },
  [LiveStreamEnum.B52Vgmn109]: {
    id: 'ff9599e8-8cc4-40a2-ae0a-6f6c43984ccc',
    key: 'XpjSI-vlkTG',
  },
  [LiveStreamEnum.B52Vgmn110]: {
    id: '946b8871-2b8d-4dfd-9fe7-4ffd835fe98a',
    key: 'XpjSI-h2HI7',
  },
  [LiveStreamEnum.Game789G1X305]: {
    id: 'f23545d4-bbb0-416f-bbb7-972619813f2c',
    key: '7MhcV-weX7L',
  },
  [LiveStreamEnum.Game789G1X306]: {
    id: 'fd2186c3-26f3-40ac-9864-4287052b0ec3',
    key: '7MhcV-fwQ2N',
  },
  [LiveStreamEnum.SungameG1S305]: {
    id: '7652d5a1-11fd-4f52-bb74-933631fd78df',
    key: '7MhcV-Pi0uG',
  },
  [LiveStreamEnum.SungameG1S306]: {
    id: 'c88ff431-0ee8-4faf-b375-1b515b20ae68',
    key: '7MhcV-ZvYvo',
  },
  [LiveStreamEnum.SungameG1S311]: {
    id: 'G4BpH3',
    key: 'Da1Lws1aVDn3nsWStream2-1',
  },
  [LiveStreamEnum.Vgmn108]: undefined,
  [LiveStreamEnum.Vgmn109]: undefined,
  [LiveStreamEnum.Vgmn110]: undefined,
  [LiveStreamEnum.Vgmn111]: undefined,
  [LiveStreamEnum.QsTxgo101]: undefined,
  [LiveStreamEnum.QsXocdia102]: undefined,
  [LiveStreamEnum.G1X305]: undefined,
  [LiveStreamEnum.G1X306]: undefined,
  [LiveStreamEnum.G1S305]: undefined,
  [LiveStreamEnum.G1S306]: undefined,
  [LiveStreamEnum.G1S311]: undefined,
};
