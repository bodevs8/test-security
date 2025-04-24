'use client';
import { ButtonVariantsEnum, ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import NotificationGame from '@/public/images/modals/notification-game.webp';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import ConfirmModal from './ConfirmModal';

export default function ErrorApiModal() {
  const t = useTranslations();
  const modalStore = useModalStore((state) => state);

  const handleConfirm = () => {
    modalStore.closeModal(ModalIdEnum.ErrorApi);
  };

  const messgae = useMemo(() => {
    return (
      modalStore.modals[ModalIdEnum.ErrorApi]?.message ??
      t('Toast.common.error')
    );
  }, [modalStore.modals, t]);

  return (
    <ConfirmModal
      imageSrc={NotificationGame}
      modalId={ModalIdEnum.ErrorApi}
      title={t('Modals.ErrorApiModal.title')}
      description={messgae}
      confirmText={t('Modals.ErrorApiModal.confirm')}
      confirmBtnVariant={ButtonVariantsEnum.Secondary}
      descriptionClassName="text-center"
      onConfirm={handleConfirm}
    />
  );
}
