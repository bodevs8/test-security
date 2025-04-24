import type { LimitDepositType } from '@/contexts/transaction';
import type {
  ApiEndpointEnum,
  CategoryTypeEnum,
  DepositLinkEnum,
  DepositMethodEnum,
  EwalletMethodEnum,
  PackageIdEnum,
  WithdrawLinkEnum,
} from '@/enums';
import type { WithDrawMethodEnum } from '@/enums/withdraw';
import type { StaticImageData } from 'next/image';
import type { RefObject } from 'react';
import type { UserData } from './auth';

export type IndexDepositPackageType = {
  id: number;
  name: string;
  description: string;
  type: string;
  promotion: number;
  max_amount: number;
  multiplier: number;
};

export type BankType = {
  smartpay_code: string;
  bank_code: string;
  bank_name: string;
  status: number;
};

export type EwalletBankingType = {
  code: string;
  old_code: string;
  name: string;
  provider: string;
  status: number;
  min: number;
  max: number;
};

export type IndexDepositBankingType = {
  [key: string]: EwalletBankingType;
};

export type IndexDepositEwalletType = {
  code: string;
  provider: string;
  status: number;
  min: number;
  max: number;
};

export type IndexDepositType = {
  banks: any[];
  packages: IndexDepositPackageType[];
  momos: any[];
  withdrawBanks: BankType[];
  usedDeposit: any[];
  recommendDeposit: any[];
  viettelPays: never[];
  nicepayInfo: {
    status: number;
  };
  p2pLink: string;
  ewallet: {
    status: string;
    ewallet: {
      VIETTEL_PAY: IndexDepositEwalletType;
      MOMO: IndexDepositEwalletType;
      ZALO_PAY: IndexDepositEwalletType;
    };
    ewallet2: any;
    banking: IndexDepositBankingType;
    banking2: IndexDepositBankingType;
    providers: string[];
  };
};

export type DepositContainerType = {
  data: IndexDepositType | null;
  children: React.ReactNode;
};

export type CryptoDataType = {
  currency: string;
  network: string[];
  price: number;
  sort: number;
};

export type CryptoDetailDataType = {
  address: string;
  network: string;
  qrcode: number;
  userId: number;
};

export type IndexDepositPhoneCardItemType = {
  status: number;
  rate: number;
  value: number[];
};

export type PhoneCardType = {
  [key: string]: IndexDepositPhoneCardItemType;
};

export type DepositDataType = {
  indexDeposit: IndexDepositType | null;
  cryptoList: CryptoDataType[] | undefined;
  phoneCardList: PhoneCardType | undefined;
  selectedCrypto?: string | null;
  setSelectedCrypto?: (crypto: string | null) => void;
};

export type DepositCryptoContainerProps = {
  data: CryptoDataType[];
  cryptoByNetwork: CryptoDetailDataType[];
  isMobile?: boolean;
};

export type GateType = {
  gateTurbo: boolean;
  gateSonic: boolean;
  gateLucky: boolean;
};

export type GateLimitType = {
  gateTurbo: LimitDepositType;
  gateSonic: LimitDepositType;
  gateLucky: LimitDepositType;
};

export type EwalletGateType = Record<EwalletMethodEnum, GateType>;

export type EwalletGateLimitType = Record<EwalletMethodEnum, GateLimitType>;

export type DepositCodepayParamsType = {
  amount: number;
  packageId: number;
};

export type DepositFlexpayFormType = {
  amount: number;
  bank_code: string;
};

export type DepositEwalletParamsType = {
  amount: number;
  provider: string;
  wallet: string;
};

export type DepositFlexpayParamsType = {
  amount: number;
  bank_code: string;
  provider: string;
  type: string;
};

export type TransactionInfoType = {
  id: number;
  content: string;
  code: string;
  created_at: string;
  expired_at: string;
  status: string;
  bank_account_no: string;
  bank_account_name: string;
  bank_code: string;
  bank_name: string;
  br_code: string;
  unique_id: string;
  invoice_id: number;
  amount: number;
  fake_name: string;
  expired_at_utc: string;
  qrcode: string;
  deposited?: boolean;
  expired?: string;
  created_at_utc?: string;
  real_bank_code?: string;
  real_bank_name?: string;
  desc_code?: string;
  account_no?: string;
  account_name?: string;
  qr_code?: string;
};

export type MaintainDepositType = {
  index: boolean;
  codepay: boolean;
  flexpay: boolean;
  crypto: boolean;
  ewallet: boolean;
  phone_card: boolean;
};

export type MaintainWithdrawType = {
  [key in WithDrawMethodEnum]: boolean;
};

export type AvailablePackageType = {
  value: PackageIdEnum;
  label: string;
};

export type TimerRefsType = {
  refresh: RefObject<NodeJS.Timeout | null>;
  expired: RefObject<NodeJS.Timeout | null>;
  renew: RefObject<NodeJS.Timeout | null>;
  redirect: RefObject<NodeJS.Timeout | null>;
};

export type DepositHookType = {
  method: DepositMethodEnum | string;
  refreshApi: ApiEndpointEnum | string;
  user?: UserData;
};

export type DepositTabItem = {
  id: string;
  title: string;
  subTitle: string;
  href: DepositLinkEnum | WithdrawLinkEnum;
  tag?: CategoryTypeEnum;
  disabled: boolean;
  icon: string | StaticImageData;
  iconMaintain: string | StaticImageData;
};

export type FormattedDataItem = {
  status: number;
  rate: number;
  value: { number: number; display: string }[];
  key: string;
  order: number;
  icon: StaticImageData | string;
  iconActive: StaticImageData | string;
  iconInactive?: StaticImageData | string;
};

export type DepositPhoneCardItemType = {
  status: number;
  rate: number;
  value: { number: number; display: string }[];
};

export type DepositPhoneCardContainerProps = {
  providerCardList: FormattedDataItem[];
  isMobile?: boolean;
};

export type DepositPhoneCardFormValues = {
  card_code: string;
  card_serial: string;
};

export type DepositPhoneCardResponse = {
  card_amount: string;
  card_code: string;
  card_serial: string;
  card_status: number;
  to_telcom_code: string;
};

export type ResultFieldMappingType = {
  [key: string]: {
    flexpay: string;
    codepay: string;
  };
};

export type AccountOption = {
  account_name: string;
  account_no: string;
  qr_code: string;
};
