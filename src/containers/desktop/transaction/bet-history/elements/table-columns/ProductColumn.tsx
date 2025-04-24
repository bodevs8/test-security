import type { BetHistoryDataType } from '@/types/bet-history';

const ProductColumn = ({ data }: { data: BetHistoryDataType }) => {
  return (
    <div className="pl-3 min-[1200px]:pl-4 text-left min-w-[90px] max-w-[90px] min-[1200px]:min-w-[124px] min-[1200px]:max-w-[200px] w-full whitespace-nowrap text-ellipsis overflow-hidden text-[14px] font-medium">
      {data.product}
    </div>
  );
};

export default ProductColumn;
