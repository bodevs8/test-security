import { useLiveChat } from '@/hooks/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const TelegramSupportInfo = () => {
  const t = useTranslations();
  const { openLiveChat } = useLiveChat();

  return (
    <ul className="list-disc pl-6 py-4 rounded-[8px] text-xs leading-[140%] text-dark-700 bg-[linear-gradient(0deg,#F9FAFB_0%,#FFF5DC_100%)]">
      <li className="mb-2">
        {t('Modals.ForgotPasswordModal.telegram_support')}
      </li>
      <li>
        {t('Modals.ForgotPasswordModal.telegram_contact_1')}{' '}
        <Link
          href={String(process.env.NEXT_PUBLIC_GET_CODE_TELEGRAM_LINK)}
          className="text-yellow-400"
          target="_blank"
        >
          {t('Modals.ForgotPasswordModal.telegram_bot')}
        </Link>{' '}
        {t('Modals.ForgotPasswordModal.telegram_contact_2')}{' '}
        <span className="text-yellow-400 cursor-pointer" onClick={openLiveChat}>
          {t('Modals.ForgotPasswordModal.support')}
        </span>
        <br />
        {t('Modals.ForgotPasswordModal.telegram_contact_3')}
      </li>
    </ul>
  );
};

export default TelegramSupportInfo;
