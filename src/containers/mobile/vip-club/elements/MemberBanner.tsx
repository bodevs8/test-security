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

  const bannerDimension = useMemo(() => {
    if (vipLevel < VIP_LEVELS.PROGRESS_MAX) {
      return {
        width: 780,
        height: 680,
      };
    }
    return {
      width: 780,
      height: 396,
    };
  }, [vipLevel]);

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

  const isShowBonusRank = useMemo(() => {
    return vipLevel > 0 && vipLevel < VIP_LEVELS.PROGRESS_MAX;
  }, [vipLevel]);

  return (
    <div
      className={clsx(
        'member-banner-container-mb relative',
        `vip-container-${vipLevel}`,
      )}
    >
      <Image
        src={`/images/vip-club/banner-vip-${vipLevel}-mb.webp`}
        alt="Member Banner"
        width={bannerDimension.width}
        height={bannerDimension.height}
        className="absolute top-0 left-0"
        priority
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute top-0 left-0 size-full pb-[20px] md:pb-[60px]">
        <div className="x-container size-full md:px-6">
          <div className="size-full flex flex-col justify-between">
            <div
              className={clsx(
                'flex flex-col items-center max-w-[58.718vw] md:max-w-[458px] h-full mt-[6.154vw] md:mt-[48px]',
                vipLevel === 0 && '!mt-[13.846vw] md:!mt-[108px]',
              )}
            >
              <div className="vip-title-bg pr-[2.865vw] md:pr-[22px] flex justify-end h-[8.974vw] md:h-[70px] items-center max-w-[56.41vw] md:max-w-[440px]">
                <p className="text-[4.103vw] md:text-[32px] w-full leading-[140%] font-extrabold uppercase text-white italic">
                  {t('guest_banner.title')}
                </p>
              </div>
              <div className="vip-label-bg flex justify-start items-center pl-[4.103vw] md:pl-[32px] w-full h-[11.795vw] md:h-[92px]">
                <p className="vip-label-color w-full text-[6.154vw] md:text-[48px] leading-[170%] font-extrabold uppercase title-brand italic">
                  {vipLabel}
                </p>
              </div>
              {isShowBonusRank && (
                <div className="flex flex-col max-w-full w-full mt-[5.641vw] md:mt-[44px]">
                  <p className="text-white text-[4.103vw] md:text-[32px] leading-[140%] font-medium">
                    {t('member_banner.title_banner')}
                  </p>
                  <p className="text-white text-[4.103vw] md:text-[32px] leading-[140%] font-bold">
                    {vipAccountProfile?.vipBonus}
                  </p>
                </div>
              )}
            </div>
            {renderVipProgress()}
          </div>
        </div>
      </div>
    </div>
  );
};
