import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const TransactionEmptyMobile = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-100px-52px-76px)]">
      <Image
        src="/images/empty/default.webp"
        alt="empty"
        width={120}
        height={120}
      />
      <span className="text-dark-200 text-[14px] leading-5 font-medium mt-4">
        {t('Common.empty.default')}
      </span>
    </div>
  );
};
