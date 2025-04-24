export enum AddBankSchemaEnum {
  MinBankAccountName = 1,
  MaxBankAccountName = 60,
  MinBankAccountNumber = 6,
  MaxBankAccountNumber = 20,
}

export enum UpdateFullNameSchemaEnum {
  MinFullName = 6,
  MaxFullName = 29,
}

export enum UserSchemaEnum {
  MaxEmail = 50,
  MinOtp = 6,
}

export enum ChangePasswordSchemaEnum {
  MinPassword = 6,
  MaxPassword = 32,
}

export enum RegisterSchemaEnum {
  ReferralCodeRegex = '<script\\b[^>]*>[^<]*<\\/script>',
}

export enum DepositPhoneCardSchemaEnum {
  MinNumber = 11,
  MaxNumber = 20,
  MaxLengthNumber = 225,
}

export enum TelegramSchemaEnum {
  MinUserName = 6,
  MaxUserName = 29,
}
