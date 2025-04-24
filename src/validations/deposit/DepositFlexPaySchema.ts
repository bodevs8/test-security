import { formatNumberWithCommas } from '@/utils/format-currency';
import { z } from 'zod';

const DEFAULT_CURRENCY_UNIT = process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT || '';

export const createDepositFlexPaySchema = (
  t: (key: string, params?: Record<string, any>) => string,
  minAmount: number,
  maxAmount: number,
) =>
  z.object({
    amount: z
      .string()
      .nonempty({
        message: t('Validation.deposit.amount.required'),
      })
      .transform((val) => Number(val.replace(/,/g, '')) * 1000)
      .refine((val) => !Number.isNaN(val), {
        message: t('Validation.deposit.amount.invalid'),
      })
      .refine((val) => val >= minAmount, {
        message: t('Validation.deposit.amount.limit', {
          min: formatNumberWithCommas(minAmount / 1000, DEFAULT_CURRENCY_UNIT),
          max: formatNumberWithCommas(maxAmount / 1000, DEFAULT_CURRENCY_UNIT),
        }),
      })
      .refine((val) => val <= maxAmount, {
        message: t('Validation.deposit.amount.limit', {
          min: formatNumberWithCommas(minAmount / 1000, DEFAULT_CURRENCY_UNIT),
          max: formatNumberWithCommas(maxAmount / 1000, DEFAULT_CURRENCY_UNIT),
        }),
      }),
    bank_code: z.string().nonempty({
      message: t('Validation.deposit.bank_code.required'),
    }),
  });
