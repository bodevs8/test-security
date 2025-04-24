'use client';

import type { BetFilterStatus, GetBetHistoryParams } from '@/types/bet-history';
import type { Dispatch, SetStateAction } from 'react';
import { BaseReload } from '@/components/BaseReload';
import { BaseSelect } from '@/components/BaseSelect';
import { BET_FILTER_STATUS } from '@/constant/bet-history';
import { TextTransformEnum } from '@/enums';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

type FilterProps = {
  isEmpty: boolean;
  setQueryParam: Dispatch<SetStateAction<GetBetHistoryParams>>;
  getBetHistoryData: (customParams?: GetBetHistoryParams) => Promise<void>;
  defaultParams: GetBetHistoryParams;
  queryParams: GetBetHistoryParams;
  isMobile?: boolean;
  className?: string;
  filterClassName?: string;
  filterStatusClassName?: string;
};

const FilterBetHistory = ({
  isEmpty,
  setQueryParam,
  getBetHistoryData,
  defaultParams,
  queryParams,
  isMobile = false,
  className,
  filterClassName,
  filterStatusClassName,
}: FilterProps) => {
  const t = useTranslations('Pages.Account.bet_history');

  const transformFilterStatus = useMemo(() => {
    return BET_FILTER_STATUS.map((item) => ({
      value: item.value,
      label: t(item.label),
    }));
  }, [t]);

  const handleRefreshHistory = () => {
    setQueryParam(defaultParams);
    getBetHistoryData(defaultParams);
  };

  const handleChangeStatus = (
    status: string | number | (string | number)[],
  ) => {
    setQueryParam((prev) => ({
      ...prev,
      status: (status as BetFilterStatus) ?? '',
      page: 1,
    }));
  };

  const isDisabled = useMemo(() => {
    return queryParams.status === BET_FILTER_STATUS[0]?.value && isEmpty;
  }, [queryParams.status, isEmpty]);

  return (
    <div className={clsx('flex justify-between items-center gap-3', className)}>
      <div className={clsx('flex gap-3 items-center', filterClassName)}>
        <BaseSelect
          options={transformFilterStatus}
          selectPlaceholder={t('filter.status.placeholder')}
          drawerTitle={t('filter.status.placeholder_mobile')}
          className={clsx('!w-[200px] h-[44px]', filterStatusClassName)}
          optionClassName="!w-[200px]"
          onChange={handleChangeStatus}
          isDisabled={isDisabled}
          initialValues={queryParams.status}
          selectTextTransform={TextTransformEnum.NONE}
        />
      </div>
      {!isMobile && (
        <div className="flex gap-[10px] items-center">
          <span className="inline text-warning text-[14px] leading-[140%]">
            {t('refresh.title')}
          </span>
          <BaseReload onClick={handleRefreshHistory} />
        </div>
      )}
    </div>
  );
};

export { FilterBetHistory };
