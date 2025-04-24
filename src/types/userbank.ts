export type CreateUserBankParams = {
  bank_account_no: string;
  bank_account_name: string;
  bank_code: string;
};

export type UserBankType = {
  bank_account_name: string;
  bank_account_no: string;
  bank_code: string;
  bank_name: string;
  bank_status: number;
  bank_txt: string;
  is_disable: boolean;
};
