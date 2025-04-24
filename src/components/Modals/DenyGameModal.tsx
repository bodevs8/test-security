'use client';
import { ButtonVariantsEnum, ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import NotificationGame from '@/public/images/modals/notification-game.webp';
import { useTranslations } from 'next-intl';
import ConfirmModal from './ConfirmModal';

export default function DenyGameModal() {
  const t = useTranslations();
  const modalStore = useModalStore((state) => state);

  const handleConfirm = () => {
    modalStore.closeModal(ModalIdEnum.DenyGame);
  };

  return (
    <ConfirmModal
      imageSrc={NotificationGame}
      modalId={ModalIdEnum.DenyGame}
      title={t('Modals.DenyGameModal.title')}
      description={t('Modals.DenyGameModal.description')}
      description2={t('Modals.DenyGameModal.description_2')}
      confirmText={t('Modals.DenyGameModal.confirm')}
      confirmBtnVariant={ButtonVariantsEnum.Secondary}
      onConfirm={handleConfirm}
    />
  );
}
