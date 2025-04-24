import type { FormattedDataItem } from './deposit';

export type WithdrawPhoneCardFormValues = {
  number_card: string;
};

export type WithdrawPhoneCardContainerProps = {
  providerCardList: FormattedDataItem[];
  isMobile?: boolean;
};
export type WithdrawCryptoType = {
  currency: string;
  network: string[];
  price: number;
  min: number;
};

export type WithdrawCryptoParams = {
  amount_withdraw: number;
  wallet_address: string;
  phone: string;
  currency: string;
  ex_rate: number;
  network: string;
};

export type WithdrawBankParamsType = {
  amount_withdraw: number;
  to_bank_code: string;
  to_bank_name: string;
  to_bank_no: string;
  phone?: string;
};

export type WithdrawPhoneCardFormRequest = {
  card_number: string;
  card_amount_unit: number;
  to_telcom_code: string;
};

export type ResponseWithdrawPhoneCard = {
  status: string;
  message: string;
};
