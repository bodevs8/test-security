import type { BetHistoryDataType } from '@/types/bet-history';
import { Loading } from '@/components/Loading';
import { Pagination } from '@/components/Pagination';
import { TransactionEmptyMobile } from '@/components/TransactionEmptyMobile';
import { BetHistoryCard } from './BetHistoryCard';

type Props = {
  isPending: boolean;
  betHistoryData: BetHistoryDataType[];
  totalPages: number;
  queryParams: any;
  handleChangePage: (page: number) => void;
};

export const BetHistoryContent = ({
  isPending,
  betHistoryData,
  totalPages,
  queryParams,
  handleChangePage,
}: Props) => {
  return (
    <>
      {isPending && (
        <div className="flex justify-center items-center h-full">
          <Loading />
        </div>
      )}
      {!isPending && betHistoryData?.length > 0 && (
        <div className="flex flex-col gap-4 mt-4 pb-[90px]">
          {betHistoryData?.map((item: BetHistoryDataType) => (
            <BetHistoryCard key={item.id} data={item} />
          ))}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={queryParams.page}
              onPageChange={handleChangePage}
            />
          )}
        </div>
      )}
      {!isPending && betHistoryData?.length === 0 && <TransactionEmptyMobile />}
    </>
  );
};
