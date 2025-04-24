import { useTranslations } from 'next-intl';

type InviteSectionProps = {
  vipLevel?: number | null;
};

export const InviteSection = ({ vipLevel }: InviteSectionProps) => {
  const t = useTranslations('Pages.VipClub');
  const nextLevel = vipLevel ?? 0 + 1;
  return (
    <div className="mb-[2px] max-w-[64.872vw] md:max-w-[450px]">
      <p className="text-[4.103vw] leading-[140%] text-white font-medium md:text-[28px]">
        {t('invite_section.content')}
        <span className="text-white font-bold invite-title-highlight ml-1">
          {t('invite_section.content_highlight', { level: nextLevel })}
        </span>
      </p>
    </div>
  );
};
