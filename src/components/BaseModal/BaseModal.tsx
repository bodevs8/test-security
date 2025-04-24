'use client';
import type { ModalIdEnum } from '@/enums';
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { ModalSizeEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import { clsx } from 'clsx';
import { useRef } from 'react';

type BaseModalProps = {
  modalId: ModalIdEnum;
  children: React.ReactNode;
  title?: string;
  isCloseByBackdrop?: boolean;
  hideTitle?: boolean;
  modalClassName?: string;
  showCloseBtn?: boolean;
  size?: ModalSizeEnum;
  onClose?: () => void;
};

const MODAL_SIZES: Record<ModalSizeEnum, string> = {
  [ModalSizeEnum.Small]: 'w-[432px]',
  [ModalSizeEnum.Medium]: 'w-[460px]',
  [ModalSizeEnum.Large]: 'w-[1480px]',
} as const;

const BaseModal = ({
  size = ModalSizeEnum.Medium,
  children,
  title,
  modalId,
  isCloseByBackdrop = false,
  modalClassName,
  hideTitle,
  showCloseBtn = true,
  onClose,
}: BaseModalProps) => {
  const modalStore = useModalStore((state) => state);
  const ContentRef = useRef<HTMLDivElement>(null);
  const TitleRef = useRef<HTMLHeadingElement>(null);

  const handleClose = () => {
    modalStore.closeModal(modalId);
    onClose?.();
  };

  return (
    <Dialog open={modalStore.isOpen(modalId)}>
      <DialogPortal>
        <DialogContent
          ref={ContentRef as React.RefObject<HTMLDivElement>}
          onClose={handleClose}
          className={clsx(
            'bg-white rounded-[12px] p-8 text-dark-200 outline-none max-[500px]:w-[100vw] overflow-y-auto overflow-x-hidden shadow-modal',
            MODAL_SIZES[size],
            modalClassName,
          )}
          onBackdropClick={() => isCloseByBackdrop && handleClose()}
          showCloseBtn={showCloseBtn}
        >
          {showCloseBtn && (
            <div
              onClick={handleClose}
              className="absolute top-2 right-2 cursor-pointer w-8 h-8 z-[2] bg-white border rounded flex justify-center items-center border-solid border-primary-light-200 group"
            >
              <i className="icon-close text-6 text-dark-200 !font-bold group-hover:text-green-neon-500"></i>
            </div>
          )}
          <DialogTitle
            ref={TitleRef as React.RefObject<HTMLHeadingElement>}
            className={clsx('text-[24px] font-bold', { hidden: hideTitle })}
          >
            {title}
          </DialogTitle>
          {children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
BaseModal.displayName = 'BaseModal';

export { BaseModal };
