'use client';

import { WithdrawContext } from '@/contexts/withdraw-context';
import { use } from 'react';

export const useWithdrawContext = () => {
  const context = use(WithdrawContext);

  if (!context) {
    throw new Error('useWithdrawContext must be used within a WithdrawContext');
  }

  return context;
};
