import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export const useToast = () => {
  const t = useTranslations();

  const success = (message: string) => {
    toast.success(message);
  };

  const error = (message: string) => {
    toast.error(message || t('Common.message.error'));
  };

  return {
    success,
    error,
  };
};
