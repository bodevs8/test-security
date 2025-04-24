import { REGEX_EMAIL } from '@/constant/app';
import { TelegramSchemaEnum } from '@/enums';
import { z } from 'zod';

export const createForgotPasswordByEmailSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .nonempty({
        message: t('Validation.forgotPassword.email.required'),
      })
      .regex(REGEX_EMAIL, {
        message: t('Validation.forgotPassword.email.invalid'),
      })
      .email({
        message: t('Validation.forgotPassword.email.invalid'),
      })
      .max(50, {
        message: t('Validation.forgotPassword.email.max'),
      }),
  });

export const createForgotPasswordByTelegramSchema = (
  t: (key: string, params?: Record<string, any>) => string,
) =>
  z.object({
    username: z
      .string()
      .nonempty({
        message: t('Validation.forgotPassword.telegram.required'),
      })
      .regex(/^[\u0E00-\u0E7Fa-z0-9]+$/i, {
        message: t('Validation.forgotPassword.telegram.invalid'),
      })
      .min(TelegramSchemaEnum.MinUserName, {
        message: t('Validation.forgotPassword.telegram.min', {
          min: TelegramSchemaEnum.MinUserName,
        }),
      })
      .max(TelegramSchemaEnum.MaxUserName, {
        message: t('Validation.forgotPassword.telegram.max', {
          max: TelegramSchemaEnum.MaxUserName,
        }),
      }),
  });

export const createResetPasswordByEmailSchema = (t: (key: string) => string) =>
  z
    .object({
      password: z
        .string()
        .nonempty({
          message: t('Validation.forgotPassword.password.required'),
        })
        .min(6, {
          message: t('Validation.forgotPassword.password.min'),
        })
        .max(32, {
          message: t('Validation.forgotPassword.password.max'),
        }),
      confirmPassword: z
        .string()
        .nonempty({
          message: t('Validation.forgotPassword.confirmPassword.required'),
        })
        .min(6, {
          message: t('Validation.forgotPassword.confirmPassword.min'),
        })
        .max(32, {
          message: t('Validation.forgotPassword.confirmPassword.max'),
        }),
    })
    .refine(({ confirmPassword, password }) => confirmPassword === password, {
      message: t('Validation.forgotPassword.confirmPassword.match'),
      path: ['confirmPassword'],
    });

export const createResetPasswordByTelegramSchema = (
  t: (key: string) => string,
) =>
  z
    .object({
      otp: z
        .string()
        .nonempty({
          message: t('Validation.forgotPassword.otp.required'),
        })
        .length(6, {
          message: t('Validation.forgotPassword.otp.length'),
        }),
      password: z
        .string()
        .nonempty({
          message: t('Validation.forgotPassword.password.required'),
        })
        .min(6, {
          message: t('Validation.forgotPassword.password.min'),
        })
        .max(32, {
          message: t('Validation.forgotPassword.password.max'),
        }),
      confirmPassword: z
        .string()
        .nonempty({
          message: t('Validation.forgotPassword.confirmPassword.required'),
        })
        .min(6, {
          message: t('Validation.forgotPassword.confirmPassword.min'),
        })
        .max(32, {
          message: t('Validation.forgotPassword.confirmPassword.max'),
        }),
    })
    .refine(({ confirmPassword, password }) => confirmPassword === password, {
      message: t('Validation.forgotPassword.confirmPassword.match'),
      path: ['confirmPassword'],
    });
