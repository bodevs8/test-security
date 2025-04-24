'use client';
import { ButtonVariantsEnum, ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import NotificationGame from '@/public/images/modals/notification-game.webp';
import { useTranslations } from 'next-intl';
import ConfirmModal from './ConfirmModal';

export default function UsePromotionModal() {
  const t = useTranslations();
  const modalStore = useModalStore((state) => state);

  const handleConfirm = () => {
    modalStore.closeModal(ModalIdEnum.UsePromotion);
  };

  return (
    <ConfirmModal
      imageSrc={NotificationGame}
      modalId={ModalIdEnum.UsePromotion}
      title={t('Modals.UsePromotionModal.title')}
      description={t('Modals.UsePromotionModal.description')}
      description2={t('Modals.UsePromotionModal.description_2')}
      confirmText={t('Modals.UsePromotionModal.confirm')}
      confirmBtnVariant={ButtonVariantsEnum.Secondary}
      onConfirm={handleConfirm}
    />
  );
}
