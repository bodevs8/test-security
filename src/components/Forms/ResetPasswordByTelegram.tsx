import type { ResetPasswordByOtpParams } from '@/types/auth';

import type { ApiResponseError } from '@/types/service';
import { NumberInput, PasswordInput } from '@/components/BaseInput';
import { Button } from '@/components/ui/button';
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  ResponseStatusEnum,
} from '@/enums';
import { useToast } from '@/hooks/utils';
import { resetPasswordByOtpRequest } from '@/services/client';
import { createResetPasswordByTelegramSchema } from '@/validations/ForgotPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TelegramSupportInfo from './elements/TelegramSupportInfo';

export const ResetPasswordByTelegram = () => {
  const t = useTranslations();
  const { success, error } = useToast();
  const {
    watch,
    trigger,
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, isValid, touchedFields },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(createResetPasswordByTelegramSchema(t)),
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    if (password && confirmPassword && touchedFields.confirmPassword) {
      trigger('confirmPassword');
    }
  }, [password, confirmPassword, trigger, touchedFields]);

  const onSubmit = async (data: ResetPasswordByOtpParams) => {
    try {
      const response = await resetPasswordByOtpRequest(data);
      if (response.status === ResponseStatusEnum.Ok) {
        success(t('Toast.forgotPassword.reset_password_success'));
        return;
      }
      error(response.message);
    } catch (ex) {
      error((ex as ApiResponseError)?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <NumberInput
        {...register('otp')}
        control={control}
        label={t('Modals.ForgotPasswordModal.otp')}
        placeholder={t('Modals.ForgotPasswordModal.otp_placeholder')}
        showValidState
        maxLength={6}
        isPhoneInput
        autoComplete="new-password"
      />
      <PasswordInput
        iconClassName="text-green-500"
        label={t('Modals.ForgotPasswordModal.password')}
        hideLeftIcon
        {...register('password')}
        control={control}
        placeholder={t('Modals.ForgotPasswordModal.password_placeholder')}
        showValidState
        autoComplete="new-password"
      />
      <PasswordInput
        iconClassName="text-green-500"
        label={t('Modals.ForgotPasswordModal.confirm_password')}
        hideLeftIcon
        {...register('confirmPassword')}
        control={control}
        placeholder={t(
          'Modals.ForgotPasswordModal.confirm_password_placeholder',
        )}
        showValidState
        autoComplete="new-password"
      />
      <TelegramSupportInfo />
      <Button
        id="reset-password-by-telegram-button"
        name="reset-password-by-telegram-button"
        type="submit"
        size={ButtonSizeEnum.LG}
        variant={ButtonVariantsEnum.Secondary}
        className="w-full !box-border"
        disabled={isSubmitting || !isValid}
        isLoading={isSubmitting}
      >
        {t('Modals.ForgotPasswordModal.reset_password')}
      </Button>
    </form>
  );
};
