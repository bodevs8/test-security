import type { BreadcrumbItemType, PromotionPackageType } from '@/types/promotion';
import {
  PromotionPackageEnum,
  PromotionSlugEnum,
  PromotionTagEnum,
  RouterPathEnum,
} from '@/enums';
import { VipPrivilegeEnum } from '@/enums/vip';

export const PROMOTION_BREADCRUMB_ITEMS: BreadcrumbItemType[] = [
  {
    label: '',
    labelKey: 'Pages.Promotion.breadcrumb.home',
    href: RouterPathEnum.Home
  },
  {
    label: '',
    labelKey: 'Pages.Promotion.breadcrumb.promotion',
    href: RouterPathEnum.Promotions,
  },
];

export const TAG_CLASSES: Record<PromotionTagEnum, string> = {
  [PromotionTagEnum.Applying]: '!bg-red-500 text-white',
  [PromotionTagEnum.Available]: '!bg-label-new !text-dark-700',
  [PromotionTagEnum.NotAvailable]: '!bg-label-disabled !text-dark-700',
}

export const PROMOTION_PACKAGE: PromotionPackageType[] = [
  {
    id: PromotionPackageEnum.Welcome,
    name: 'Welcome',
    titleKey: 'Pages.Promotion.packages.welcome',
    titleMbKey: 'Pages.Promotion.packages.welcome_mb',
    img: '/images/promotion/packages/welcome.webp',
    imgMb: '/images/promotion/packages/welcome-mb.webp',
    upto: 'Lên đến 20,000,000 VND',
    slug: PromotionSlugEnum.WelcomeBonus,
  },
  {
    id: PromotionPackageEnum.Cashback,
    name: 'Cashback sport',
    titleKey: 'Pages.Promotion.packages.cashback_sport',
    titleMbKey: 'Pages.Promotion.packages.cashback_sport_mb',
    img: '/images/promotion/packages/sports.webp',
    imgMb: '/images/promotion/packages/sports-mb.webp',
    upto: 'Lên đến 1.4%',
    slug: PromotionSlugEnum.CashbackSportBonus,
  },
  {
    id: PromotionPackageEnum.Cashback,
    name: 'Cashback esports',
    titleKey: 'Pages.Promotion.packages.cashback_esports',
    titleMbKey: 'Pages.Promotion.packages.cashback_esports_mb',
    img: '/images/promotion/packages/esports.webp',
    imgMb: '/images/promotion/packages/esports-mb.webp',
    upto: 'Lên đến 1.4%',
    slug: PromotionSlugEnum.CashbackSportBonusVirtual,
  },
  {
    id: PromotionPackageEnum.Cashback,
    name: 'Cashback slots',
    titleKey: 'Pages.Promotion.packages.cashback_slots',
    titleMbKey: 'Pages.Promotion.packages.cashback_slots_mb',
    img: '/images/promotion/packages/slot.webp',
    imgMb: '/images/promotion/packages/slot-mb.webp',
    upto: 'Lên đến 0.95%',
    slug: PromotionSlugEnum.CashbackSlotsBonus,
  },
  {
    id: PromotionPackageEnum.Cashback,
    name: 'Cashback number games',
    titleKey: 'Pages.Promotion.packages.cashback_number_games',
    titleMbKey: 'Pages.Promotion.packages.cashback_number_games_mb',
    img: '/images/promotion/packages/number.webp',
    imgMb: '/images/promotion/packages/number-mb.webp',
    upto: 'Lên đến 0.95%',
    slug: PromotionSlugEnum.CashbackNumberGamesBonus,
  },
  {
    id: PromotionPackageEnum.Cashback,
    name: 'Cashback Game nhanh',
    titleKey: 'Pages.Promotion.packages.cashback_instant_games',
    titleMbKey: 'Pages.Promotion.packages.cashback_instant_games_mb',
    img: '/images/promotion/packages/instant.webp',
    imgMb: '/images/promotion/packages/instant-mb.webp',
    upto: 'Lên đến 0.95%',
    slug: PromotionSlugEnum.CashbackInstantGamesBonus,
  },
  {
    id: PromotionPackageEnum.Cashback,
    name: 'Cashback keno',
    titleKey: 'Pages.Promotion.packages.cashback_keno',
    titleMbKey: 'Pages.Promotion.packages.cashback_keno_mb',
    img: '/images/promotion/packages/keno.webp',
    imgMb: '/images/promotion/packages/keno-mb.webp',
    upto: 'Lên đến 0.95%',
    slug: PromotionSlugEnum.CashbackKenoBonus,
  },
  {
    id: PromotionPackageEnum.Cashback,
    name: 'Cashback lottery',
    titleKey: 'Pages.Promotion.packages.cashback_lottery',
    titleMbKey: 'Pages.Promotion.packages.cashback_lottery_mb',
    img: '/images/promotion/packages/lottery.webp',
    imgMb: '/images/promotion/packages/lottery-mb.webp',
    upto: 'Lên đến 0.95%',
    slug: PromotionSlugEnum.CashbackLotteryBonus,
  },
  {
    id: PromotionPackageEnum.Cashback,
    name: 'Cashback cookfight',
    titleKey: 'Pages.Promotion.packages.cashback_cookfight',
    titleMbKey: 'Pages.Promotion.packages.cashback_cookfight_mb',
    img: '/images/promotion/packages/cockfight.webp',
    imgMb: '/images/promotion/packages/cockfight-mb.webp',
    upto: 'Lên đến 0.95%',
    slug: PromotionSlugEnum.CashbackCookfightBonus,
  },
];

