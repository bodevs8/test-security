'use client';

import { FlexpayContext } from '@/contexts/transaction';
import { use } from 'react';

export const useFlexpayContext = () => {
  const context = use(FlexpayContext);

  if (!context) {
    throw new Error('useCodepayContext must be used within a CodepayContext');
  }

  return context;
};
