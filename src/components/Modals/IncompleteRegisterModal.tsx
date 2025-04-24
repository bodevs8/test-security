import { ButtonVariantsEnum, ModalIdEnum, RouterPathEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import ConfirmModal from './ConfirmModal';

type IncompleteRegisterModalProps = {
  onCancel: () => void;
};

export const IncompleteRegisterModal = ({
  onCancel,
}: IncompleteRegisterModalProps) => {
  const t = useTranslations('Modals.IncompleteRegisterModal');
  const modalStore = useModalStore((state) => state);
  const router = useRouter();

  const handleContinue = () => {
    modalStore.closeModal(ModalIdEnum.IncompleteRegister);
    modalStore.openModal(ModalIdEnum.Register);
  };

  const handleCancel = () => {
    onCancel();
    router.push(RouterPathEnum.Home);
    modalStore.closeModal(ModalIdEnum.IncompleteRegister);
  };

  return (
    <ConfirmModal
      imageSrc="/images/modals/auth/cancel-register.webp"
      modalId={ModalIdEnum.IncompleteRegister}
      title={t('title')}
      titleClassName="!text-xl"
      confirmText={t('continue')}
      cancelText={t('cancel')}
      description={t('description')}
      description2={t('confirm_description')}
      confirmClassName="capitalize"
      cancelClassName="capitalize"
      confirmBtnVariant={ButtonVariantsEnum.Gray}
      cancelBtnVariant={ButtonVariantsEnum.Secondary}
      onConfirm={handleContinue}
      onCancel={handleCancel}
    />
  );
};

export default IncompleteRegisterModal;
