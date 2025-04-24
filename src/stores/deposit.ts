import type { IndexDepositType } from '@/types/deposit';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

type DepositStore = {
  indexDeposit: IndexDepositType | null;
};

export type DepositStoreWithActions = DepositStore & {
  setIndexDeposit: (indexDeposit: IndexDepositType | null) => void;
  getIndexDeposit: () => IndexDepositType | null;
};

export const createDepositStore = () => {
  return createStore<DepositStoreWithActions>()(
    persist(
      (set, get) => ({
        indexDeposit: null,
        setIndexDeposit: (indexDeposit: IndexDepositType | null) => {
          set({ indexDeposit });
        },
        getIndexDeposit: () => {
          return get().indexDeposit;
        },
      }),
      {
        name: 'deposit',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};

export type DepositStoreType = ReturnType<typeof createDepositStore>;
