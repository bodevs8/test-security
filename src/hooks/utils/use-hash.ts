'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const useHash = () => {
  const [hash, setHash] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.location?.hash?.slice(1) ?? '';
  });
  const searchParams = useSearchParams();

  // Update hash in state
  const handleHashChange = useCallback(() => {
    setHash(window.location?.hash?.slice(1) ?? '');
  }, []);

  // Set hash in URL
  const updateHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) {
        window.location.hash = newHash;
      }
    },
    [hash],
  );

  useEffect(() => {
    handleHashChange();
  }, [handleHashChange, searchParams]);

  return {
    hash,
    setHash: updateHash,
    clearHash: () => updateHash(''),
  };
};
