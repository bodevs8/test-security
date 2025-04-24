import { UpdateFullNameSchemaEnum, UserSchemaEnum } from '@/enums';
import { z } from 'zod';

export const updateDisplayNameSchema = (
  t: (key: string, params?: Record<string, any>) => string,
  username?: string, // Nhận username từ props để kiểm tra
) =>
  z
    .object({
      displayName: z
        .string()
        .nonempty(t('Validation.myProfile.fullName.required'))
        .regex(/^[\u0E00-\u0E7Fa-z0-9]+$/i, {
          message: t('Validation.myProfile.fullName.regex'),
        })
        .min(
          UpdateFullNameSchemaEnum.MinFullName,
          t('Validation.myProfile.fullName.min', {
            min: UpdateFullNameSchemaEnum.MinFullName,
          }),
        )
        .max(
          UpdateFullNameSchemaEnum.MaxFullName,
          t('Validation.myProfile.fullName.max', {
            max: UpdateFullNameSchemaEnum.MaxFullName,
          }),
        ),
    })
    .superRefine((values, ctx) => {
      if (values.displayName === username) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['displayName'],
          message: t('Validation.myProfile.fullName.same_as_username'),
        });
      }
    });

export const updateEmailSchema = (
  t: (key: string, params?: Record<string, any>) => string,
) =>
  z.object({
    email: z
      .string()
      .max(UserSchemaEnum.MaxEmail, {
        message: t('Validation.myProfile.email.max', {
          max: UserSchemaEnum.MaxEmail,
        }),
      })
      .superRefine((val, ctx) => {
        if (val && !z.string().email().safeParse(val).success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('Validation.myProfile.email.invalid'),
          });
        }
      })
      .optional(), // Cho phép bỏ trống
  });

export const verifyOtpSchema = (
  t: (key: string, params?: Record<string, any>) => string,
) =>
  z.object({
    otpCode: z
      .string()
      .nonempty({
        message: t('Validation.myProfile.otp.required'),
      })
      .min(UserSchemaEnum.MinOtp, {
        message: t('Validation.myProfile.otp.min', {
          min: UserSchemaEnum.MinOtp,
        }),
      })
      .regex(/^\d+$/, {
        message: t('Validation.myProfile.otp.number_only'),
      }),
  });

export type UpdateDisplayNameSchemaType = z.infer<
  ReturnType<typeof updateDisplayNameSchema>
>;

export type UpdateEmailSchemaType = z.infer<
  ReturnType<typeof updateEmailSchema>
>;
export type VerifyOtpSchemaType = z.infer<ReturnType<typeof verifyOtpSchema>>;
