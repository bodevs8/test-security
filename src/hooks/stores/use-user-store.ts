import type { UserStoreWithActions } from '@/stores/user';
import { UserStoreContext } from '@/contexts/user-store';
import { use } from 'react';
import { useStore } from 'zustand';

export const useUserStore = <T>(
  selector: (store: UserStoreWithActions) => T,
): T => {
  const userStoreContext = use(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useUserStore must be used within UserStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};
