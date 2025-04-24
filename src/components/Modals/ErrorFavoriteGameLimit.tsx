'use client';
import { ModalIdEnum, RouterPathEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import ConfirmModal from './ConfirmModal';

export default function ErrorFavoriteGameLimit() {
  const t = useTranslations();
  const modalStore = useModalStore((state) => state);

  const router = useRouter();

  const handleConfirm = () => {
    router.push(RouterPathEnum.Favorite);
    modalStore.closeModal(ModalIdEnum.ErrorFavoriteGameLimit);
  };

  return (
    <ConfirmModal
      imageSrc="/images/modals/notification.webp"
      modalId={ModalIdEnum.ErrorFavoriteGameLimit}
      title={t('Modals.ErrorFavoriteGameLimitModal.title')}
      description={t('Modals.ErrorFavoriteGameLimitModal.description')}
      confirmText={t('Modals.ErrorFavoriteGameLimitModal.confirm')}
      descriptionClassName="text-center"
      onConfirm={handleConfirm}
    />
  );
}
