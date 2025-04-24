'use client';

import {
  PromotionApplied,
  VIPConditionsCard,
  VIPStatusCard,
} from '@/components/AccountInfo';
import { useAccountInfo } from '@/hooks/account';
import '@/styles/pages/account/overview.scss';

export const OverviewContainer = () => {
  const { vipInfo, vipConditions, isHiddenPrivilege } =
    useAccountInfo();

  return (
    <div className="container-fluid">
      <div className="flex flex-nowrap gap-6 account-overview-container">
        <div className="left-card flex flex-col gap-3 md:gap-6 text-white max-w-[540px] w-[540px]">
          <VIPStatusCard vipInfo={vipInfo} className="vip-status-card" />
          <VIPConditionsCard
            vipConditions={vipConditions}
            vipInfo={vipInfo}
            isHiddenPrivilege={isHiddenPrivilege}
          />
        </div>
        <div className="right-card max-w-[524px] w-full">
          <PromotionApplied />
        </div>
      </div>
    </div>
  );
};
