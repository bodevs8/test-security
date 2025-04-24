'use client';

import { Button } from '@/components/ui/button';
import { ButtonVariantsEnum, ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';

export const HeaderSearch = () => {
  const { openModal, isOpen, closeModal } = useModalStore((state) => state);

  const handleFocusSearch = () => {
    if (isOpen(ModalIdEnum.Search)) {
      closeModal(ModalIdEnum.Search);
    } else {
      openModal(ModalIdEnum.Search);
    }
  };

  return (
    <Button
      name="search-button"
      id="search-button"
      variant={ButtonVariantsEnum.Outline}
      onClick={handleFocusSearch}
      className="size-[32px] md:size-[40px] text-icon-primary !border-primary-light-200"
    >
      <i className="icon-search md:!text-2xl !text-[15px]" />
    </Button>
  );
};
