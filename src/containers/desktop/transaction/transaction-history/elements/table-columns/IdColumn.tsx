import type { TransactionDataType } from '@/types/transaction';
import { createTimeHistory } from '@/utils/date';

const IdColumn = ({ data }: { data: TransactionDataType }) => {
  const formatedCreatedTime = createTimeHistory(data.created_time);

  return (
    <div className="flex flex-col gap-1 min-w-[124px] w-[124px]">
      <div className="text-dark-700 font-medium text-[14px] leading-[140%]">
        #{data.id}
      </div>
      <div className="text-dark-200 text-[12px] leading-[140%] font-medium">
        {formatedCreatedTime}
      </div>
    </div>
  );
};

export default IdColumn;
