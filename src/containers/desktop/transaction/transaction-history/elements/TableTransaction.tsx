'use client';

import type {
  GetTransactionParams,
  TransactionDataType,
} from '@/types/transaction';
import type { Dispatch, SetStateAction } from 'react';
import { BaseTable } from '@/components/BaseTable';
import PhoneCardModal from '@/components/Modals/PhoneCardModal';
import { ModalIdEnum, TextAlignEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import AmountColumn from './table-columns/AmountCoumn';
import BankCodeColumn from './table-columns/BankCodeColumn';
import BankTrancodeColumn from './table-columns/BankTrancodeColumn';
import IdColumn from './table-columns/IdColumn';
import MethodColumn from './table-columns/MethodCoulmn';
import StatusColumn from './table-columns/StatusColumn';
import TypeColumn from './table-columns/TypeColumn';

type Props = {
  totalPages: number;
  queryParams: GetTransactionParams;
  transactionData: any;
  setQueryParam: Dispatch<SetStateAction<GetTransactionParams>>;
};

const TableTransaction = ({
  totalPages,
  queryParams,
  transactionData,
  setQueryParam,
}: Props) => {
  const t = useTranslations('Pages.Account.transaction_history');
  const { openModal } = useModalStore((state) => state);
  const [dataPhoneCard, setDataPhoneCard] = useState<
    TransactionDataType | undefined
  >();

  const handleChangePage = (page: number) => {
    setQueryParam((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleOpenModalCard = (data: TransactionDataType) => {
    setDataPhoneCard(data);
    openModal(ModalIdEnum.PhoneCard);
  };

  const columns = [
    {
      id: 'id',
      title: t('table.id'),
      textAlign: TextAlignEnum.LEFT,
      renderCell: (data: TransactionDataType) => <IdColumn data={data} />,
    },
    {
      id: 'type',
      title: t('table.type'),
      textAlign: TextAlignEnum.LEFT,
      theadClassName:
        'pl-2 min-[1200px]:pl-4 max-[1350px]:!max-w-[90px] max-[1350px]:w-[90px] !max-w-[120px] w-[120px]',
      tdClassName:
        'pl-2 min-[1200px]:pl-4 max-[1350px]:!max-w-[90px] max-[1350px]:w-[90px] !max-w-[120px] w-[120px]',
      renderCell: (data: TransactionDataType) => <TypeColumn data={data} />,
    },
    {
      id: 'amount',
      title: t('table.amount'),
      textAlign: TextAlignEnum.RIGHT,
      renderCell: (data: TransactionDataType) => <AmountColumn data={data} />,
    },
    {
      id: 'bank_code',
      title: t('table.bank_code'),
      textAlign: TextAlignEnum.LEFT,
      renderCell: (data: TransactionDataType) => <BankCodeColumn data={data} />,
    },
    {
      id: 'method',
      title: t('table.method'),
      textAlign: TextAlignEnum.LEFT,
      renderCell: (data: TransactionDataType) => <MethodColumn data={data} />,
    },
    {
      id: 'bank_trancode',
      title: t('table.bank_trancode'),
      textAlign: TextAlignEnum.RIGHT,
      renderCell: (data: TransactionDataType) => (
        <BankTrancodeColumn data={data} openModalCard={handleOpenModalCard} />
      ),
    },
    {
      id: 'status',
      title: t('table.status'),
      textAlign: TextAlignEnum.RIGHT,
      renderCell: (data: TransactionDataType) => <StatusColumn data={data} />,
    },
  ];

  return (
    <div className="w-full h-full transaction-history lg:overflow-auto">
      <BaseTable
        columns={columns}
        data={transactionData}
        totalPages={totalPages}
        currentPage={queryParams.page}
        tableClassName="min-w-fit lg:min-w-full"
        emptyClassName="pb-[60px]"
        className={clsx('transaction-history-table')}
        containerClassName="lg:overflow-auto"
        onPageChange={handleChangePage}
      />
      <PhoneCardModal data={dataPhoneCard} />
    </div>
  );
};

export default TableTransaction;
