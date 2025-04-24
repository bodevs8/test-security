import type { UserData } from '@/types/auth';
import {
  MAX_CARD_QUANTITY,
  MIN_CARD_QUANTITY,
  NUMBER_REGEX,
} from '@/constant/constants';
import { z } from 'zod';

export const WithdrawPhoneCardSchema = (
  t: (key: string, params?: Record<string, any>) => string,
  user: UserData | null,
  amount: number | null,
) =>
  z.object({
    number_card: z
      .string()
      .regex(NUMBER_REGEX, {
        message: t('Validation.withdraw.phone_card.required'),
      })
      .refine((value) => Number(value) <= MAX_CARD_QUANTITY, {
        message: t('Validation.withdraw.phone_card.limit', {
          max: MAX_CARD_QUANTITY,
        }),
      })
      .refine((value) => Number(value) !== 0, {
        message: t('Validation.withdraw.phone_card.zero', {
          min: MIN_CARD_QUANTITY,
        }),
      })
      .refine(
        (value) => {
          const cardAmount = Number(value);
          const amountHidden = Number(amount);
          const checkAmount = (cardAmount * amountHidden) / 1000;
          if (user?.balance && checkAmount <= user?.balance) {
            return true;
          }
          return false;
        },
        {
          message: t('Validation.withdraw.phone_card.balance'),
        },
      ),
  });
