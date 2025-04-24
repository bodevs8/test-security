import { useTranslations } from 'next-intl';

export const LuckyBonus = () => {
  const t = useTranslations('Pages.VipClub.member_banner');
  return (
    <div className="flex flex-col justify-center max-w-[65.128vw] mt-[4.359vw] md:max-w-[507px]">
      <div className="vip-label-bg pl-[1.979vw] flex justify-start h-[8.718vw] max-h-[68px] items-center max-w-[59.231vw]">
        <p className="text-[3.59vw] md:text-[28px] leading-[140%] font-extrabold uppercase text-lucky-bonus italic">
          {t('highest_vip_title')}
        </p>
      </div>
      <div className="vip-title-bg flex justify-end h-[7.179vw] max-h-[56px] items-center pr-[1.875vw] w-full">
        <p className="text-lucky-bonus w-full md:text-[20px] text-[2.564vw] leading-[140%] font-extrabold uppercase title-brand italic whitespace-nowrap">
          {t('highest_vip_content')}
        </p>
      </div>
    </div>
  );
};
