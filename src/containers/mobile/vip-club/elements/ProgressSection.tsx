import type { VipInfo } from '@/types/account-info';
import { useTranslations } from 'next-intl';
import { VipProgressBar } from './VipProgressBar';

type Props = {
  vipAccountProfile: VipInfo;
};

export const ProgressSection = ({ vipAccountProfile }: Props) => {
  const t = useTranslations('Pages.VipClub');
  const {
    vipDepositCurrentTotal,
    vipDepositRequiredTotal,
    vipTurnoverCurrentTotal,
    vipTurnoverRequiredTotal,
    vipDepositCurrentTotalFormatted,
    vipDepositRequiredTotalFormatted,
    vipTurnoverCurrentTotalFormatted,
    vipTurnoverRequiredTotalFormatted,
  } = vipAccountProfile;

  return (
    <div className="w-full flex flex-col gap-[20px] p-4 progress-section-mb">
      <VipProgressBar
        current={vipDepositCurrentTotal}
        required={vipDepositRequiredTotal}
        currentFormatted={vipDepositCurrentTotalFormatted}
        requiredFormatted={vipDepositRequiredTotalFormatted}
        label={t('member_banner.deposit_required')}
        barColor="bg-money"
      />
      <VipProgressBar
        current={vipTurnoverCurrentTotal}
        required={vipTurnoverRequiredTotal}
        currentFormatted={vipTurnoverCurrentTotalFormatted}
        requiredFormatted={vipTurnoverRequiredTotalFormatted}
        label={t('member_banner.turnover_required')}
        barColor="bg-bright-aqua"
        className=""
      />
    </div>
  );
};
