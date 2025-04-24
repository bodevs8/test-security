import type {
  AccountOption,
  EwalletGateLimitType,
  EwalletGateType,
  IndexDepositType,
} from '@/types/deposit';
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export type EwalletContextType = {
  indexDeposit: IndexDepositType | null;
  ewalletStatus: boolean | number | undefined;
  ewalletGateStatus: EwalletGateType;
  ewalletCode: string;
  amount: number;
  noteDeposit: string;
  momoAccounts: AccountOption[];
  viettelPayAccounts: AccountOption[];
  setAmount: (amount: number) => void;
  setNoteDeposit: Dispatch<SetStateAction<string>>;
  limitDepositByGate: EwalletGateLimitType;
};

export const EwalletContext = createContext<EwalletContextType | null>(null);
