import type { ModalIdEnum } from '@/enums';
import { BaseModal } from '@/components/BaseModal';
import { ModalSizeEnum, RouterPathEnum } from '@/enums';
import { useDevice } from '@/hooks/utils';
import BgImageMobile from '@/public/images/modals/auth/bg-mobile.webp';
import BgImage from '@/public/images/modals/auth/bg.webp';
import LOGO from '@/public/images/modals/auth/logo.svg';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type AuthModalProps = {
  modalId: ModalIdEnum;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
  modalClassName?: string;
  wrapContentClassName?: string;
  wrapChildrenClassName?: string;
};

export const AuthModal = ({
  modalId,
  children,
  modalClassName,
  onClose,
  wrapContentClassName,
  wrapChildrenClassName,
}: AuthModalProps) => {
  const { isMobile } = useDevice();

  return (
    <BaseModal
      size={ModalSizeEnum.Medium}
      modalId={modalId}
      modalClassName={clsx(
        'auth-modal !p-0 block h-full md:max-h-max rounded-[16px]',
        modalClassName,
      )}
      onClose={onClose}
    >
      <div className={clsx('relative', wrapContentClassName)}>
        <Image
          className={clsx(
            'block h-auto w-full',
            isMobile && '!h-[122px] sm:!h-[150px]',
          )}
          src={isMobile ? BgImageMobile : BgImage}
          width={460}
          height={120}
          alt="bg"
        />
        <Link
          prefetch={false}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          href={RouterPathEnum.Home}
        >
          <Image
            className={clsx('block h-[42px] w-auto', isMobile && 'ml-8 mt-4')}
            src={LOGO}
            width={125}
            height={42}
            alt="Logo"
          />
        </Link>
      </div>
      <div className={clsx('p-6 md:p-8 md:pt-6', wrapChildrenClassName)}>
        {children}
      </div>
    </BaseModal>
  );
};
