import type { UserData } from '@/types/auth';
import { PromotionPackageEnum } from '@/enums';
import { CashbackPackage } from './elements/CashbackPackage';
import { CommissionPackage } from './elements/CommissionPackage';
import { EmptyPackage } from './elements/EmptyPackage';

type PromotionAppliedProps = {
  user: UserData;
};

export const PromotionAppliedDesktop = async ({ user }: PromotionAppliedProps) => {
  const isCashback = user?.package_id === PromotionPackageEnum.Cashback;
  const isWelcome = user?.package_id === PromotionPackageEnum.Welcome;

  return (
    <div className="p-6 bg-white size-full rounded-[8px]">
      {!user?.package_id && <EmptyPackage />}
      {isCashback && <CashbackPackage />}
      {isWelcome && <CommissionPackage />}
    </div>
  );
};
