import * as z from 'zod';

export const createRegisterSchema = (
  t: (key: string, params?: Record<string, any>) => string,
) =>
  z.object({
    username: z
      .string()
      .nonempty({
        message: t('Validation.register.username.required'),
      })
      .regex(/^[\u0E00-\u0E7Fa-z0-9]+$/i, {
        message: t('Validation.register.username.regex'),
      })
      .min(6, {
        message: t('Validation.register.username.min'),
      })
      .max(29, {
        message: t('Validation.register.username.max'),
      }),
    password: z
      .string()
      .nonempty({
        message: t('Validation.register.password.required'),
      })
      .min(6, {
        message: t('Validation.register.password.min', { min: 6 }),
      })
      .max(32, {
        message: t('Validation.register.password.max', { max: 32 }),
      }),
    phone: z
      .string()
      .nonempty({
        message: t('Validation.register.phone.required'),
      })
      .regex(/^0/, {
        message: t('Validation.register.phone.start'),
      })
      .regex(/^\d+$/, {
        message: t('Validation.register.phone.regex'),
      })
      .min(10, {
        message: t('Validation.register.phone.min'),
      })
      .max(12, {
        message: t('Validation.register.phone.max'),
      }),
  });
