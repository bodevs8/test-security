'use client';
import type { UserData } from '@/types/auth';
import type { ApiResponseError } from '@/types/service';
import { ButtonVariantsEnum, ModalIdEnum, ResponseStatusEnum } from '@/enums';
import { useRefresh } from '@/hooks/account';
import { useModalStore, useUserStore } from '@/hooks/stores';
import { useToast } from '@/hooks/utils';
import PromotionIcon from '@/public/images/empty/notify.webp';
import { cancelPromotion } from '@/services/client';
import { useTranslations } from 'next-intl';
import ConfirmModal from './ConfirmModal';

type Props = {
  onSuccess?: () => void;
};

export default function CancelPromotionModal({ onSuccess }: Props) {
  const t = useTranslations();
  const { refetchUser } = useRefresh();
  const { success, error } = useToast();
  const modalStore = useModalStore((state) => state);
  const userStore = useUserStore((state) => state);

  const handleConfirm = async () => {
    try {
      const response = await cancelPromotion();
      if (response.status === ResponseStatusEnum.Ok) {
        const res = await refetchUser();
        modalStore.closeModal(ModalIdEnum.CancelPromotion);
        success(t('Toast.deposit.cancel_promotion_success'));
        onSuccess?.();
        res.data && userStore.setUser(res.data as UserData);
      }
    } catch (ex) {
      error((ex as ApiResponseError)?.message);
    }
  };

  const handleCancel = () => {
    modalStore.closeModal(ModalIdEnum.CancelPromotion);
  };

  return (
    <ConfirmModal
      imageSrc={PromotionIcon.src}
      modalId={ModalIdEnum.CancelPromotion}
      title={t('Modals.CancelPromotionModal.title')}
      description={t('Modals.CancelPromotionModal.description')}
      confirmText={t('Modals.CancelPromotionModal.confirm')}
      cancelText={t('Modals.CancelPromotionModal.skip')}
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
