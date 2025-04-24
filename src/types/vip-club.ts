export type VipClubItem = {
  vipLevel: number;
  rechargeRequired: string;
  rechargeExtend: string;
  turnoverRequired: string;
  turnoverExtend: string;
  bonusRank: string;
  newYearBonus: string;
  cashbackRewardSport: number;
  cashbackRewardKeno: number;
  cashbackRewardChickenfight: number;
  cashbackRewardSlots: number;
  cashbackRewardNumbergame: number;
  cashbackRewardLottery: number;
};

export type VipInfoTableCell = {
  id: keyof VipClubItem;
  title: string;
  isPercent?: boolean;
  isCurrency?: boolean;
};
