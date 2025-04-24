import type { ForgotPasswordByTelegramParams } from '@/types/auth';
import type { ApiResponseError } from '@/types/service';
import { BaseInput } from '@/components/BaseInput';

import { Button } from '@/components/ui/button';
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  ForgotPasswordStepEnum,
  ResponseStatusEnum,
} from '@/enums';
import { useToast } from '@/hooks/utils';
import { forgotPasswordByTelegramRequest } from '@/services/client';
import { createForgotPasswordByTelegramSchema } from '@/validations/ForgotPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import TelegramSupportInfo from './elements/TelegramSupportInfo';

type ForgotPasswordByTelegramProps = {
  setCurrentStep: (step: ForgotPasswordStepEnum) => void;
};

export const ForgotPasswordByTelegram = ({
  setCurrentStep,
}: ForgotPasswordByTelegramProps) => {
  const t = useTranslations();

  const { success, error } = useToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(createForgotPasswordByTelegramSchema(t)),
  });

  const onSubmit = async (data: ForgotPasswordByTelegramParams) => {
    try {
      const res = await forgotPasswordByTelegramRequest(data);
      if (res.status === ResponseStatusEnum.Ok) {
        setCurrentStep(ForgotPasswordStepEnum.RESET_PASSWORD);
        success(t('Toast.forgotPassword.send_telegram_success'));
        return;
      }
      error(res.message);
    } catch (ex) {
      error((ex as ApiResponseError)?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <BaseInput
        label={t('Modals.ForgotPasswordModal.telegram_label')}
        {...register('username')}
        control={control}
        placeholder={t('Modals.ForgotPasswordModal.telegram_placeholder')}
        showValidState
        autoFocus
      />
      <TelegramSupportInfo />
      <Button
        id="forgot-password-by-telegram-button"
        name="forgot-password-by-telegram-button"
        type="submit"
        size={ButtonSizeEnum.LG}
        variant={ButtonVariantsEnum.Secondary}
        className="w-full !box-border"
        disabled={isSubmitting || !isValid}
        isLoading={isSubmitting}
      >
        {t('Modals.ForgotPasswordModal.send_otp')}
      </Button>
    </form>
  );
};
