'use client';

import type { VipPrivilegeEnum } from '@/enums/vip';
import { Loading } from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { CASHBACK_DATA, PROMOTION_PACKAGE } from '@/constant/promotion';
import { VIP_PRIVILEGES_BY_LEVEL } from '@/constant/vip-info';
import { ButtonSizeEnum, ButtonVariantsEnum, RouterPathEnum } from '@/enums';
import { useCashbackInfo } from '@/hooks/useQueries';
import BannerImage from '@/public/images/promotion-applied/cashback-banner-mb.webp';
import { formatNumberWithCommas } from '@/utils/format-currency';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { AvailablePromotion } from './AvailablePromotion';

type CashbackStatsProps = {
  label: string;
  value: number;
  unit: string | undefined;
};

const CashbackStats = ({ label, value, unit }: CashbackStatsProps) => (
  <div className="flex justify-between">
    <p>{label}</p>
    <p className="text-success font-bold">
      {formatNumberWithCommas(value, unit || '')}
    </p>
  </div>
);

type CashbackDataItem = {
  titleKeyMb: string;
  value: string;
  key: VipPrivilegeEnum;
};

type CashbackItemProps = {
  item: CashbackDataItem;
  index: number;
  totalItems: number;
  t: (key: string) => string;
};

const CashbackItem = ({ item, index, totalItems, t }: CashbackItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="">
        <p
          className={clsx(
            'text-dark-200',
            index === totalItems - 1 && 'max-w-[51.282vw]',
          )}
        >
          {t(item?.titleKeyMb)}
        </p>
      </div>
      <p
        className={clsx(
          index > 0 && 'text-success font-bold',
          index === 0 && 'text-dark-200',
        )}
      >
        {item?.value}
      </p>
    </div>
  );
};

export const CashbackPackage = () => {
  const t = useTranslations();
  const { data: cashbackInfo, isPending } = useCashbackInfo();
  const MAIN_CREDIT_UNIT = process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT;

  const cashbackData = useMemo(() => {
    const vipInfo = VIP_PRIVILEGES_BY_LEVEL[cashbackInfo?.currentVipLevel ?? 0];
    return CASHBACK_DATA.map((item) => {
      const vipPrivilege = vipInfo?.find((v) => v.name === item.key);
      return {
        titleKeyMb: item.titleKeyMb || item.titleKey || '',
        value: item.valueKey
          ? t(item.valueKey)
          : `${vipPrivilege?.percent || item.value || '0'}%`,
        key: item.key as VipPrivilegeEnum,
      };
    });
  }, [cashbackInfo, t]);

  const availablePackages = PROMOTION_PACKAGE;

  return (
    <div className="promotion-applied-container">
      {isPending && <Loading />}
      <div className="relative">
        <Image
          src={BannerImage}
          width={366}
          height={160}
          alt="Cashback Banner"
          className="rounded-[8px] w-full"
        />
        <div className="absolute top-0 left-0 size-full justify-center flex flex-col pl-[4.103vw] w-[41.026vw]">
          <div className="title-bg text-white h-[6.41vw] font-extrabold italic text-[3.59vw] leading-[140%] uppercase w-full flex items-center justify-end pr-[2.051vw]">
            {t('Pages.Account.promotion_applied.package.cashback_title')}
          </div>
          <div className="cashback-upto text-[4.103vw] leading-[140%] uppercase w-full flex font-extrabold items-center text-center justify-center">
            {t('Pages.Account.promotion_applied.package.cashback_up_to')}
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4 gap-3 font-medium text-[3.077vw] text-dark-200 bg-primary-light-50 py-[10px] px-4 rounded-[8px]">
        <div className="flex justify-between">
          <p>{t('Pages.Account.promotion_applied.package.title')}</p>
          <p className="text-dark-700">
            {t('Pages.Account.promotion_applied.package.cashback')}
          </p>
        </div>
        <div className="flex justify-between">
          <p>{t('Pages.Account.promotion_applied.package.time')}</p>
          <p className="text-dark-700">
            {t('Pages.Account.promotion_applied.package.unlimited')}
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-4 gap-3 font-medium text-[3.077vw] text-dark-200 bg-primary-light-50 py-[10px] px-4 rounded-[8px]">
        <CashbackStats
          label={t('Pages.Account.promotion_applied.cashback.total_bet')}
          value={cashbackInfo?.todayBet ?? 0}
          unit={MAIN_CREDIT_UNIT}
        />
        <CashbackStats
          label={t('Pages.Account.promotion_applied.cashback.today_commission')}
          value={cashbackInfo?.todayCommission ?? 0}
          unit={MAIN_CREDIT_UNIT}
        />
        <CashbackStats
          label={t('Pages.Account.promotion_applied.cashback.total_commission')}
          value={cashbackInfo?.totalCommission ?? 0}
          unit={MAIN_CREDIT_UNIT}
        />
        <div className="h-[1px] bg-primary-light-150 w-full" />
        {cashbackData.map((item, index) => (
          <CashbackItem
            key={index}
            item={item}
            index={index}
            totalItems={cashbackData.length}
            t={t}
          />
        ))}
        <div className="h-[1px] bg-primary-light-150 w-full" />
        <Link
          prefetch={false}
          href={`${RouterPathEnum.Promotions}`}
          className="cursor-pointer w-full flex-grow"
        >
          <Button
            id="view-detail"
            name="view-detail"
            size={ButtonSizeEnum.LG}
            variant={ButtonVariantsEnum.Secondary}
            className="w-full"
          >
            <p className="font-medium text-base leading-[140%]">
              {t('Pages.Account.promotion_applied.package.view_detail')}
            </p>
          </Button>
        </Link>
      </div>
      <AvailablePromotion promotions={availablePackages} />
    </div>
  );
};
