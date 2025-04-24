import type { ResetPasswordByTokenParams } from '@/types/auth';
import type { ApiResponseError } from '@/types/service';
import { PasswordInput } from '@/components/BaseInput';
import { Button } from '@/components/ui/button';
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  ModalIdEnum,
  ResponseStatusEnum,
} from '@/enums';
import { useModalStore } from '@/hooks/stores';
import { useToast } from '@/hooks/utils';
import { resetPasswordByTokenRequest } from '@/services/client';
import { createResetPasswordByEmailSchema } from '@/validations/ForgotPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const ResetPasswordByEmail = () => {
  const t = useTranslations();
  const { success, error } = useToast();
  const modalStore = useModalStore((state) => state);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') as string;

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { isSubmitting, isValid, touchedFields },
    reset,
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(createResetPasswordByEmailSchema(t)),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    if (password && confirmPassword && touchedFields.confirmPassword) {
      trigger('confirmPassword');
    }
  }, [password, confirmPassword, trigger, touchedFields]);

  const onSubmit = async (data: ResetPasswordByTokenParams) => {
    try {
      const response = await resetPasswordByTokenRequest({
        ...data,
        token,
      });
      if (response.status === ResponseStatusEnum.Ok) {
        success(t('Toast.forgotPassword.reset_password_success'));
        modalStore.closeModal(ModalIdEnum.ForgotPassword);
        router.refresh();
        reset();
        setTimeout(() => {
          router.push(`/?openModal=${ModalIdEnum.Login}`);
        }, 1000);
        return;
      }
      error(response.message || t('Common.message.error'));
    } catch (ex) {
      error((ex as ApiResponseError)?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <PasswordInput
        iconClassName="text-green-500"
        {...register('password')}
        control={control}
        hideLeftIcon
        label={t('Modals.ForgotPasswordModal.password')}
        placeholder={t('Modals.ForgotPasswordModal.password_placeholder')}
        showValidState
        autoFocus
      />
      <PasswordInput
        iconClassName="text-green-500"
        {...register('confirmPassword')}
        control={control}
        hideLeftIcon
        label={t('Modals.ForgotPasswordModal.confirm_password')}
        placeholder={t(
          'Modals.ForgotPasswordModal.confirm_password_placeholder',
        )}
        showValidState
      />
      <Button
        id="reset-password-by-email-button"
        name="reset-password-by-email-button"
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
