import { Loading } from '@/components/Loading';
import { TopDrawer } from '@/components/TopDrawer';
import { ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import { useDevice } from '@/hooks/utils';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const GateGamesContainer = dynamic(() => import('./GateGamesContainer'), {
  ssr: false,
  loading: () => <Loading />,
});

type Props = {
  drawerClassName?: string;
};

const GateGames = ({ drawerClassName }: Props) => {
  const t = useTranslations();
  const { isIOS } = useDevice();

  const modalStore = useModalStore((state) => state);

  const isOpenGateGames = useMemo(() => {
    return modalStore.isOpen(ModalIdEnum.GateGames);
  }, [modalStore]);

  const handleOpenGateGames = (isOpen: boolean) => {
    if (isOpen) {
      modalStore.openModal(ModalIdEnum.GateGames);
    } else {
      modalStore.closeModal(ModalIdEnum.GateGames);
    }
  };

  return (
    <TopDrawer
      open={isOpenGateGames!}
      onClose={() => handleOpenGateGames(false)}
      className={clsx(
        'bottom-[54px] !mt-0 !bg-primary-light-0 !rounded-0 !px-0 !top-[unset] !pt-6',
        {
          '!max-h-[calc(100vh-54px)]': !isIOS,
          '!max-h-[calc(100dvh-54px)]': isIOS,
        },
        drawerClassName,
      )}
      overlayClassName="z-[99] bottom-[64px]"
      isShowButtonClose={false}
      isShowTopDrawerIcon
    >
      <div className="text-center text-[16px] font-bold text-dark-700 uppercase">
        {t('Common.menu.category')}
      </div>
      <GateGamesContainer setOpen={handleOpenGateGames} />
    </TopDrawer>
  );
};

export default GateGames;
