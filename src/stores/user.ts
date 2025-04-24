import type { UserData } from '@/types/auth';
import { getGACookie } from '@/utils/cookie';
import { createStore } from 'zustand/vanilla';

type UserStore = {
  user: UserData | null;
  isLoggedIn: boolean;
};

export type UserStoreType = ReturnType<typeof createUserStore>;

export type UserStoreWithActions = UserStore & {
  setUser: (user: UserData) => void;
  getUser: () => UserData | null;
  getIsLoggedIn: () => boolean;
  clearUser: () => void;
  getUserId: () => number | string | undefined;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const createUserStore = () => {
  return createStore<UserStoreWithActions>()((set, get) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user: UserData) => {
      set({ user, isLoggedIn: true });
    },
    getUser: () => {
      return get().user;
    },
    getIsLoggedIn: () => {
      return get().isLoggedIn;
    },
    clearUser: () => {
      set({ user: null, isLoggedIn: false });
    },
    getUserId: () => {
      return get().user?.id || getGACookie();
    },
    setIsLoggedIn: (isLoggedIn: boolean) => {
      set({ isLoggedIn });
    },
  }));
};
