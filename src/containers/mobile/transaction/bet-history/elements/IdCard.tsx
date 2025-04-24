import type { BetHistoryDataType } from '@/types/bet-history';
import { createTimeHistory } from '@/utils/date';
import { useTranslations } from 'next-intl';

type Props = {
  data: BetHistoryDataType;
};

export const IdCard = ({ data }: Props) => {
  const t = useTranslations();
  const formatedCreatedTime = createTimeHistory(data.created_time);

  return (
    <div className="flex items-center gap-2">
      <span className="text-dark-200 text-[12px] leading-[140%]">
        {t('Pages.Account.bet_history.table.id_mobile')}
      </span>
      <span className="text-dark-700 text-[12px] leading-[140%] font-medium">
        #{data.id}
      </span>
      <span className="text-dark-200 text-[12px] leading-[140%]">
        {formatedCreatedTime}
      </span>
    </div>
  );
};
