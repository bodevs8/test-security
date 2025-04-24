import { useTranslations } from 'next-intl';

export const VipTerms = () => {
  const t = useTranslations('Pages.VipClub');
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

  const terms = [
    t('terms.term_1'),
    t('terms.term_2'),
    t('terms.term_3'),
    t('terms.term_4'),
    t('terms.term_5'),
    t('terms.term_6'),
    t('terms.term_7'),
    t('terms.term_8', { brandName }),
  ];

  return (
    <div className="bg-primary-light-50 p-3 rounded-[8px]">
      <ul className="space-y-2">
        {terms.map((term, index) => (
          <li
            key={`term-${index}`}
            className="text-dark-700 text-sm font-normal leading-[140%]"
          >
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
};
