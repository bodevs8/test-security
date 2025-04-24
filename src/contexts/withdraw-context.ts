import type {
  IndexDepositType,
  MaintainWithdrawType,
  PhoneCardType,
} from '@/types/deposit';
import type { WithdrawCryptoType } from '@/types/withdraw';
import { createContext } from 'react';

export type WithdrawContextType = {
  indexDeposit: IndexDepositType | null;
  cryptoStatus: boolean | undefined;
  phoneCardStatus: boolean | number;
  isMaintainWithdraw: MaintainWithdrawType;
  cryptoList: WithdrawCryptoType[] | null;
  phoneCardList: PhoneCardType | undefined;
  bankStatus: boolean;
  selectedCrypto: WithdrawCryptoType | null;
  setSelectedCrypto: (crypto: WithdrawCryptoType | null) => void;
  setCryptoList: (cryptoList: WithdrawCryptoType[]) => void;
};

export const WithdrawContext = createContext<WithdrawContextType | null>(null);
