'use client';

import type {
  GetTransactionParams,
  HistoryFilterStatus,
} from '@/types/transaction';
import type { Dispatch, SetStateAction } from 'react';
import { BaseReload } from '@/components/BaseReload';
import { BaseSelect } from '@/components/BaseSelect';
import { FILTER_ACTION, FILTER_STATUS } from '@/constant/transaction';
import { TextTransformEnum } from '@/enums';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

type FilterProps = {
  isEmpty: boolean;
  setQueryParam: Dispatch<SetStateAction<GetTransactionParams>>;
  getTransactionData: (customParams?: GetTransactionParams) => Promise<void>;
  defaultParams: GetTransactionParams;
  queryParams: GetTransactionParams;
  isMobile?: boolean;
  className?: string;
  filterClassName?: string;
  filterStatusClassName?: string;
  filterActionClassName?: string;
};

const FilterTransaction = ({
  isEmpty,
  setQueryParam,
  getTransactionData,
  defaultParams,
  queryParams,
  isMobile = false,
  className = '',
  filterClassName = '',
  filterStatusClassName = '',
  filterActionClassName = '',
}: FilterProps) => {
  const t = useTranslations('Pages.Account.transaction_history');

  const transformFilterStatus = useMemo(() => {
    return FILTER_STATUS.map((item) => ({
      value: item.value,
      label: t(item.label),
    }));
  }, [t]);

  const transformFilterAction = useMemo(() => {
    return FILTER_ACTION.map((item) => ({
      value: item.value,
      label: t(item.label),
    }));
  }, [t]);

  const isGetTransactionData = useMemo(
    () =>
      defaultParams.status === queryParams.status &&
      defaultParams.action === queryParams.action &&
      defaultParams.page === queryParams.page,
    [defaultParams, queryParams],
  );

  const handleRefreshHistory = useCallback(() => {
    setQueryParam(defaultParams);
    if (isGetTransactionData) {
      getTransactionData(defaultParams);
    }
  }, [defaultParams, getTransactionData, isGetTransactionData, setQueryParam]);

  const handleChangeStatus = (
    status: string | number | (string | number)[],
  ) => {
    setQueryParam((prev) => ({
      ...prev,
      status: (status as HistoryFilterStatus) ?? '',
      page: 1,
    }));
  };

  const handleChangeAction = (
    action: string | number | (string | number)[],
  ) => {
    setQueryParam((prev) => ({
      ...prev,
      action: action as string,
      page: 1,
    }));
  };

  const isDisabledStatus = useMemo(() => {
    return queryParams.status === FILTER_STATUS[0]?.value && isEmpty;
  }, [queryParams.status, isEmpty]);

  const isDisabledAction = useMemo(() => {
    return queryParams.action === FILTER_ACTION[0]?.value && isEmpty;
  }, [queryParams.action, isEmpty]);

  return (
    <>
      <div
        className={clsx('flex justify-between items-center gap-3', className)}
      >
        <div className={clsx('flex gap-3 items-center', filterClassName)}>
          <BaseSelect
            options={transformFilterStatus}
            selectPlaceholder={t('filter.status.placeholder')}
            drawerTitle={t('filter.status.placeholder_mobile')}
            className={clsx('!w-[200px] h-[44px]', filterStatusClassName)}
            onChange={handleChangeStatus}
            isDisabled={isDisabledStatus && isDisabledAction}
            initialValues={queryParams.status}
            selectTextTransform={TextTransformEnum.NONE}
          />
          <BaseSelect
            options={transformFilterAction}
            selectPlaceholder={t('filter.action.placeholder')}
            drawerTitle={t('filter.action.placeholder_mobile')}
            className={clsx('!w-[200px] h-[44px]', filterActionClassName)}
            onChange={handleChangeAction}
            isDisabled={isDisabledAction && isDisabledStatus}
            initialValues={queryParams.action}
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
    </>
  );
};

export { FilterTransaction };
