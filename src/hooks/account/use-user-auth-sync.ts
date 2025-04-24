'use client';

import { setStorage } from '@/utils/storage';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useUserAuthSync = () => {
  // Define a constant for the login storage key
  const AUTH_STORAGE_KEY = 'auth_login_status';
  const queryClient = useQueryClient();

  // Setup storage event listener for cross-tab communication
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === AUTH_STORAGE_KEY && event.newValue) {
        queryClient.removeQueries();
        // Refresh the page when login status changes in another tab
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Store login timestamp to notify other tabs
  const setAuthStatus = () => {
    setStorage(AUTH_STORAGE_KEY, new Date().getTime().toString());
  };

  return { setAuthStatus };
};