export const CASHBACK_DATA: Record<string, string>[] = [
  {
    titleKey: 'Pages.Promotion.packages.game',
    valueKey: 'Pages.Promotion.packages.cashback_rate',
  },
  {
    titleKey: 'Pages.Promotion.cashback_table.sport',
    titleKeyMb: 'Pages.Promotion.packages.sport_mb',
    value: '1.4%',
    key: VipPrivilegeEnum.Sports,
  },
  {
    titleKey: 'Pages.Promotion.cashback_table.keno',
    titleKeyMb: 'Pages.Promotion.packages.keno_mb',
    value: '0.95%',
    key: VipPrivilegeEnum.Keno,
  },
  {
    titleKey: 'Pages.Promotion.cashback_table.number_game',
    titleKeyMb: 'Pages.Promotion.packages.number_game_mb',
    value: '0.95%',
    key: VipPrivilegeEnum.NumberGame,
  },
  {
    titleKey: 'Pages.Promotion.cashback_table.lottery',
    titleKeyMb: 'Pages.Promotion.packages.lottery_mb',
    value: '0.95%',
    key: VipPrivilegeEnum.Lottery,
  },
  {
    titleKey: 'Pages.Promotion.cashback_table.slots',
    titleKeyMb: 'Pages.Promotion.packages.slots_mb',
    value: '0.95%',
    key: VipPrivilegeEnum.Slots,
  },
  {
    titleKey: 'Pages.Promotion.cashback_table.cock_fight',
    titleKeyMb: 'Pages.Promotion.packages.cock_fighting_mb',
    value: '0.95%',
    key: VipPrivilegeEnum.CockFighting,
  },
  {
    titleKey: 'Pages.Promotion.cashback_table.evoplay_game',
    titleKeyMb: 'Pages.Promotion.packages.game_qtech_mb',
    value: '0.95%',
    key: VipPrivilegeEnum.EvoplayGames,
  },
];

export const CASHBACK_GENERAL_DATA: PromotionPackageType = {
  id: PromotionPackageEnum.Cashback,
  name: 'Pages.Promotion.packages.general_cashback_detail',
  titleKey: 'Pages.Promotion.packages.general_cashback',
  titleMbKey: 'Pages.Promotion.packages.general_cashback',
  img: '/images/promotion/packages/cashback-banner.webp',
  imgMb: '/images/promotion/packages/cashback-banner-mb.webp',
  upto: 'Lên đến 1.4%',
  slug: '',
}


