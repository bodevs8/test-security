'use client';

import { DepositStoreContext } from '@/contexts/deposit-context';
import { use } from 'react';

export const useDepositContext = () => {
  const context = use(DepositStoreContext);

  if (!context) {
    throw new Error(
      'useDepositContext must be used within a DepositStoreContext',
    );
  }

  return context;
};
