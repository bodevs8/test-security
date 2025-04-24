'use client';

import { EwalletContext } from '@/contexts/transaction';
import { use } from 'react';

export const useEwalletContext = () => {
  const context = use(EwalletContext);

  if (!context) {
    throw new Error('useEwalletContext must be used within a EwalletContext');
  }

  return context;
};
