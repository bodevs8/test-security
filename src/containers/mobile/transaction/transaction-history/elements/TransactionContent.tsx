'use client';
import type { TransactionDataType } from '@/types/transaction';
import { Loading } from '@/components/Loading';
import PhoneCardModal from '@/components/Modals/PhoneCardModal';
import { Pagination } from '@/components/Pagination';
import { TransactionEmptyMobile } from '@/components/TransactionEmptyMobile';
import { ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import { useState } from 'react';
import { TransactionCard } from './TransactionCard';

type Props = {
  isPending: boolean;
  transactionData: TransactionDataType[];
  totalPages: number;
  queryParams: any;
  handleChangePage: (page: number) => void;
};

export const TransactionContent = ({
  isPending,
  transactionData,
  totalPages,
  queryParams,
  handleChangePage,
}: Props) => {
  const { openModal } = useModalStore((state) => state);
  const [dataPhoneCard, setDataPhoneCard] = useState<
    TransactionDataType | undefined
  >();

  const handleOpenModalCard = (data: TransactionDataType) => {
    setDataPhoneCard(data);
    openModal(ModalIdEnum.PhoneCard);
  };

  return (
    <>
      {isPending && (
        <div className="flex justify-center items-center h-full">
          <Loading />
        </div>
      )}
      {!isPending && transactionData?.length > 0 && (
        <div className="flex flex-col gap-4 mt-4 pb-[90px]">
          {transactionData?.map((item: TransactionDataType) => (
            <TransactionCard
              key={item.id}
              data={item}
              openModalCard={handleOpenModalCard}
            />
          ))}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={queryParams.page}
              onPageChange={handleChangePage}
            />
          )}
          <PhoneCardModal data={dataPhoneCard} />
        </div>
      )}
      {!isPending && transactionData?.length === 0 && (
        <TransactionEmptyMobile />
      )}
    </>
  );
};
