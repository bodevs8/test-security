import type { AvailablePackageType, IndexDepositType } from '@/types/deposit';
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export type CodepayContextType = {
  indexDeposit: IndexDepositType | null;
  codepayStatus: number | undefined;
  availablePackage: AvailablePackageType[];
  amount: number;
  noteDeposit: string;
  setAmount: (amount: number) => void;
  setNoteDeposit: Dispatch<SetStateAction<string>>;
};

export const CodepayContext = createContext<CodepayContextType | null>(null);
