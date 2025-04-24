import type { VipInfo } from '@/types/account-info';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
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
    vipLevel,
  } = vipAccountProfile;

  return (
    <div className="relative flex flex-col gap-1 max-w-[30.615vw] w-full xl:max-w-[511px] xl:w-[26.615vw] pl-[2.813vw] lg:pr-[2.083vw] pt-1 lg:pt-[1.667vw] lg:gap-[1.563vw] pb-[3.177vw] min-w-[296px] 3xl:pt-[32px] 3xl:pl-[54px] 3xl:pr-[40px] 3xl:gap-[29px] max-h-[194px]">
      <Image
        className="absolute top-0 left-0 aspect-[522/195] z-1"
        src={`/images/vip-club/progress-vip-${vipLevel}.webp`}
        alt="Vip Progress"
        width={522}
        height={195}
      />
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
        className="ml-[10px]"
      />
    </div>
  );
};
