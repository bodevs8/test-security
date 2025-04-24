'use client';
import { ButtonVariantsEnum, ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import NotifyIcon from '@/public/images/empty/notify.webp';
import { useTranslations } from 'next-intl';

import ConfirmModal from './ConfirmModal';

type MaintainBankProps = {
  oldBank: string;
  newBank: string;
};

export default function MaintainBankModal({
  oldBank,
  newBank,
}: MaintainBankProps) {
  const t = useTranslations();
  const modalStore = useModalStore((state) => state);

  const handleConfirm = () => {
    modalStore.closeModal(ModalIdEnum.MaintainBank);
  };

  return (
    <ConfirmModal
      imageSrc={NotifyIcon}
      modalId={ModalIdEnum.MaintainBank}
      title={t('Modals.MaintainBank.title')}
      description={t('Modals.MaintainBank.description', {
        oldBank,
        newBank,
      })}
      descriptionClassName="!text-center"
      confirmText={t('Modals.MaintainBank.confirm')}
      confirmBtnVariant={ButtonVariantsEnum.Secondary}
      onConfirm={handleConfirm}
    />
  );
}
