import ConfirmModal from '@/components/Modals/ConfirmModal';
import {
  ButtonVariantsEnum,
  ModalIdEnum,
  QueryKeyEnum,
  ResponseStatusEnum,
  RouterPathEnum,
} from '@/enums';
import { useUserAuthSync } from '@/hooks/account/use-user-auth-sync';
import { useModalStore, useUserStore } from '@/hooks/stores';
import { useCountdownOtpEmail, useToast } from '@/hooks/utils';
import { clearCookies, logoutRequest } from '@/services/client';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

const LogoutModal = () => {
  const t = useTranslations();
  const modalStore = useModalStore((state) => state);
  const { clearUser, setIsLoggedIn } = useUserStore((state) => state);
  const { clearCountdown } = useCountdownOtpEmail();
  const { success, error } = useToast();
  const queryClient = useQueryClient();
  const userStore = useUserStore((state) => state);
  const { setAuthStatus } = useUserAuthSync();

  const handleConfirmLogout = async () => {
    const res = await logoutRequest();
    queryClient.cancelQueries({
      queryKey: [
        QueryKeyEnum.UserData,
        QueryKeyEnum.RefreshUserInfo,
        userStore.user?.id,
      ],
    });
    if (res.status === ResponseStatusEnum.Ok) {
      setAuthStatus();
      await clearCookies();
      setIsLoggedIn(false);
      clearUser();
      clearCountdown();
      success(t('Toast.logout.success'));
      queryClient.clear();
      modalStore.closeModal(ModalIdEnum.Logout);
      setTimeout(() => {
        window.location.href = RouterPathEnum.Home;
      }, 1000);
    } else {
      error(res.message || t('Toast.logout.error'));
    }
  };

  const handleCancel = () => {
    modalStore.closeModal(ModalIdEnum.Logout);
  };

  return (
    <ConfirmModal
      imageSrc="/images/modals/logout.webp"
      modalId={ModalIdEnum.Logout}
      title={t('Modals.LogoutModal.title')}
      description={t('Modals.LogoutModal.description')}
      confirmText={t('Modals.LogoutModal.confirm')}
      cancelText={t('Modals.LogoutModal.cancel')}
      confirmClassName="capitalize"
      cancelClassName="capitalize"
      onConfirm={handleConfirmLogout}
      onCancel={handleCancel}
      confirmBtnVariant={ButtonVariantsEnum.Gray}
      cancelBtnVariant={ButtonVariantsEnum.Secondary}
    />
  );
};

export default LogoutModal;
