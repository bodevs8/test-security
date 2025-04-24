'use client';

import type {
  BetHistoryDataType,
  GetBetHistoryParams,
} from '@/types/bet-history';
import type { Dispatch, SetStateAction } from 'react';
import { BaseTable } from '@/components/BaseTable';
import { TextAlignEnum } from '@/enums';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import AmountColumn from './table-columns/AmountColumn';
import IdColumn from './table-columns/IdColumn';
import ProductColumn from './table-columns/ProductColumn';
import StatusColumn from './table-columns/StatusColumn';
import TurnoverColumn from './table-columns/TurnoverColumn';

type Props = {
  totalPages: number;
  queryParams: GetBetHistoryParams;
  betHistoryData: any;
  setQueryParam: Dispatch<SetStateAction<GetBetHistoryParams>>;
};

const TableBetHistory = ({
  totalPages,
  queryParams,
  betHistoryData,
  setQueryParam,
}: Props) => {
  const t = useTranslations('Pages.Account.bet_history');

  const handleChangePage = (page: number) => {
    setQueryParam((prev) => ({
      ...prev,
      page,
    }));
  };

  const columns = [
    {
      id: 'id',
      title: t('table.id'),
      textAlign: TextAlignEnum.LEFT,
      renderCell: (data: BetHistoryDataType) => <IdColumn data={data} />,
    },
    {
      id: 'product',
      title: t('table.product'),
      textAlign: TextAlignEnum.LEFT,
      theadClassName: 'pl-4',
      renderCell: (data: BetHistoryDataType) => <ProductColumn data={data} />,
    },
    {
      id: 'stake',
      title: t('table.stake'),
      textAlign: TextAlignEnum.RIGHT,
      renderCell: (data: BetHistoryDataType) => (
        <AmountColumn data={data} dataKey="stake" />
      ),
    },
    {
      id: 'winlost',
      title: t('table.winlost'),
      textAlign: TextAlignEnum.RIGHT,
      renderCell: (data: BetHistoryDataType) => (
        <AmountColumn data={data} dataKey="winlost" />
      ),
    },
    {
      id: 'turnover',
      title: t('table.turnover'),
      textAlign: TextAlignEnum.RIGHT,
      renderCell: (data: BetHistoryDataType) => <TurnoverColumn data={data} />,
    },
    {
      id: 'commission',
      title: t('table.commission'),
      textAlign: TextAlignEnum.RIGHT,
      renderCell: (data: BetHistoryDataType) => (
        <AmountColumn data={data} dataKey="commission" />
      ),
    },
    {
      id: 'status',
      title: t('table.status'),
      textAlign: TextAlignEnum.RIGHT,
      renderCell: (data: BetHistoryDataType) => <StatusColumn data={data} />,
    },
  ];

  return (
    <div className="w-full h-full">
      <BaseTable
        columns={columns}
        data={betHistoryData}
        totalPages={totalPages}
        currentPage={queryParams.page}
        tableClassName="w-full !min-w-fit"
        emptyClassName="pb-[60px]"
        className={clsx('bet-history-table')}
        containerClassName="overflow-auto xspc:overflow-hidden"
        onPageChange={handleChangePage}
      />
    </div>
  );
};

export default TableBetHistory;
