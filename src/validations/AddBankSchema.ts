import { AddBankSchemaEnum } from '@/enums';
import { z } from 'zod';

export const addBankSchema = (
  t: (key: string, params?: Record<string, any>) => string,
  allowSpecialCharacter = false,
) =>
  z.object({
    bankCode: z.string().nonempty(t('Validation.addBank.bankCode.required')),

    bankAccountName: z
      .string()
      .nonempty(t('Validation.addBank.bankAccountName.required'))
      .min(
        AddBankSchemaEnum.MinBankAccountName,
        t('Validation.addBank.bankAccountName.min', {
          min: AddBankSchemaEnum.MinBankAccountName,
        }),
      )
      .max(
        AddBankSchemaEnum.MaxBankAccountName,
        t('Validation.addBank.bankAccountName.max', {
          max: AddBankSchemaEnum.MaxBankAccountName,
        }),
      )
      .refine(
        (value) => !/\s{2,}/.test(value),
        t('Validation.addBank.bankAccountName.doubleSpace'),
      )
      .refine((value) => {
        if (!allowSpecialCharacter) {
          return /^[a-z]+(?: [a-z]+)*$/i.test(value);
        }
        return /^[A-Z]/i.test(value);
      }, t('Validation.addBank.bankAccountName.regex')),

    bankAccountNumber: z
      .string()
      .nonempty(t('Validation.addBank.bankAccountNumber.required'))
      .min(
        AddBankSchemaEnum.MinBankAccountNumber,
        t('Validation.addBank.bankAccountNumber.min', {
          min: AddBankSchemaEnum.MinBankAccountNumber,
        }),
      )
      .max(
        AddBankSchemaEnum.MaxBankAccountNumber,
        t('Validation.addBank.bankAccountNumber.max', {
          max: AddBankSchemaEnum.MaxBankAccountNumber,
        }),
      )
      .regex(/^\d+$/, t('Validation.addBank.bankAccountNumber.regex')),
  });

export type AddBankSchemaType = z.infer<ReturnType<typeof addBankSchema>>;
