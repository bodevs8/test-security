import type { VipBonus, VipPrivileges } from '@/types/account-info';
import type { VipInfoTableCell } from '@/types/vip-club';
import { VipPrivilegeEnum } from '@/enums/vip';

export const VIP_PRIVILEGES_BY_LEVEL: Record<number, VipPrivileges[]> = {
  0: [
    { name: VipPrivilegeEnum.Sports, percent: 0.5 },
    { name: VipPrivilegeEnum.Keno, percent: 0.5 },
    { name: VipPrivilegeEnum.NumberGame, percent: 0.5 },
    { name: VipPrivilegeEnum.Lottery, percent: 0.5 },
    { name: VipPrivilegeEnum.Slots, percent: 0.5 },
    { name: VipPrivilegeEnum.CockFighting, percent: 0.5 },
    { name: VipPrivilegeEnum.EvoplayGames, percent: 0.5 },
  ],
  1: [
    { name: VipPrivilegeEnum.Sports, percent: 0.6 },
    { name: VipPrivilegeEnum.Keno, percent: 0.55 },
    { name: VipPrivilegeEnum.NumberGame, percent: 0.55 },
    { name: VipPrivilegeEnum.Lottery, percent: 0.55 },
    { name: VipPrivilegeEnum.Slots, percent: 0.55 },
    { name: VipPrivilegeEnum.CockFighting, percent: 0.55 },
    { name: VipPrivilegeEnum.EvoplayGames, percent: 0.55 },
  ],
  2: [
    { name: VipPrivilegeEnum.Sports, percent: 0.7 },
    { name: VipPrivilegeEnum.Keno, percent: 0.6 },
    { name: VipPrivilegeEnum.NumberGame, percent: 0.6 },
    { name: VipPrivilegeEnum.Lottery, percent: 0.6 },
    { name: VipPrivilegeEnum.Slots, percent: 0.6 },
    { name: VipPrivilegeEnum.CockFighting, percent: 0.6 },
    { name: VipPrivilegeEnum.EvoplayGames, percent: 0.6 },
  ],
  3: [
    { name: VipPrivilegeEnum.Sports, percent: 0.8 },
    { name: VipPrivilegeEnum.Keno, percent: 0.65 },
    { name: VipPrivilegeEnum.NumberGame, percent: 0.65 },
    { name: VipPrivilegeEnum.Lottery, percent: 0.65 },
    { name: VipPrivilegeEnum.Slots, percent: 0.65 },
    { name: VipPrivilegeEnum.CockFighting, percent: 0.65 },
    { name: VipPrivilegeEnum.EvoplayGames, percent: 0.65 },
  ],
  4: [
    { name: VipPrivilegeEnum.Sports, percent: 0.9 },
    { name: VipPrivilegeEnum.Keno, percent: 0.7 },
    { name: VipPrivilegeEnum.NumberGame, percent: 0.7 },
    { name: VipPrivilegeEnum.Lottery, percent: 0.7 },
    { name: VipPrivilegeEnum.Slots, percent: 0.7 },
    { name: VipPrivilegeEnum.CockFighting, percent: 0.7 },
    { name: VipPrivilegeEnum.EvoplayGames, percent: 0.7 },
  ],
  5: [
    { name: VipPrivilegeEnum.Sports, percent: 1 },
    { name: VipPrivilegeEnum.Keno, percent: 0.75 },
    { name: VipPrivilegeEnum.NumberGame, percent: 0.75 },
    { name: VipPrivilegeEnum.Lottery, percent: 0.75 },
    { name: VipPrivilegeEnum.Slots, percent: 0.75 },
    { name: VipPrivilegeEnum.CockFighting, percent: 0.75 },
    { name: VipPrivilegeEnum.EvoplayGames, percent: 0.75 },
  ],
  6: [
    { name: VipPrivilegeEnum.Sports, percent: 1.1 },
    { name: VipPrivilegeEnum.Keno, percent: 0.8 },
    { name: VipPrivilegeEnum.NumberGame, percent: 0.8 },
    { name: VipPrivilegeEnum.Lottery, percent: 0.8 },
    { name: VipPrivilegeEnum.Slots, percent: 0.8 },
    { name: VipPrivilegeEnum.CockFighting, percent: 0.8 },
    { name: VipPrivilegeEnum.EvoplayGames, percent: 0.8 },
  ],
  7: [
    { name: VipPrivilegeEnum.Sports, percent: 1.2 },
    { name: VipPrivilegeEnum.Keno, percent: 0.85 },
    { name: VipPrivilegeEnum.NumberGame, percent: 0.85 },
    { name: VipPrivilegeEnum.Lottery, percent: 0.85 },
    { name: VipPrivilegeEnum.Slots, percent: 0.85 },
    { name: VipPrivilegeEnum.CockFighting, percent: 0.85 },
    { name: VipPrivilegeEnum.EvoplayGames, percent: 0.85 },
  ],
  8: [
    { name: VipPrivilegeEnum.Sports, percent: 1.3 },
    { name: VipPrivilegeEnum.Keno, percent: 0.9 },
    { name: VipPrivilegeEnum.NumberGame, percent: 0.9 },
    { name: VipPrivilegeEnum.Lottery, percent: 0.9 },
    { name: VipPrivilegeEnum.Slots, percent: 0.9 },
    { name: VipPrivilegeEnum.CockFighting, percent: 0.9 },
    { name: VipPrivilegeEnum.EvoplayGames, percent: 0.9 },
  ],
  9: [
    { name: VipPrivilegeEnum.Sports, percent: 1.4 },
    { name: VipPrivilegeEnum.Keno, percent: 0.95 },
    { name: VipPrivilegeEnum.NumberGame, percent: 0.95 },
    { name: VipPrivilegeEnum.Lottery, percent: 0.95 },
    { name: VipPrivilegeEnum.Slots, percent: 0.95 },
    { name: VipPrivilegeEnum.CockFighting, percent: 0.95 },
    { name: VipPrivilegeEnum.EvoplayGames, percent: 0.95 },
  ],
};

