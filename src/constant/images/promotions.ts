import type { StaticImageData } from 'next/image';

import { PromotionPackageEnum } from '@/enums';
import CashbackImage from '@/public/images/deposit/package/return.webp';
import WelcomeImage from '@/public/images/deposit/package/welcome.webp';

export const MAPPING_PROMOTION_DEPOSIT_IMAGE: Record<
  PromotionPackageEnum,
  StaticImageData
> = {
  [PromotionPackageEnum.Cashback]: CashbackImage,
  [PromotionPackageEnum.Welcome]: WelcomeImage,
  [PromotionPackageEnum.Vip30]: WelcomeImage,
  [PromotionPackageEnum.Vip50]: WelcomeImage,
};
