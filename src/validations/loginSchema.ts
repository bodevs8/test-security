import * as z from 'zod';

const MIN_LENGTH = 6;
const MAX_USERNAME_LENGTH = 29;
const MAX_PASSWORD_LENGTH = 32;

export const createLoginSchema = (
  t: (key: string, params?: Record<string, any>) => string,
) =>
  z.object({
    username: z
      .string()
      .nonempty({
        message: t('Validation.login.username.required'),
      })
      .regex(/^[\u0E00-\u0E7Fa-z0-9]+$/i, {
        message: t('Validation.login.username.regex'),
      })
      .min(MIN_LENGTH, {
        message: t('Validation.login.username.min', { min: MIN_LENGTH }),
      })
      .max(MAX_USERNAME_LENGTH, {
        message: t('Validation.login.username.max', {
          max: MAX_USERNAME_LENGTH,
        }),
      }),
    password: z
      .string()
      .nonempty({
        message: t('Validation.login.password.required'),
      })
      .min(MIN_LENGTH, {
        message: t('Validation.login.password.min', { min: MIN_LENGTH }),
      })
      .max(MAX_PASSWORD_LENGTH, {
        message: t('Validation.login.password.max', {
          max: MAX_PASSWORD_LENGTH,
        }),
      }),
  });
