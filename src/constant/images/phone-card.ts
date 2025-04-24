import type { ImageMapping } from '@/types/app';

import MobifoneTabActive from '@/public/images/phonecard/active/mobifone.webp';
import VietnamobileTabActive from '@/public/images/phonecard/active/vietnamobile.webp';
import ViettelTabActive from '@/public/images/phonecard/active/viettel.webp';
import VinaphoneTabActive from '@/public/images/phonecard/active/vinaphone.webp';

import MobifoneMaintenance from '@/public/images/phonecard/maintain/mobifone.webp';
import VietnamobileMaintenance from '@/public/images/phonecard/maintain/vietnamobile.webp';
import ViettelMaintenance from '@/public/images/phonecard/maintain/viettel.webp';

import VinaphoneMaintenance from '@/public/images/phonecard/maintain/vinaphone.webp';
import MobiPhone from '@/public/images/phonecard/mobiphone.webp';
import MobifoneTab from '@/public/images/phonecard/tab/mobifone.webp';
import VietnamobileTab from '@/public/images/phonecard/tab/vietnamobile.webp';

import ViettelTab from '@/public/images/phonecard/tab/viettel.webp';
import VinaphoneTab from '@/public/images/phonecard/tab/vinaphone.webp';
import Vietnamobile from '@/public/images/phonecard/vietnamobile.webp';
import Viettel from '@/public/images/phonecard/viettel.webp';
import Vinaphone from '@/public/images/phonecard/vinaphone.webp';

export const MAPPING_PHONE_CARD_IMAGE: ImageMapping = {
  mobiphone: MobiPhone,
  viettel: Viettel,
  vinaphone: Vinaphone,
  vietnamobile: Vietnamobile,
};

export const MAPPING_PHONE_CARD_ICON: ImageMapping = {
  mobifone: MobifoneTab,
  viettel: ViettelTab,
  vinaphone: VinaphoneTab,
  vietnamobile: VietnamobileTab,
};

export const MAPPING_PHONE_CARD_ICON_ACTIVE: ImageMapping = {
  mobifone: MobifoneTabActive,
  viettel: ViettelTabActive,
  vinaphone: VinaphoneTabActive,
  vietnamobile: VietnamobileTabActive,
};

export const MAPPING_PHONE_CARD_ICON_MAINTENANCE: ImageMapping = {
  mobifone: MobifoneMaintenance,
  viettel: ViettelMaintenance,
  vinaphone: VinaphoneMaintenance,
  vietnamobile: VietnamobileMaintenance,
};
