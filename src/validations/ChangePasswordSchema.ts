import { ChangePasswordSchemaEnum } from '@/enums';
import { z } from 'zod';

export const createChangePasswordSchema = (
  t: (key: string, params?: Record<string, any>) => string,
) =>
  z
    .object({
      password: z
        .string()
        .nonempty({
          message: t('Validation.changePassword.password.required'),
        })
        .min(ChangePasswordSchemaEnum.MinPassword, {
          message: t('Validation.changePassword.password.min', {
            min: ChangePasswordSchemaEnum.MinPassword,
          }),
        })
        .max(ChangePasswordSchemaEnum.MaxPassword, {
          message: t('Validation.changePassword.password.max', {
            max: ChangePasswordSchemaEnum.MaxPassword,
          }),
        }),

      newPassword: z
        .string()
        .nonempty({
          message: t('Validation.changePassword.newPassword.required'),
        })
        .min(ChangePasswordSchemaEnum.MinPassword, {
          message: t('Validation.changePassword.newPassword.min', {
            min: ChangePasswordSchemaEnum.MinPassword,
          }),
        })
        .max(ChangePasswordSchemaEnum.MaxPassword, {
          message: t('Validation.changePassword.newPassword.max', {
            max: ChangePasswordSchemaEnum.MaxPassword,
          }),
        }),

      confirmPassword: z
        .string()
        .nonempty({
          message: t('Validation.changePassword.confirmPassword.required'),
        })
        .min(ChangePasswordSchemaEnum.MinPassword, {
          message: t('Validation.changePassword.confirmPassword.min', {
            min: ChangePasswordSchemaEnum.MinPassword,
          }),
        })
        .max(ChangePasswordSchemaEnum.MaxPassword, {
          message: t('Validation.changePassword.confirmPassword.max', {
            max: ChangePasswordSchemaEnum.MaxPassword,
          }),
        }),
    })
    .refine(({ newPassword, password }) => newPassword !== password, {
      message: t('Validation.changePassword.newPassword.match_new'),
      path: ['newPassword'],
    })

    .refine(
      ({ confirmPassword, newPassword }) => confirmPassword === newPassword,
      {
        message: t('Validation.changePassword.confirmPassword.match_confirm'),
        path: ['confirmPassword'],
      },
    );
