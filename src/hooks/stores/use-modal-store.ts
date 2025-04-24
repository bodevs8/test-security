'use client';
import type { ModalStoreWithActions } from '@/stores/modal';
import { ModalStoreContext } from '@/contexts/modal-store';
import { use } from 'react';
import { useStore } from 'zustand';

export const useModalStore = <T>(
  selector: (store: ModalStoreWithActions) => T,
): T => {
  const modalStoreContext = use(ModalStoreContext);

  if (!modalStoreContext) {
    throw new Error(`useModalStore must be used within ModalStoreProvider`);
  }

  return useStore(modalStoreContext, selector);
};
