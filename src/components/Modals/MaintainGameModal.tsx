'use client';
import { ButtonVariantsEnum, ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import MaintainGame from '@/public/images/modals/maintain-game.webp';
import { useTranslations } from 'next-intl';
import ConfirmModal from './ConfirmModal';

export default function MaintainGameModal() {
  const t = useTranslations();
  const modalStore = useModalStore((state) => state);

  const handleConfirm = () => {
    modalStore.closeModal(ModalIdEnum.MaintainGame);
  };

  return (
    <ConfirmModal
      imageSrc={MaintainGame}
      modalId={ModalIdEnum.MaintainGame}
      title={t('Modals.MaintainGameModal.title')}
      description={t('Modals.MaintainGameModal.description')}
      confirmText={t('Modals.MaintainGameModal.confirm')}
      confirmBtnVariant={ButtonVariantsEnum.Secondary}
      onConfirm={handleConfirm}
      descriptionClassName="text-center !text-[14px] md:!text-base"
    />
  );
}
