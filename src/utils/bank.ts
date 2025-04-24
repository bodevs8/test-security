import { MAPPING_BANK_CODE } from '@/constant/bank';
import {
  DEFAULT_BANK_IMAGE,
  MAPPING_BANK_FULL_IMAGE,
  MAPPING_BANK_ROUDED_IMAGE,
  MAPPING_BANK_ROUDED_IMAGE_FILL,
} from '@/constant/images';

export function getBankFromCode(bankCode: string | undefined) {
  if (!bankCode) {
    return null;
  }

  return MAPPING_BANK_CODE[bankCode] ?? bankCode;
}

export function getBankImage(bankCode: string | undefined) {
  if (!bankCode) {
    return null;
  }
  const bankCodeTransform =
    MAPPING_BANK_CODE[bankCode.toLowerCase()] ?? bankCode;

  return MAPPING_BANK_FULL_IMAGE[bankCodeTransform] ?? DEFAULT_BANK_IMAGE;
}

export function getBankRoundedIcon(
  bankCode: string | undefined,
  isVerified: boolean = true,
) {
  if (!bankCode) {
    return DEFAULT_BANK_IMAGE;
  }

  const bankCodeLower = bankCode.toLowerCase();
  const imageMapping = isVerified
    ? MAPPING_BANK_ROUDED_IMAGE
    : MAPPING_BANK_ROUDED_IMAGE_FILL;

  return imageMapping[bankCodeLower] ?? DEFAULT_BANK_IMAGE;
}
