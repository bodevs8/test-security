import type { TransactionDataType } from '@/types/transaction';
import { HistoryMethodsEnum } from '@/enums';
import { replaceMethod } from '@/utils/transaction';
import { useTranslations } from 'next-intl';

const MethodColumn = ({ data }: { data: TransactionDataType }) => {
  const t = useTranslations('Pages.Account.transaction_history');
  const methodKey = replaceMethod(data.method);
  const methodLocales = methodKey ? t(`method.${methodKey}`) : '';

  return (
    <div className="text-dark-700 text-[14px] leading-[140%] font-medium">
      {HistoryMethodsEnum.SYSTEM.includes(data.method) || !data.method_txt
        ? methodLocales.replace('Pages.Account.transaction_history.method.', '')
        : data.method_txt}
    </div>
  );
};

export default MethodColumn;
