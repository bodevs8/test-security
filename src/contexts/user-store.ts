'use client';
import type { UserStoreType } from '@/stores/user';
import { createContext } from 'react';

export const UserStoreContext = createContext<UserStoreType | undefined>(
  undefined,
);
