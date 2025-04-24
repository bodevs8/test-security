export type VipPrivileges = {
  name: string;
  percent: number;
};

export type VipBonus = {
  bonus: number;
  luckyMoney: number;
};

export type VipInfo = {
  vipLevel: number;
  nextVipLevel: number;
  vipDepositCurrentTotal: number;
  vipDepositRequiredTotal: number;
  vipTurnoverCurrentTotal: number;
  vipTurnoverRequiredTotal: number;
  vipBonus: string;
  vipLuckyMoney: string;
  vipDepositCurrentTotalFormatted?: string;
  vipDepositRequiredTotalFormatted?: string;
  vipTurnoverCurrentTotalFormatted?: string;
  vipTurnoverRequiredTotalFormatted?: string;
  vipBonusCurrentLevel?: string;
  vipLuckyMoneyCurrentLevel?: string;
};

export type VipConditions = {
  vipLevel: number;
  turnoverCurrentTotal: number;
  turnoverRequiredTotal: number;
  depositCurrentTotal: number;
  depositRequiredTotal: number;
  vipPrivileges: VipPrivileges[];
  turnoverCurrentTotalFormatted?: string;
  turnoverExtendFormatted?: string;
  depositCurrentTotalFormatted?: string;
  depositExtendFormatted?: string;
};

export type ReferralCardType = {
  referralFriends?: number;
  referralBonus?: number;
  referralLink?: string;
  referralCode?: string;
};

export type VipInfoResponse = {
  deposit_extend: number;
  deposit_up: number;
  level: number;
  stake_extend: number;
  stake_up: number;
};

export type AccountProfileResponse = {
  effected_date: string;
  expired_date: string;
  level: number;
  total_deposit: number;
  total_stake: number;
};

export type OverviewUserInfo = {
  username: string;
  balance: string;
};
