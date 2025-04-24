import type { StaticImageData } from 'next/image';
import Seven89Club from '@/public/images/home/live-casino/small-thumb/789-club.webp';
import B52 from '@/public/images/home/live-casino/small-thumb/b52.webp';
import Go88 from '@/public/images/home/live-casino/small-thumb/go88.webp';
import Seven89ClubMb from '@/public/images/home/live-casino/small-thumb/mobile/789-club.webp';
import B52Mb from '@/public/images/home/live-casino/small-thumb/mobile/b52.webp';

import Go88Mb from '@/public/images/home/live-casino/small-thumb/mobile/go88.webp';
import RikVipMb from '@/public/images/home/live-casino/small-thumb/mobile/rik-vip.webp';
import SunWinMb from '@/public/images/home/live-casino/small-thumb/mobile/sungame.webp';
import RikVip from '@/public/images/home/live-casino/small-thumb/rik-vip.webp';
import SunWin from '@/public/images/home/live-casino/small-thumb/sungame.webp';

export const LIVE_CASINO_SMALL_THUMB: Record<string, StaticImageData> = {
  SunWin,
  Go88,
  B52,
  RikVip,
  Seven89Club,
};

export const LIVE_CASINO_SMALL_THUMB_MOBILE: Record<string, StaticImageData> = {
  SunWin: SunWinMb,
  Go88: Go88Mb,
  B52: B52Mb,
  RikVip: RikVipMb,
  Seven89Club: Seven89ClubMb,
};
