'use client';
import { CustomDrawer } from '@/components/CustomDrawer';
import { Loading } from '@/components/Loading';
import { TopDrawer } from '@/components/TopDrawer';
import { ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import { useDevice } from '@/hooks/utils';
import dynamic from 'next/dynamic';
import { useEffect, useMemo } from 'react';

const SearchContainer = dynamic(() => import('./elements/SearchContainer'), {
  ssr: false,
  loading: () => <Loading />,
});

const SearchModal = () => {
  const modalStore = useModalStore((state) => state);
  const { isMobile } = useDevice();

  const isOpenModal = useMemo(() => {
    return modalStore.isOpen(ModalIdEnum.Search);
  }, [modalStore]);

  const handleClose = () => {
    modalStore.closeModal(ModalIdEnum.Search);
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpenModal]);

  if (isMobile) {
    return (
      <CustomDrawer open={isOpenModal!} handleOpen={handleClose}>
        <SearchContainer onClose={handleClose} isMobile={isMobile} />
      </CustomDrawer>
    );
  }

  return (
    <TopDrawer
      open={isOpenModal!}
      onClose={handleClose}
      className="top-[96px] x-container !p-8 container-full"
      overlayClassName="top-[96px]"
      isShowButtonClose={false}
    >
      <SearchContainer onClose={handleClose} isMobile={isMobile} />
    </TopDrawer>
  );
};

export default SearchModal;
