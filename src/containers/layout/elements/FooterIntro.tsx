import { Logo } from '@/components/Logo';
import { useTranslations } from 'next-intl';

export const FooterIntro = () => {
  const t = useTranslations('Pages.Footer');
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

  return (
    <div className="flex flex-col items-start justify-start gap-5 max-w-[333px]">
      <Logo priority={false} />
      <div className="text-sm font-normal leading-5 text-white">
        {t('title', { brandName })}
      </div>
    </div>
  );
};
