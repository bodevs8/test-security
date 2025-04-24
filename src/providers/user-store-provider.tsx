'use client';

import type { UserStoreType } from '@/stores/user';
import type { UserData } from '@/types/auth';
import type { ReactNode } from 'react';
import { TRACKING_PARAMS } from '@/constant/affiliate';
import { UserStoreContext } from '@/contexts/user-store';
import { createUserStore } from '@/stores/user';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const UserStoreProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: UserData | undefined;
}) => {
  const storeRef = useRef<UserStoreType>(createUserStore());
  const searchParams = useSearchParams();

  if (!storeRef.current) {
    storeRef.current = createUserStore();
  }

  // Set tracking parameters as cookies
  useEffect(() => {
    if (searchParams) {
      // Set individual tracking parameters
      TRACKING_PARAMS.forEach((param) => {
        const value = searchParams.get(param);
        if (value) {
          // Set cookie with 30-day expiration
          document.cookie = `${param}=${encodeURIComponent(value)};path=/;max-age=${60 * 60 * 24 * 30}`;
        }
      });
    }
  }, [searchParams]);

  // Update user state
  useEffect(() => {
    if (user) {
      storeRef.current.setState({
        isLoggedIn: true,
        user,
      });
    } else {
      storeRef.current.setState({
        user: undefined,
        isLoggedIn: false,
      });
    }
  }, [user]);

  return (
    <UserStoreContext value={storeRef.current}>{children}</UserStoreContext>
  );
};
