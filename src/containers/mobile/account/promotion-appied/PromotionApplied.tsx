import type { UserData } from '@/types/auth';
import { PromotionPackageEnum } from '@/enums';
import { CashbackPackage } from './elements/CashbackPackage';
import { CommissionPackage } from './elements/CommissionPackage';
import { EmptyPackage } from './elements/EmptyPackage';

type PromotionAppliedProps = {
  user: UserData;
};

export const PromotionAppliedMobile = async ({
  user,
}: PromotionAppliedProps) => {
  const isCashback = user?.package_id === PromotionPackageEnum.Cashback;
  const isWelcome = user?.package_id === PromotionPackageEnum.Welcome;

  return (
    <div className="px-3 py-4 bg-white pb-[64px]">
      {!user?.package_id && <EmptyPackage />}
      {isCashback && <CashbackPackage />}
      {isWelcome && <CommissionPackage />}
    </div>
  );
};
