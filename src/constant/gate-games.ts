import type { GateGamesMenuItem } from '@/types/menu';
import { RouterPathEnum } from '@/enums';
import EventIcon from '@/public/images/header/event.webp';
import GateGamesPromotionIcon from '@/public/images/header/promotion.webp';
import GateGamesVipClubIcon from '@/public/images/header/vip.webp';

export const GATE_GAMES_PLAYER_REWARDS: GateGamesMenuItem[] = [
  {
    href: RouterPathEnum.VipClub,
    icon: GateGamesVipClubIcon,
    alt: 'Vip Club',
    label: 'Common.menu.vip_club',
  },
  {
    href: RouterPathEnum.Promotions,
    icon: GateGamesPromotionIcon,
    alt: 'Promotions',
    label: 'Common.menu.promotion',
  },
  {
    href: RouterPathEnum.Event,
    icon: EventIcon,
    alt: 'Event',
    label: 'Common.menu.event',
  },
];
