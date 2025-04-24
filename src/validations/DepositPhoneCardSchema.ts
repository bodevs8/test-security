import { DepositPhoneCardSchemaEnum } from '@/enums';
import { z } from 'zod';

export const DepositPhoneCardSchema = (
  t: (key: string, params?: Record<string, any>) => string,
) =>
  z.object({
    card_code: z
      .string()
      .nonempty({
        message: t('Validation.deposit.PhoneCard.card_code.required'),
      })
      .min(DepositPhoneCardSchemaEnum.MinNumber, {
        message: t('Validation.deposit.PhoneCard.card_code.min', {
          min: DepositPhoneCardSchemaEnum.MinNumber,
        }),
      })
      .max(DepositPhoneCardSchemaEnum.MaxNumber, {
        message: t('Validation.deposit.PhoneCard.card_code.max', {
          max: DepositPhoneCardSchemaEnum.MaxNumber,
        }),
      }),

    card_serial: z
      .string()
      .nonempty({
        message: t('Validation.deposit.PhoneCard.card_serial.required'),
      })
      .min(DepositPhoneCardSchemaEnum.MinNumber, {
        message: t('Validation.deposit.PhoneCard.card_serial.min', {
          min: DepositPhoneCardSchemaEnum.MinNumber,
        }),
      })
      .max(DepositPhoneCardSchemaEnum.MaxNumber, {
        message: t('Validation.deposit.PhoneCard.card_serial.max', {
          max: DepositPhoneCardSchemaEnum.MaxNumber,
        }),
      }),
  });
