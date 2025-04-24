'use client';
import type { ModalIdEnum } from '@/enums';
import type { StaticImageData } from 'next/image';
import { BaseModal } from '@/components/BaseModal/BaseModal';
import { Button } from '@/components/ui/button';
import { ButtonSizeEnum, ButtonVariantsEnum } from '@/enums';
import clsx from 'clsx';
import Image from 'next/image';
import { useTransition } from 'react';

type Props = {
  title?: string;
  description?: React.ReactNode;
  description2?: React.ReactNode;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => void;
  modalId: ModalIdEnum;
  imageSrc?: string | StaticImageData;
  className?: string;
  children?: React.ReactNode;
  descriptionClassName?: string;
  description2Classname?: string;
  confirmClassName?: string;
  titleClassName?: string;
  cancelClassName?: string;
  cancelBtnVariant?: ButtonVariantsEnum;
  confirmBtnVariant?: ButtonVariantsEnum;
};

const ConfirmModal = ({
  title,
  description,
  description2,
  confirmText,
  imageSrc = '/images/modals/warning.webp',
  cancelText,
  onConfirm,
  onCancel,
  modalId,
  className,
  children,
  descriptionClassName,
  description2Classname,
  confirmClassName,
  titleClassName,
  cancelClassName,
  cancelBtnVariant = ButtonVariantsEnum.Gray,
  confirmBtnVariant = ButtonVariantsEnum.Default,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = async () => {
    startTransition(async () => {
      await onConfirm();
    });
  };

  return (
    <BaseModal
      modalId={modalId}
      modalClassName={clsx(
        'max-w-[calc(100%-19.8px)] md:max-w-[432px] bg-white shadow-[0px_2px_12px_0px_#07197212]',
        'fixed top-1/2 left-1/2 transform -custom-translate-x-1/2 -custom-translate-y-1/2',
        className,
      )}
      onClose={onCancel}
    >
      <div className="flex flex-col -mt-4.5">
        <div className="flex justify-center items-center mb-5 lg:mb-6">
          <Image
            src={imageSrc}
            alt="Confirm Modal"
            width={120}
            height={120}
            className="!object-contain max-h-[120px] h-[20.513vh]"
          />
        </div>
        <h3
          className={clsx(
            'title text-dark-700 text-2xl font-bold text-center uppercase mb-1 leading-8.5 ',
            titleClassName,
          )}
        >
          {title}
        </h3>
        <div className="flex flex-col justify-center items-center font-normal text-sm whitespace-pre-line text-dark-200 leading-[140%] mb-6">
          <p
            className={clsx(
              'text-base whitespace-pre-line',
              descriptionClassName,
            )}
          >
            {description}
          </p>
          {description2 && (
            <p
              className={clsx(
                'text-base whitespace-pre-line',
                description2Classname,
              )}
            >
              {description2}
            </p>
          )}
          {children}
        </div>
        <div
          className={clsx('action-btns gap-[14px]', {
            'grid grid-cols-2': !!onCancel,
          })}
        >
          <Button
            id={`${modalId}-confirm`}
            name={`${modalId}-confirm`}
            className={clsx('w-full !box-border', confirmClassName)}
            size={ButtonSizeEnum.LG}
            onClick={handleConfirm}
            isLoading={isPending}
            disabled={isPending}
            variant={confirmBtnVariant}
          >
            {confirmText}
          </Button>
          {onCancel && (
            <Button
              id={`${modalId}-cancel`}
              name={`${modalId}-cancel`}
              className={clsx('w-full !box-border', cancelClassName)}
              size={ButtonSizeEnum.LG}
              variant={cancelBtnVariant}
              onClick={onCancel}
            >
              {cancelText}
            </Button>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
