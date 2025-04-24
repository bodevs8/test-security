import { useTranslations } from 'next-intl';

export const PromotionNote = () => {
  const t = useTranslations();
  return (
    <span className="flex flex-col promotion-note-bg rounded-[8px] p-4 gap-2">
      <span className="font-bold text-[4.103vw] md:text-sm xl:text-base leading-[140%] text-highlight relative mb-2 md:mb-0 uppercase">
        <i className="icon-warning text-[24px] absolute top-1/2 -translate-y-1/2 left-0" />
        <span className="ml-7">
          {t('Pages.Account.promotion_applied.note.title')}
        </span>
      </span>
      <span className="font-normal text-[3.077vw] md:text-xs leading-[140%] text-dark-700 ml-0 md:ml-2 ">
        {t('Pages.Account.promotion_applied.note.content')}
      </span>
    </span>
  );
};
