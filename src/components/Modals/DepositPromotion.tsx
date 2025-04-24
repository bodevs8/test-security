'use client';
import { ButtonVariantsEnum, ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import NotifyDepositIcon from '@/public/images/empty/notify.webp';
import { useTranslations } from 'next-intl';
import ConfirmModal from './ConfirmModal';

export default function DepositPromotionModal() {
  const t = useTranslations();
  const modalStore = useModalStore((state) => state);

  const handleConfirm = () => {
    modalStore.closeModal(ModalIdEnum.DepositPromotion);
    modalStore.openModal(ModalIdEnum.CancelPromotion);
  };

  const handleCancel = () => {
    modalStore.closeModal(ModalIdEnum.DepositPromotion);
  };

  return (
    <ConfirmModal
      imageSrc={NotifyDepositIcon}
      modalId={ModalIdEnum.DepositPromotion}
      title={t('Modals.DepositPromotion.title')}
      description={t('Modals.DepositPromotion.description')}
      confirmText={t('Modals.DepositPromotion.confirm')}
      cancelText={t('Modals.DepositPromotion.cancel')}
      confirmClassName="capitalize"
      cancelClassName="capitalize"
      confirmBtnVariant={ButtonVariantsEnum.Gray}
      cancelBtnVariant={ButtonVariantsEnum.Secondary}
      descriptionClassName="text-center"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}
