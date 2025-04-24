import type { VipInfo } from '@/types/account-info';
import { VIP_LEVELS } from '@/constant/vip-info';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMemo } from 'react';
import { InviteSection } from './InviteSection';
import { LuckyBonus } from './LuckyBonus';
import { ProgressSection } from './ProgressSection';

type Props = {
  vipAccountProfile: VipInfo | null;
};

export const MemberBanner = ({ vipAccountProfile }: Props) => {
  const t = useTranslations('Pages.VipClub');

  const vipLevel = vipAccountProfile?.vipLevel ?? 0;
  const isHighestVip = vipLevel === VIP_LEVELS.HIGHEST;

  const displayStates = useMemo(
    () => ({
      showProgressBars: vipLevel < VIP_LEVELS.PROGRESS_MAX,
      showInviteSection:
        vipLevel >= VIP_LEVELS.INVITE_START &&
        vipLevel <= VIP_LEVELS.INVITE_END,
      showBonusSection: isHighestVip,
    }),
    [vipLevel, isHighestVip],
  );

  const vipLabel = useMemo(() => {
    if (vipLevel === 0) {
      return t('member_banner.vip_label_0');
    }
    return t('member_banner.vip_label', { level: vipLevel });
  }, [vipLevel, t]);

  const renderVipProgress = () => {
    if (displayStates.showProgressBars && vipAccountProfile) {
      return <ProgressSection vipAccountProfile={vipAccountProfile} />;
    }
    if (displayStates.showInviteSection) {
      return <InviteSection vipLevel={vipLevel} />;
    }
    if (displayStates.showBonusSection) {
      return <LuckyBonus />;
    }
    return null;
  };

  return (
    <div
      className={clsx(
        'member-banner-container relative aspect-[1920/422]',
        `vip-container-${vipLevel}`,
      )}
    >
      <Image
        src={`/images/vip-club/banner-vip-${vipLevel}.webp`}
        alt="Member Banner"
        width={1920}
        height={422}
        className="absolute top-0 left-0"
        priority
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute top-0 left-0 size-full">
        <div className="x-container">
          <div className="size-full flex justify-between mt-[5.052vw] 3xl:mt-[97px]">
            <div className="flex flex-col items-center justify-center w-[26.615vw] h-full max-w-[511px]">
              <div className="vip-title-bg pr-[2.865vw] 3xl:pr-[55px] flex justify-end h-[4.115vw] 3xl:h-[79px] items-center max-w-[25.573vw]">
                <p className="text-[1.875vw] 3xl:text-[36px] w-full leading-[140%] font-extrabold uppercase text-white italic">
                  {t('guest_banner.title')}
                </p>
              </div>
              <div className="vip-label-bg flex justify-start max-h-[101px] items-center pl-[1.979vw] w-full h-[5.26vw] 3xl:pl-[38px]">
                <p className="vip-label-color w-full text-[3.125vw] 3xl:text-[60px] leading-[170%] font-extrabold uppercase title-brand italic">
                  {vipLabel}
                </p>
                {vipLevel > 0 && (
                  <div className="flex flex-col max-w-full w-full">
                    <p className="text-white text-[0.833vw] 3xl:text-[16px] leading-[140%] font-medium">
                      {t('member_banner.title_banner')}
                    </p>
                    <p className="text-white text-[1.042vw] 3xl:text-[16px] leading-[140%] font-bold">
                      {vipAccountProfile?.vipBonus}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="xl:-mr-[4.375vw] size-full flex justify-end">
              {renderVipProgress()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
