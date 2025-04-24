import type { ModalIdEnum } from '@/enums';
import { createStore } from 'zustand/vanilla';

type ModalStore = {
  isOpen: (ref: ModalIdEnum) => boolean | undefined;
  modals: {
    [key: string]: {
      open: boolean;
      message?: string;
    };
  };
};

export type ModalStoreType = ReturnType<typeof createModalStore>;

export type ModalStoreWithActions = ModalStore & {
  openModal: (key: ModalIdEnum, keepOpen?: boolean, message?: string) => void;
  closeModal: (key: ModalIdEnum) => void;
  closeAllModals: () => void;
  isOpen: (key: ModalIdEnum) => boolean | undefined;
};

export const createModalStore = () => {
  return createStore<ModalStoreWithActions>()((set, get) => ({
    modals: {},
    openModal: (
      key: ModalIdEnum,
      keepOpen: boolean = false,
      message?: string,
    ) => {
      set((state) => ({
        modals: {
          ...(keepOpen && state.modals),
          [key]: { open: true, message },
        },
      }));
    },
    closeModal: (key: ModalIdEnum) => {
      set((state) => ({
        modals: {
          ...state.modals,
          [key]: { open: false },
        },
      }));
    },
    closeAllModals: () => {
      set(() => ({
        modals: {},
      }));
    },
    isOpen: (key: ModalIdEnum): boolean | undefined => {
      return get().modals[key]?.open;
    },
  }));
};
