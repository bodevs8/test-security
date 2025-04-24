import { useTranslations } from 'next-intl';
import Image from 'next/image';

type InviteSectionProps = {
  vipLevel?: number | null;
};

export const InviteSection = ({ vipLevel }: InviteSectionProps) => {
  const t = useTranslations('Pages.VipClub');
  const nextLevel = vipLevel ?? 0 + 1;
  return (
    <div className="invite-section relative w-[27.969vw] h-[15.521vw] -mt-[2.708vw] max-w-[537px] max-h-[298px] 3xl:-mt-[52px]">
      <Image
        src={`/images/vip-club/letter-vip-${vipLevel}.webp`}
        alt="Invite Section"
        width={537}
        height={298}
        className="w-full h-full object-cover aspect-[537/298] absolute top-0 left-0"
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center flex-col text-center pt-[3.667vw] px-[2.083vw] justify-between pb-[1.563vw] 3xl:pt-[70px] 3xl:px-[40px] 3xl:pb-[30px]">
        <p className="text-[1.354vw] 3xl:text-[26px] leading-[140%] invite-title font-extrabold uppercase whitespace-pre-line">
          {t('invite_section.title')}
        </p>
        <p className="text-[1.25vw] 3xl:text-[24px] leading-[140%] text-white font-normal text-center">
          {t('invite_section.content')}
          <span className="text-white font-bold invite-title-highlight ml-1">
            {t('invite_section.content_highlight', { level: nextLevel })}
          </span>
        </p>
      </div>
    </div>
  );
};
