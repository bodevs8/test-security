'use client';

import { CodepayContext } from '@/contexts/transaction';
import { use } from 'react';

export const useCodepayContext = () => {
  const context = use(CodepayContext);

  if (!context) {
    throw new Error('useCodepayContext must be used within a CodepayContext');
  }

  return context;
};
