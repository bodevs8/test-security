import type {
  AccountProfileResponse,
  VipInfo,
  VipInfoResponse,
} from '@/types/account-info';
import type { VipClubItem } from '@/types/vip-club';
import { DEFAULT_CURRENCY_UNIT } from '@/constant/app';
import {
  VIP_BONUS_BY_LEVEL,
  VIP_PRIVILEGES_BY_LEVEL,
} from '@/constant/vip-info';
import { VipPrivilegeEnum } from '@/enums/vip';
import { formatNumberWithCommas } from './format-currency';

export const formatUserVipInfo = (
  accountProfile: AccountProfileResponse,
  vipInfos?: VipInfoResponse[] | null,
): VipInfo => {
  const MAIN_CREDIT_UNIT = DEFAULT_CURRENCY_UNIT;
  const nextLevel = accountProfile.level + 1;
  const nextLevelInfo =
    vipInfos?.find((item) => item.level === nextLevel) ?? null;

  return {
    vipLevel: accountProfile.level,
    nextVipLevel: nextLevel,
    vipDepositCurrentTotal: accountProfile.total_deposit,
    vipDepositRequiredTotal: nextLevelInfo?.deposit_up ?? 0,
    vipTurnoverCurrentTotal: accountProfile.total_stake,
    vipTurnoverRequiredTotal: nextLevelInfo?.stake_up ?? 0,
    vipDepositCurrentTotalFormatted: formatNumberWithCommas(
      accountProfile.total_deposit,
    ),
    vipDepositRequiredTotalFormatted: formatNumberWithCommas(
      nextLevelInfo?.deposit_up ?? 0,
      MAIN_CREDIT_UNIT,
    ),
    vipTurnoverCurrentTotalFormatted: formatNumberWithCommas(
      accountProfile.total_stake,
    ),
    vipTurnoverRequiredTotalFormatted: formatNumberWithCommas(
      nextLevelInfo?.stake_up ?? 0,
      MAIN_CREDIT_UNIT,
    ),
    vipBonus: formatNumberWithCommas(
      VIP_BONUS_BY_LEVEL[nextLevel]?.bonus ?? 0,
      MAIN_CREDIT_UNIT,
    ),
    vipBonusCurrentLevel: formatNumberWithCommas(
      VIP_BONUS_BY_LEVEL[accountProfile.level]?.bonus ?? 0,
      MAIN_CREDIT_UNIT,
    ),
    vipLuckyMoney: formatNumberWithCommas(
      VIP_BONUS_BY_LEVEL[nextLevel]?.luckyMoney ?? 0,
      MAIN_CREDIT_UNIT,
    ),
    vipLuckyMoneyCurrentLevel: formatNumberWithCommas(
      VIP_BONUS_BY_LEVEL[accountProfile.level]?.luckyMoney ?? 0,
      MAIN_CREDIT_UNIT,
    ),
  };
};

const getPrivilegeByLevel = (level?: number, key?: VipPrivilegeEnum) => {
  return (
    VIP_PRIVILEGES_BY_LEVEL?.[level ?? 0]?.find(
      (privilege) => privilege.name === key,
    )?.percent || 0
  );
};

export const formatVipItem = (vipInfos: VipInfoResponse[]): VipClubItem[] => {
  const vipLevels = vipInfos.filter((vipInfo) => vipInfo.level !== 0);

  vipLevels.push({
    level: 8,
    deposit_up: 0,
    stake_up: 0,
    deposit_extend: 0,
    stake_extend: 0,
  });

  vipLevels.push({
    level: 9,
    deposit_up: 0,
    stake_up: 0,
    deposit_extend: 0,
    stake_extend: 0,
  });

  const vipItems = vipLevels.map((vipInfo) => {
    const vipItem: VipClubItem = {
      vipLevel: vipInfo.level,
      rechargeRequired: formatNumberWithCommas(vipInfo.deposit_up),
      turnoverRequired: formatNumberWithCommas(vipInfo.stake_up),
      turnoverExtend: formatNumberWithCommas(vipInfo.stake_extend),
      rechargeExtend: formatNumberWithCommas(vipInfo.deposit_extend),
      bonusRank: formatNumberWithCommas(
        VIP_BONUS_BY_LEVEL[vipInfo.level ?? 0]?.bonus || '0',
      ),
      newYearBonus: formatNumberWithCommas(
        VIP_BONUS_BY_LEVEL[vipInfo.level ?? 0]?.luckyMoney || '0',
      ),
      cashbackRewardSport: getPrivilegeByLevel(
        vipInfo.level,
        VipPrivilegeEnum.Sports,
      ),
      cashbackRewardKeno: getPrivilegeByLevel(
        vipInfo.level,
        VipPrivilegeEnum.Keno,
      ),
      cashbackRewardChickenfight: getPrivilegeByLevel(
        vipInfo.level,
        VipPrivilegeEnum.CockFighting,
      ),
      cashbackRewardSlots: getPrivilegeByLevel(
        vipInfo.level,
        VipPrivilegeEnum.Slots,
      ),
      cashbackRewardNumbergame: getPrivilegeByLevel(
        vipInfo.level,
        VipPrivilegeEnum.NumberGame,
      ),
      cashbackRewardLottery: getPrivilegeByLevel(
        vipInfo.level,
        VipPrivilegeEnum.Lottery,
      ),
    };
    return vipItem;
  });
  return vipItems.reverse();
};

export const calculateWidth = (current?: number, required?: number) => {
  if (!current || !required) return 0;
  return Math.min((current / required) * 100, 100);
};