export const VIP_BONUS_BY_LEVEL: Record<number, VipBonus> = {
  1: {
    bonus: 150_000,
    luckyMoney: 50_000,
  },
  2: {
    bonus: 500_000,
    luckyMoney: 100_000,
  },
  3: {
    bonus: 2_500_000,
    luckyMoney: 200_000,
  },
  4: {
    bonus: 7_500_000,
    luckyMoney: 500_000,
  },
  5: {
    bonus: 21_000_000,
    luckyMoney: 1_000_000,
  },
  6: {
    bonus: 50_000_000,
    luckyMoney: 2_000_000,
  },
  7: {
    bonus: 86_000_000,
    luckyMoney: 4_000_000,
  },
  8: {
    bonus: 100_000_000,
    luckyMoney: 8_000_000,
  },
  9: {
    bonus: 120_000_000,
    luckyMoney: 16_000_000,
  },
};

export const VIP_LEVELS = {
  HIGHEST: 9,
  INVITE_START: 7,
  INVITE_END: 8,
  PROGRESS_MAX: 7,
};

export const VIP_INFO_TABLE_CELLS: VipInfoTableCell[] = [
  {
    id: 'rechargeRequired',
    title: 'table.recharge_required',
  },
  {
    id: 'rechargeExtend',
    title: 'table.recharge_extend',
  },
  {
    id: 'turnoverRequired',
    title: 'table.turnover_required',
  },
  {
    id: 'turnoverExtend',
    title: 'table.turnover_extend',
  },
  {
    id: 'bonusRank',
    title: 'table.bonus_rank',
  },
  {
    id: 'newYearBonus',
    title: 'table.new_year_bonus',
  },
  {
    id: 'cashbackRewardSport',
    title: 'table.cashback_reward_sport',
    isPercent: true,
  },
  {
    id: 'cashbackRewardKeno',
    title: 'table.cashback_reward_keno',
    isPercent: true,
  },
  {
    id: 'cashbackRewardChickenfight',
    title: 'table.cashback_reward_slots',
    isPercent: true,
  },
  {
    id: 'cashbackRewardChickenfight',
    title: 'table.cashback_reward_chickenfight',
    isPercent: true,
  },
  {
    id: 'cashbackRewardChickenfight',
    title: 'table.cashback_reward_numbergame',
    isPercent: true,
  },
  {
    id: 'cashbackRewardSlots',
    title: 'table.cashback_reward_lottery',
    isPercent: true,
  },
  {
    id: 'cashbackRewardLottery',
    title: 'table.cashback_reward_evoplay_game',
    isPercent: true,
  },
];

