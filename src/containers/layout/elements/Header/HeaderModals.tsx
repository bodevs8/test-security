'use client';

import type { UserData } from '@/types/auth';
import LoginModal from '@/components/Modals/LoginModal';
import { ModalIdEnum, PackageIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const RegisterModal = dynamic(
  () => import('@/components/Modals/RegisterModal'),
  { ssr: false },
);
const ForgotPasswordModal = dynamic(
  () => import('@/components/Modals/ForgotPasswordModal'),
  { ssr: false },
);
const LogoutModal = dynamic(() => import('@/components/Modals/LogoutModal'), {
  ssr: false,
});
const MaintainGameModal = dynamic(
  () => import('@/components/Modals/MaintainGameModal'),
  { ssr: false },
);
const UsePromotionModal = dynamic(
  () => import('@/components/Modals/UsePromotionModal'),
  { ssr: false },
);
const VerifyTelegramModal = dynamic(
  () => import('@/components/Modals/VerifyTelegramModal'),
  { ssr: false },
);

const MiniGame = dynamic(() => import('@/components/MiniGame'), { ssr: false });

const MiniGameDraggable = dynamic(
  () =>
    import('@/components/MiniGame/draggable').then(
      (mod) => mod.MiniGameDraggable,
    ),
  { ssr: false },
);

const DenyGameModal = dynamic(
  () => import('@/components/Modals/DenyGameModal'),
  { ssr: false },
);

const ErrorApiModal = dynamic(
  () => import('@/components/Modals/ErrorApiModal'),
  { ssr: false },
);

const ErrorFavoriteGameLimit = dynamic(
  () => import('@/components/Modals/ErrorFavoriteGameLimit'),
  { ssr: false },
);

type HeaderModalsProps = {
  user: UserData;
  isMobile?: boolean;
  isIpad?: boolean;
};

export const HeaderModals = ({ user, isMobile, isIpad }: HeaderModalsProps) => {
  const searchParams = useSearchParams();
  const { openModal } = useModalStore((state) => state);

  useEffect(() => {
    const modalId = searchParams.get('openModal') as string;
    if (Object.values(ModalIdEnum).includes(modalId as ModalIdEnum)) {
      openModal(modalId as ModalIdEnum);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      {user && (
        <>
          <LogoutModal />
          <VerifyTelegramModal />
          <UsePromotionModal />
          <ErrorFavoriteGameLimit />
          {user.package_id !== PackageIdEnum.Welcome && (
            <MiniGame isMobile={isMobile || isIpad} user={user} />
          )}
          {user.package_id === PackageIdEnum.Welcome && (
            <MiniGameDraggable isMobile={isMobile || isIpad} user={user} />
          )}
        </>
      )}
      {!user && (
        <>
          <ForgotPasswordModal />
          <RegisterModal />
          <LoginModal />
          <MiniGameDraggable isMobile={isMobile || isIpad} user={user} />
        </>
      )}
      <MaintainGameModal />
      <DenyGameModal />
      <ErrorApiModal />
    </>
  );
};
