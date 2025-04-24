import type { TransactionDataType } from '@/types/transaction';
import { getTypeTransaction } from '@/utils/transaction';
import { useTranslations } from 'next-intl';

const TypeColumn = ({ data }: { data: TransactionDataType }) => {
  const t = useTranslations('Pages.Account.transaction_history');
  const typeKeyLocales = getTypeTransaction(data);

  return (
    <div className="text-dark-700 text-[14px] leading-[140%] font-medium">
      {t(typeKeyLocales)}
    </div>
  );
};

export default TypeColumn;
