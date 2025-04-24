import type {
  CryptoDataType,
  EwalletBankingType,
  IndexDepositType,
  MaintainDepositType,
  PhoneCardType,
} from '@/types/deposit';
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export type DepositContextType = {
  indexDeposit: IndexDepositType | null;
  flexpaySonic: EwalletBankingType[];
  flexpayTurbo: EwalletBankingType[];
  isMaintainP2P: boolean;
  codepayStatus: number | undefined;
  flexpaySonicStatus: boolean | number;
  flexpayTurboStatus: boolean | number;
  flexpayStatus: boolean | number;
  ewalletStatus: boolean | number | undefined;
  cryptoStatus: boolean | undefined;
  phoneCardStatus: boolean | number;
  isMaintainDeposit: MaintainDepositType;
  selectedCrypto: string | null;
  setSelectedCrypto: Dispatch<SetStateAction<string | null>>;
  amount: number;
  noteDeposit: string;
  setAmount: (amount: number) => void;
  setNoteDeposit: Dispatch<SetStateAction<string>>;
  cryptoList: CryptoDataType[] | undefined;
  phoneCardList: PhoneCardType | undefined;
};

export const DepositStoreContext = createContext<DepositContextType | null>(
  null,
);
