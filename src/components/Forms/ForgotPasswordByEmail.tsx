import type { ForgotPasswordByEmailParams } from '@/types/auth';
import type { ApiResponseError } from '@/types/service';
import { BaseInput } from '@/components/BaseInput';

import { Button } from '@/components/ui/button';
import { ButtonSizeEnum, ButtonVariantsEnum, ResponseStatusEnum } from '@/enums';
import { useToast } from '@/hooks/utils';
import { forgotPasswordByEmailRequest } from '@/services/client';
import { createForgotPasswordByEmailSchema } from '@/validations/ForgotPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

export const ForgotPasswordByEmail = () => {
  const t = useTranslations();
  const { success, error } = useToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(createForgotPasswordByEmailSchema(t)),
  });

  const onEmailSubmit = async (data: ForgotPasswordByEmailParams) => {
    try {
      const res = await forgotPasswordByEmailRequest(data);
      if (res.status === ResponseStatusEnum.Ok) {
        success(t('Toast.forgotPassword.send_email_success'));
        return;
      }
      error(res.message);
    } catch (ex) {
      error((ex as ApiResponseError)?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onEmailSubmit)}
      className="flex flex-col gap-4"
    >
      <BaseInput
        {...register('email')}
        control={control}
        label={t('Modals.ForgotPasswordModal.email')}
        placeholder={t('Modals.ForgotPasswordModal.email_placeholder')}
        showValidState
        autoFocus
        className="text-sm"
      />
      <Button
        id="forgot-password-by-email-button"
        name="forgot-password-by-email-button"
        type="submit"
        size={ButtonSizeEnum.LG}
        variant={ButtonVariantsEnum.Secondary}
        className="w-full !box-border"
        disabled={isSubmitting || !isValid}
        isLoading={isSubmitting}
      >
        {t('Modals.ForgotPasswordModal.send')}
      </Button>
    </form>
  );
};
