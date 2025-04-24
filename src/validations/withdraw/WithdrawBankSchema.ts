import type { UserData } from '@/types/auth';
import { formatNumberWithCommas } from '@/utils/format-currency';
import { z } from 'zod';

const DEFAULT_CURRENCY_UNIT = process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT || '';
export const createWithdrawBankSchema = (
  t: (key: string, params?: Record<string, any>) => string,
  minAmount: number,
  maxAmount: number,
  user: UserData | undefined,
  isBankVerified: boolean,
) =>
  z.object({
    amount_withdraw: z
      .string()
      .nonempty({
        message: t('Validation.withdraw.amount.required'),
      })
      .transform((val) => Number(val.replace(/,/g, '')) * 1000)
      .refine((val) => user && Number(val / 1000) <= user?.balance, {
        message: t('Validation.withdraw.amount.enough'),
      })
      .refine((val) => !Number.isNaN(val), {
        message: t('Validation.withdraw.amount.invalid'),
      })
      .refine((val) => val >= minAmount, {
        message: t('Validation.withdraw.amount.limit', {
          min: formatNumberWithCommas(minAmount / 1000, DEFAULT_CURRENCY_UNIT),
          max: formatNumberWithCommas(maxAmount / 1000, DEFAULT_CURRENCY_UNIT),
        }),
      })
      .refine((val) => val <= maxAmount, {
        message: t('Validation.withdraw.amount.limit', {
          min: formatNumberWithCommas(minAmount / 1000, DEFAULT_CURRENCY_UNIT),
          max: formatNumberWithCommas(maxAmount / 1000, DEFAULT_CURRENCY_UNIT),
        }),
      }),
    to_bank_code: z
      .string()
      .trim()
      .nonempty({
        message: t('Validation.withdraw.bank.required'),
      }),
    to_bank_name: z.string().trim(),
    to_bank_no: z.string().trim(),
    phone: isBankVerified
      ? z.string().optional()
      : z
          .string()
          .nonempty({
            message: t('Validation.withdraw.phone_input.required'),
          })
          .min(5, {
            message: t('Validation.withdraw.phone_input.min', {
              min: 5,
            }),
          }),
  });
