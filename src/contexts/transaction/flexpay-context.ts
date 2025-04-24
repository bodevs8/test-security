import type { EwalletBankingType, IndexDepositType } from '@/types/deposit';
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export type LimitDepositType = {
  min: number;
  max: number;
};

export type LimitDepositFlexpayType = {
  [key: string]: LimitDepositType;
};

export type FlexpayContextType = {
  indexDeposit: IndexDepositType | null;
  flexpaySonic: EwalletBankingType[];
  flexpayTurbo: EwalletBankingType[];
  flexpaySonicStatus: boolean | number;
  flexpayTurboStatus: boolean | number;
  flexpayStatus: boolean | number;
  amount: number;
  noteDeposit: string;
  setAmount: (amount: number) => void;
  setNoteDeposit: Dispatch<SetStateAction<string>>;
  limitDepositFlexpay: LimitDepositFlexpayType;
};

export const FlexpayContext = createContext<FlexpayContextType | null>(null);
