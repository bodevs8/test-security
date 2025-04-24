'use client';
import type { ModalStoreType } from '@/stores/modal';
import { createContext } from 'react';

export const ModalStoreContext = createContext<ModalStoreType | undefined>(
  undefined,
);
