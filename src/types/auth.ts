export type LoginParams = {
  username: string;
  password: string;
};

export type LoginWithTokenParams = {
  token: string;
};

export type RegisterParams = {
  username: string;
  password: string;
  phone: string;
  referral_code?: string;
  confirmPassword?: string;
};

export type ForgotPasswordByEmailParams = {
  email: string;
};

export type ForgotPasswordByTelegramParams = {
  username: string;
};

export type ResetPasswordByTokenParams = {
  token?: string;
  password: string;
  confirmPassword: string;
};

export type ResetPasswordByOtpParams = {
  otp: string;
  password: string;
  confirmPassword: string;
};

export type UserData = {
  token: string;
  etoken: string;
  id: number;
  fullname: string;
  phone: string;
  username: string;
  boping_id: string;
  email: string;
  type: string;
  bank_account_no: boolean | string;
  bank_code: boolean | string;
  plan_id: boolean | number;
  package_id: boolean | number;
  bank_name: boolean | string;
  tp_token: string;
  register_ip: string;
  momo_code: string;
  code_pay: string;
  member_id: number;
  is_verify_email: boolean;
  is_verify_phone: boolean;
  is_verify_tele: boolean;
  tele_chat_id: boolean | string;
  kyc_status: string;
  identity_fullname: string;
  balance: number;
};

export type ChangePasswordParams = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

export type UserPromotionData = {
  created_time: string;
  deposit_amount: number;
  description: string;
  end_time: string;
  multiplier: number;
  name: string;
  package_id: number;
  turnover: number;
  type: string;
  promotion_amount: number;
  rolling: number;
};
