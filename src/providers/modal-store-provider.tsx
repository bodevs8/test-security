'use client';

import type { ModalStoreType } from '@/stores/modal';
import type { ReactNode } from 'react';
import { ModalStoreContext } from '@/contexts/modal-store';
import { createModalStore } from '@/stores/modal';
import { useRef } from 'react';

export const ModalStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<ModalStoreType>(createModalStore());
  if (!storeRef.current) {
    storeRef.current = createModalStore();
  }

  return (
    <ModalStoreContext value={storeRef.current}>{children}</ModalStoreContext>
  );
};
