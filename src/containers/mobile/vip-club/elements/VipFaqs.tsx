import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import PlusIcon from '@/public/images/account/withdraw/plus.webp';
import SubIcon from '@/public/images/account/withdraw/sub.webp';

import { useTranslations } from 'next-intl';

export const VipFaqs = ({
  onChange,
}: {
  onChange: (value: string) => void;
}) => {
  const t = useTranslations('Pages.VipClub');
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

  const faqs = [
    {
      id: 'faq_1',
      title: t('faqs.faq_1.title', { brandName }),
      content: t('faqs.faq_1.content'),
    },
    {
      id: 'faq_2',
      title: t('faqs.faq_2.title'),
      content: t('faqs.faq_2.content'),
    },
    {
      id: 'faq_3',
      title: t('faqs.faq_3.title'),
      content: t('faqs.faq_3.content'),
    },
    {
      id: 'faq_4',
      title: t('faqs.faq_4.title'),
      content: t('faqs.faq_4.content'),
    },
    {
      id: 'faq_5',
      title: t('faqs.faq_5.title'),
      content: t('faqs.faq_5.content'),
    },
    {
      id: 'faq_6',
      title: t('faqs.faq_6.title'),
      content: t('faqs.faq_6.content', { brandName }),
    },
  ];

  return (
    <div className="faqs-container-mb">
      <Accordion
        type="single"
        collapsible
        className="space-y-2"
        onChange={(value) => {
          onChange(value);
        }}
      >
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            id={faq.id}
            className="mb-2 accordion-item bg-primary-light-50 border-[1px] border-primary-light-200 rounded-[6px]"
          >
            <AccordionTrigger
              className="text-dark-700 text-sm font-bold leading-[140%] uppercase bg-transparent"
              plusIcon={PlusIcon}
              subIcon={SubIcon}
            >
              {faq.title}
            </AccordionTrigger>
            <AccordionContent className="text-dark-200 text-sm font-normal leading-[140%] !px-4 pb-4 bg-transparent">
              {faq.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
