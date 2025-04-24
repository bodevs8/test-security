'use client';
import { ButtonVariantsEnum, DepositMethodEnum, ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import ConfirmModal from './ConfirmModal';

type CancelDepositModalProps = {
  onCancel?: () => void;
  ticket: string | number;
  method: DepositMethodEnum;
};

export const CancelDepositModal = ({
  onCancel,
  ticket,
  method,
}: CancelDepositModalProps) => {
  const t = useTranslations('Modals.CancelDepositModal');
  const modalStore = useModalStore((state) => state);

  const handleConfirm = () => {
    modalStore.closeModal(ModalIdEnum.CancelDeposit);
    onCancel?.();
  };

  const showFlexPayDescription = useMemo(() => {
    return [DepositMethodEnum.FLEXPAY, DepositMethodEnum.EWALLET].includes(
      method,
    );
  }, [method]);

  return (
    <ConfirmModal
      modalId={ModalIdEnum.CancelDeposit}
      title={t('title')}
      confirmText={t('confirm')}
      cancelText={t('cancel')}
      onConfirm={handleConfirm}
      onCancel={() => modalStore.closeModal(ModalIdEnum.CancelDeposit)}
      titleClassName="!text-dark-700"
      confirmBtnVariant={ButtonVariantsEnum.Gray}
      cancelBtnVariant={ButtonVariantsEnum.Default}
      confirmClassName="!text-dark-700 font-medium !capitalize"
      cancelClassName="font-medium !capitalize !bg-yellow-500 !text-dark-700"
    >
      <div className="text-[14px] leading-5 text-dark-200">
        {DepositMethodEnum.CODEPAY === method && (
          <>
            <span>{t('ticket')}</span>
            <span className="text-green-400">&nbsp;#{ticket}&nbsp;</span>
            <span>{t('description_codepay')}</span>
          </>
        )}
        {showFlexPayDescription && (
          <div className="whitespace-pre-wrap text-center font-normal">
            {t('description_flexpay')}
          </div>
        )}
      </div>
    </ConfirmModal>
  );
};
