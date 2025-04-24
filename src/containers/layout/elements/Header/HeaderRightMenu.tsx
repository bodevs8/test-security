'use client';
import type { UserData } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { ButtonSizeEnum, ButtonVariantsEnum, ModalIdEnum } from '@/enums';
import { useModalStore, useUserStore } from '@/hooks/stores';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { LoggedIn } from '../LoggedIn';

type HeaderRightMenuProps = {
  user?: UserData;
  isMobile?: boolean;
};

export const HeaderRightMenu = ({ user, isMobile }: HeaderRightMenuProps) => {
  const { openModal } = useModalStore((state) => state);
  const { isLoggedIn } = useUserStore((state) => state);

  if (isLoggedIn || user) {
    return <LoggedIn serverUser={user} isMobile={isMobile} />;
  }

  const SearchModal = dynamic(
    () => import('@/components/Modals/SearchModal/SearchModal'),
    {
      ssr: false,
    },
  );

  return (
    <div className="flex items-center gap-1 lg:gap-2 right-header-menu">
      <SearchModal />
      <Button
        id="login-button"
        name="login-button"
        className={clsx({
          'w-[96px] lg:w-[114px]': !isMobile,
          'w-[94px] !h-[32px]': isMobile,
        })}
        size={ButtonSizeEnum.LG}
        onClick={() => openModal(ModalIdEnum.Login)}
      >
        Đăng nhập
      </Button>
      <Button
        id="register-button"
        name="register-button"
        className={clsx({
          'max-[375px]:w-[80px] w-[96px] lg:w-[114px]': !isMobile,
          'w-[94px] !h-[32px]': isMobile,
        })}
        size={ButtonSizeEnum.LG}
        variant={ButtonVariantsEnum.Secondary}
        onClick={() => openModal(ModalIdEnum.Register)}
      >
        Đăng ký
      </Button>
    </div>
  );
};
