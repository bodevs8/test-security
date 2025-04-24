'use client';

import type { VipPrivilegeEnum } from '@/enums/vip';
import { BaseTable } from '@/components/BaseTable/BaseTable';
import { Loading } from '@/components/Loading';
import { CASHBACK_DATA, CASHBACK_GENERAL_DATA } from '@/constant/promotion';
import { VIP_PRIVILEGES_BY_LEVEL } from '@/constant/vip-info';
import { TextAlignEnum } from '@/enums';
import { useCashbackInfo } from '@/hooks/useQueries';
import { formatNumberWithCommas } from '@/utils/format-currency';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { PackageList } from './PackageList';
import { PromotionDetails } from './PromotionDetails';
import { PromotionHeader } from './PromotionHeader';

type CashbackInfoProps = {
  title: string;
  value: string;
};
const CashbackInfo = ({ title, value }: CashbackInfoProps) => {
  return (
    <div className="flex grow flex-col gap-1 rounded-[8px] bg-primary-light-50 justify-between items-center py-3">
      <div className="text-dark-200 text-sm font-medium">{title}</div>
      <div className="text-success text-sm font-bold">{value}</div>
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
        subTitleKey: item.subTitleKey || '',
        secondSubTitleKey: item.secondSubTitleKey || '',
        titleKey: item.titleKey || '',
        value: item.valueKey
          ? t(item.valueKey)
          : `${vipPrivilege?.percent || item.value || '0'}%`,
        key: item.key as VipPrivilegeEnum,
      };
    });
  }, [cashbackInfo, t]);

  const cashbackInfoData = [
    {
      key: 'Pages.PromotionApplied.cashback.total_bet',
      value: formatNumberWithCommas(
        cashbackInfo?.todayBet ?? 0,
        MAIN_CREDIT_UNIT,
      ),
    },
    {
      key: 'Pages.PromotionApplied.cashback.today_commission',
      value: formatNumberWithCommas(
        cashbackInfo?.todayCommission ?? 0,
        MAIN_CREDIT_UNIT,
      ),
    },
    {
      key: 'Pages.PromotionApplied.cashback.total_commission',
      value: formatNumberWithCommas(
        cashbackInfo?.totalCommission ?? 0,
        MAIN_CREDIT_UNIT,
      ),
    },
  ];

  const columns = useMemo(() => {
    return cashbackData.map((item, index) => ({
      id: `column-${index}`,
      title: t(item.titleKey),
      renderHeader: () => (
        <p
          className={clsx(
            'text-dark-200 flex items-center justify-center whitespace-pre-line',
            {
              'md:ml-5 xl:ml-0 flex-grow': index === cashbackData.length - 1,
            },
            { '!text-dark-700': index > 0 },
          )}
        >
          {t(item.titleKey)}
        </p>
      ),
      renderCell: () => (
        <p
          className={clsx(
            '!text-xs h-[34px] flex items-center justify-center',
            {
              'text-success font-bold': index > 0,
            },
            {
              'text-dark-200': index === 0,
            },
          )}
        >
          {item.value}
        </p>
      ),
      textAlign: TextAlignEnum.CENTER,
      theadClassName: clsx(
        'min-w-[80px] font-medium !text-xs',
        { 'flex-grow': index === cashbackData.length - 1 },
        { 'border-r-[1px] border-primary-light-200': index === 0 },
      ),
      tdClassName: clsx(
        'min-w-[80px] !h-[34px]',
        { 'flex-grow': index === cashbackData.length - 1 },
        { 'border-r-[1px] border-primary-light-200': index === 0 },
      ),
    }));
  }, [cashbackData, t]);

  return (
    <div>
      {isPending && <Loading />}
      <PromotionHeader title={t('Pages.PromotionApplied.title')} />
      <PromotionDetails
        data={{
          ...CASHBACK_GENERAL_DATA,
          name: t(CASHBACK_GENERAL_DATA.name),
        }}
        expTime={t('Pages.PromotionApplied.cashback_package.exptime')}
      />
      <div className="mt-6">
        <BaseTable
          columns={columns}
          data={[{}]}
          className="cashback-table overflow-x-auto custom-scrollbar"
          containerClassName="bg-primary-light-50 p-3"
          tableClassName="border-collapse"
          theadClassName="border-b-[1px] border-primary-light-200"
          totalPages={1}
          currentPage={1}
        />
      </div>
      <div className="mt-6 flex gap-4">
        {cashbackInfoData?.map((item) => (
          <CashbackInfo key={item.key} value={item.value} title={t(item.key)} />
        ))}
      </div>
      <div className="mt-6">
        <PackageList />
      </div>
    </div>
  );
};
