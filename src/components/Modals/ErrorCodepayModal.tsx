'use client';
import { ButtonVariantsEnum, ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import { useTranslations } from 'next-intl';
import ConfirmModal from './ConfirmModal';

export default function ErrorCodepayModal() {
  const t = useTranslations('Modals.ErrorCodepayModal');
  const modalStore = useModalStore((state) => state);

  const handleConfirm = () => {
    modalStore.closeModal(ModalIdEnum.ErrorCodepay);
  };

  return (
    <ConfirmModal
      modalId={ModalIdEnum.ErrorCodepay}
      title={t('title')}
      description={t('description')}
      confirmText={t('confirm')}
      onConfirm={handleConfirm}
      confirmBtnVariant={ButtonVariantsEnum.Secondary}
      confirmClassName="capitalize"
    />
  );
}
