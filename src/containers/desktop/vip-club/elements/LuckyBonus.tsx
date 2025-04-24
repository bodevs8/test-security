import { useTranslations } from 'next-intl';

export const LuckyBonus = () => {
  const t = useTranslations('Pages.VipClub.member_banner');
  return (
    <div className="flex flex-col items-center justify-center max-w-[27.448vw] 3xl:max-w-[527px]">
      <div className="vip-label-bg pl-[1.979vw] flex justify-start h-[5.26vw] items-center max-w-[26.615vw] 3xl:max-w-[511px] 3xl:pl-[38px] max-h-[101px]">
        <p className="text-[1.875vw] 3xl:text-[36px] leading-[140%] font-extrabold uppercase text-lucky-bonus italic">
          {t('highest_vip_title')}
        </p>
      </div>
      <div className="vip-title-bg flex justify-end h-[4.115vw] max-h-[79px] items-center pr-[1.875vw] 3xl:pr-[36px] w-full">
        <p className="text-lucky-bonus w-full text-[1.042vw] 3xl:text-[20px] leading-[140%] font-extrabold uppercase title-brand italic whitespace-nowrap">
          {t('highest_vip_content')}
        </p>
      </div>
    </div>
  );
};
