import { formatNumberWithCommas } from '@/utils/format-currency';
import { z } from 'zod';

export const createWithdrawCryptoSchema = (
  t: (key: string, params?: Record<string, any>) => string,
  minAmount: number,
  balance: number,
) => {
  return z.object({
    walletAddress: z
      .string()
      .nonempty(t('Validation.withdraw.walletAddress.required'))
      .regex(/^[A-Z0-9]+$/i, t('Validation.withdraw.walletAddress.regex')),
    phoneVerify: z
      .string()
      .nonempty(t('Validation.withdraw.phoneVerify.required'))
      .length(5, t('Validation.withdraw.phoneVerify.length')),
    withdrawAmount: z
      .string()
      .nonempty(t('Validation.withdraw.withdrawAmount.required'))
      .transform((val) => Number(val.replace(/,/g, '')))
      .refine((val) => !Number.isNaN(val), {
        message: t('Validation.withdraw.withdrawAmount.invalid'),
      })
      .refine((val) => val >= minAmount / 1000, {
        message: t('Validation.withdraw.withdrawAmount.min', {
          amount: formatNumberWithCommas(
            minAmount / 1000,
            process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT || '',
          ),
        }),
      })
      .refine((val) => val <= balance, {
        message: t('Validation.withdraw.withdrawAmount.not_enough'),
      }),
  });
};

export type WithdrawCryptoParams = z.infer<
  ReturnType<typeof createWithdrawCryptoSchema>
>;
