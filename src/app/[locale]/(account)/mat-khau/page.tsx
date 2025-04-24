'use client';
import type { ChangePasswordParams } from '@/types/auth';
import { PasswordInput } from '@/components/BaseInput';
import { Button } from '@/components/ui/button';
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  ModalIdEnum,
  ResponseStatusEnum,
} from '@/enums';
import { useUserStore } from '@/hooks/stores';
import { useToast } from '@/hooks/utils';
import { changePasswordRequest, logoutRequest } from '@/services/client';
import { createChangePasswordSchema } from '@/validations/ChangePasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const ChangePassword = () => {
  const t = useTranslations();
  const router = useRouter();
  const { success, error } = useToast();
  const { clearUser } = useUserStore((state) => state);
  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    trigger,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(createChangePasswordSchema(t)),
  });

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const onSubmit = async (data: ChangePasswordParams) => {
    const res = await changePasswordRequest(data);
    if (res.status === ResponseStatusEnum.Ok) {
      success(t('Toast.changePassword.success'));
      reset();
      await logoutRequest();
      clearUser();
      router.refresh();
      setTimeout(() => {
        router.push(`/?openModal=${ModalIdEnum.Login}`);
      }, 1000);
    } else {
      error(res.message || t('Toast.changePassword.error'));
    }
  };

  const reCheckValidate = (field: string, value: string) => {
    if (!value) return;

    if (field === 'newPassword' && newPassword) {
      trigger(['password', 'newPassword']);
    }

    if (field === 'confirmPassword' && confirmPassword) {
      trigger(['newPassword', 'confirmPassword']);
    }
  };

  return (
    <div className="w-full rounded-[8px] md:bg-white py-6 h-full box-border grid grid-rows-[auto_1fr] md:pt-8 md:min-h-[calc(100vh)]">
      <div className="w-full px-3 py-3 md:py-0 md:pb-12 lg:pb-0 md:px-6 bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 max-w-[400px] mx-auto lg:mx-0 lg:max-w-[500px]"
        >
          <PasswordInput
            {...register('password', {
              onChange: (e) => reCheckValidate('newPassword', e.target.value),
            })}
            label={t('Pages.Account.change_password.label_password')}
            placeholder={t(
              'Pages.Account.change_password.placeholder_password',
            )}
            showValidState
            control={control}
            className="base-input-placeholder"
            hideLeftIcon
            labelClassname="leading-[20px] text-sm font-medium"
            inputClassName="placeholder:!text-dark-200 placeholder:font-normal text-ellipsis pr-8"
            iconClassName="text-green-500"
            autoFocus
          />
          <PasswordInput
            {...register('newPassword', {
              onChange: (e) =>
                reCheckValidate('confirmPassword', e.target.value),
            })}
            label={t('Pages.Account.change_password.label_new_password')}
            placeholder={t('Pages.Account.change_password.placeholder_new')}
            showValidState
            control={control}
            className="base-input-placeholder"
            hideLeftIcon
            labelClassname="leading-[20px] text-sm font-medium"
            inputClassName="placeholder:!text-dark-200 placeholder:font-normal text-ellipsis pr-8"
            iconClassName="text-green-500"
          />
          <PasswordInput
            {...register('confirmPassword')}
            label={t('Pages.Account.change_password.label_confirm_password')}
            placeholder={t('Pages.Account.change_password.placeholder_confirm')}
            showValidState
            control={control}
            className="base-input-placeholder"
            hideLeftIcon
            labelClassname="leading-[20px] text-sm font-medium"
            inputClassName="placeholder:!text-dark-200 placeholder:font-normal text-ellipsis pr-8"
            iconClassName="text-green-500"
          />
          <div className="md:dropdown-shadow-secondary md:!shadow-none md:p-4 w-full md:h-[72px] flex justify-center items-center">
            <Button
              id="change-password-button"
              name="change-password-button"
              className="w-full lg:max-w-[380px] !box-border font-medium leading-[22.4px] mx-auto"
              size={ButtonSizeEnum.LG}
              type="submit"
              disabled={!isDirty || !isValid}
              isLoading={isSubmitting}
              variant={ButtonVariantsEnum.Secondary}
            >
              {t('Pages.Account.change_password.label_button')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
