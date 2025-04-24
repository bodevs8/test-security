'use client';
import type { VipInfo } from '@/types/account-info';
import type { VipClubItem } from '@/types/vip-club';
import type { StaticImageData } from 'next/image';
import { EmblaCarousel } from '@/components/EmblaCarousel';
import { DEFAULT_CURRENCY_UNIT } from '@/constant/app';
import { VIP_LEVELS } from '@/constant/vip-info';
import CashBackIcon from '@/public/images/vip-club/cashback-icon.webp';
import KingIcon from '@/public/images/vip-club/king-icon.webp';
import { formatNumberWithCommas } from '@/utils/format-currency';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMemo, useState } from 'react';

type TableSectionProps = {
  icon: StaticImageData;
  title: string;
  items: Array<{
    label: string;
    value: keyof VipClubItem;
    isPercent?: boolean;
  }>;
  vipData: VipClubItem | undefined;
  t: (key: string) => string;
};

const TableSection = ({
  icon,
  title,
  items,
  vipData,
  t,
}: TableSectionProps) => {
  const getValueVip = (id: keyof VipClubItem, isPercent?: boolean) => {
    if (vipData?.[id] === '0') {
      return t('invite');
    }
    if (isPercent) {
      return `${vipData?.[id]}%`;
    }
    return formatNumberWithCommas(vipData?.[id] ?? 0, DEFAULT_CURRENCY_UNIT);
  };

  return (
    <div className="w-full px-3">
      <div className="flex items-center gap-1">
        <Image src={icon} alt="Vip Table" width={24} height={24} />
        <span className="text-navy-blue-500 text-[14px] md:text-[16px] leading-[140%] font-medium">
          {t(title)}
        </span>
      </div>
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between mt-2">
          <span className="text-dark-700 text-[12px] md:text-[14px] leading-[140%] font-normal">
            {t(item.label)}
          </span>
          <span className="text-dark-700 text-[12px] md:text-[14px] leading-[140%] font-medium">
            {getValueVip(item.value, item.isPercent)}
          </span>
        </div>
      ))}
    </div>
  );
};

type Props = {
  vipItems: VipClubItem[];
  isLoggedIn: boolean;
  vipAccountProfile: VipInfo | null;
};

export const VipInfoTable = ({
  vipItems,
  isLoggedIn,
  vipAccountProfile,
}: Props) => {
  const t = useTranslations('Pages.VipClub.table_mobile');
  const vipActiveLevel = useMemo(() => {
    if (!isLoggedIn) return VIP_LEVELS.HIGHEST;
    return vipAccountProfile && vipAccountProfile.vipLevel > 0
      ? vipAccountProfile.vipLevel
      : VIP_LEVELS.HIGHEST;
  }, [isLoggedIn, vipAccountProfile]);

  const [vipActive, setVipActive] = useState(vipActiveLevel);

  const vipData = useMemo(
    () => vipItems.find((vip) => vip.vipLevel === vipActive),
    [vipActive, vipItems],
  );

  const sections = useMemo(
    () => [
      {
        icon: KingIcon,
        title: 'level_up.title',
        items: [
          {
            label: 'level_up.recharge',
            value: 'rechargeRequired' as keyof VipClubItem,
          },
          {
            label: 'level_up.turnover',
            value: 'turnoverRequired' as keyof VipClubItem,
          },
        ],
      },
      {
        icon: KingIcon,
        title: 'maintain_vip.title',
        items: [
          {
            label: 'maintain_vip.recharge',
            value: 'rechargeExtend' as keyof VipClubItem,
          },
          {
            label: 'maintain_vip.turnover',
            value: 'turnoverExtend' as keyof VipClubItem,
          },
        ],
      },
      {
        icon: KingIcon,
        title: 'reward.title',
        items: [
          { label: 'reward.level_up', value: 'bonusRank' as keyof VipClubItem },
          {
            label: 'reward.new_year_bonus',
            value: 'newYearBonus' as keyof VipClubItem,
          },
        ],
      },
      {
        icon: CashBackIcon,
        title: 'return.title',
        items: [
          {
            label: 'return.sport',
            value: 'cashbackRewardSport' as keyof VipClubItem,
            isPercent: true,
          },
          {
            label: 'return.keno',
            value: 'cashbackRewardKeno' as keyof VipClubItem,
            isPercent: true,
          },
          {
            label: 'return.number_game',
            value: 'cashbackRewardNumbergame' as keyof VipClubItem,
            isPercent: true,
          },
          {
            label: 'return.lottery',
            value: 'cashbackRewardLottery' as keyof VipClubItem,
            isPercent: true,
          },
          {
            label: 'return.slots',
            value: 'cashbackRewardSlots' as keyof VipClubItem,
            isPercent: true,
          },
          {
            label: 'return.cock_fighting',
            value: 'cashbackRewardChickenfight' as keyof VipClubItem,
            isPercent: true,
          },
          {
            label: 'return.other',
            value: 'cashbackRewardLottery' as keyof VipClubItem,
            isPercent: true,
          },
        ],
      },
    ],
    [],
  );

  const startIndex = useMemo(() => {
    return VIP_LEVELS.HIGHEST - vipActiveLevel - 3;
  }, [vipActiveLevel]);

  return (
    <div className="x-container !mt-[24px] !pb-3">
      <div className="table-title-mb mb-[12px] flex justify-center items-center">
        <span className="text-[3.59vw] text-highlight leading-[140%] font-bold uppercase md:text-[40px]">
          {t('privileges')}
        </span>
      </div>
      <div className="swiper-container mt-[3.281vw]">
        <EmblaCarousel
          id="vip-logo"
          className="overflow-hidden"
          containerClassName="-ml-2 lg:-ml-2"
          slideClassName="pl-2 lg:pl-2"
          dragFree
          opts={{
            startIndex,
            align: 'start',
          }}
        >
          {vipItems?.map((vip, index) => (
            <div
              key={index}
              className={clsx(
                'flex flex-col justify-center gap-1 bg-primary-light-50 rounded-[6px] px-3 py-1 items-center',
                vip.vipLevel === vipActive && 'vip-logo-active',
              )}
              onClick={() => setVipActive(vip.vipLevel)}
            >
              <Image
                src={`/images/vip-club/vip-logo-${vip.vipLevel}.webp`}
                alt="vip-logo"
                width={60}
                height={60}
                className={clsx('block', 'aspect-[60/60]')}
                priority
                loading="eager"
                fetchPriority="high"
              />
              <span className="text-sm leading-[140%] font-bold uppercase text-dark-700">
                VIP {vip.vipLevel}
              </span>
            </div>
          ))}
        </EmblaCarousel>
      </div>
      <div className="mt-3 py-4 vip-table-mb">
        {sections.map((section, index) => (
          <div key={index}>
            <TableSection
              icon={section.icon}
              title={section.title}
              items={section.items}
              vipData={vipData}
              t={t}
            />
            {index < sections.length - 1 && (
              <div className="w-full h-[1px] bg-primary-light-200 my-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
