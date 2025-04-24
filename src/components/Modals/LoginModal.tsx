'use client';
import type { LoginParams } from '@/types/auth';
import { BaseInput, PasswordInput } from '@/components/BaseInput';
import { Button } from '@/components/ui/button';
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  ModalIdEnum,
  ResponseStatusEnum,
} from '@/enums';
import { useModalStore, useUserStore } from '@/hooks/stores';
import { useTrackingProfile } from '@/hooks/tracking';
import { useToast } from '@/hooks/utils';
import { getUserBank, loginRequest } from '@/services/client';
import { createLoginSchema } from '@/validations/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthModal } from '../BaseModal/AuthModal';

// Define a constant for the login storage key
const LOGIN_STORAGE_KEY = 'auth_login_status';

const LoginModal = () => {
  const t = useTranslations();
  const { success, error } = useToast();
  const modalStore = useModalStore((state) => state);
  const userStore = useUserStore((state) => state);
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const returnUrl = searchParams.get('returnUrl');
  const { trackLogin, trackProfileCompletion } = useTrackingProfile();
  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(createLoginSchema(t)),
  });

  // Setup storage event listener for cross-tab communication
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LOGIN_STORAGE_KEY && event.newValue) {
        // Refresh the page when login status changes in another tab
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const onSubmit = async (data: LoginParams) => {
    const res = await loginRequest(data);
    if (res.status === ResponseStatusEnum.Ok && res.data[0]) {
      success(t('Toast.login.success'));
      modalStore.closeModal(ModalIdEnum.Login);
      userStore.setIsLoggedIn(true);
      trackLogin();

      const userBanks = await getUserBank();

      trackProfileCompletion({
        userId: res.data[0].id.toString(),
        hasEmail: !!res.data[0].is_verify_email,
        hasUserBanks: !!userBanks.length,
      });
      reset();

      // Store login timestamp to notify other tabs
      localStorage.setItem(LOGIN_STORAGE_KEY, Date.now().toString());

      if (returnUrl) {
        window.location.href = returnUrl;
        return;
      }
      // Force reload the page to get the latest data
      window.location.reload();
      queryClient.removeQueries();
    } else {
      error(res.message || t('Toast.login.error'));
    }
  };
  const openRegisterModal = () => {
    modalStore.openModal(ModalIdEnum.Register);
    reset();
  };

  const openForgotPasswordModal = () => {
    modalStore.openModal(ModalIdEnum.ForgotPassword);
    reset();
  };

  return (
    <AuthModal
      modalId={ModalIdEnum.Login}
      modalClassName="z-[100] !bg-neutral-100"
      wrapChildrenClassName="!bg-primary-light-0"
      wrapContentClassName="!bg-primary-light-0"
      onClose={() => reset()}
    >
      <div className="flex flex-col gap-1 mb-6 !bg-primary-light-0">
        <h2 className="font-bold text-xl leading-[140%] text-green-500 uppercase">
          {t('Modals.LoginModal.title')}
        </h2>
        <p className="text-dark-200 font-normal text-sm leading-[140%]">
          {t('Modals.LoginModal.description')}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 md:gap-4"
        autoComplete="on"
      >
        <BaseInput
          {...register('username')}
          label={t('Modals.LoginModal.username')}
          placeholder={t('Modals.LoginModal.username_placeholder')}
          showValidState
          autoFocus
          enableSpace={false}
          control={control}
          maxLength={255}
          minLength={6}
          autoComplete="username webauthn"
        />
        <div>
          <PasswordInput
            {...register('password')}
            label={t('Modals.LoginModal.password')}
            placeholder={t('Modals.LoginModal.password_placeholder')}
            showValidState
            hideLeftIcon
            enableSpace={false}
            iconClassName="text-green-500"
            control={control}
            maxLength={255}
            autoComplete="new-password"
          />
          <div className="flex justify-start items-center mt-1">
            <button type="button" onClick={openForgotPasswordModal}>
              <p className="text-yellow-400 cursor-pointer text-sm font-medium leading-[140%] hover:underline capitalize">
                {t('Modals.LoginModal.forgot_password')}
              </p>
            </button>
          </div>
        </div>
        <Button
          id="login-button"
          name="login-button"
          className="w-full !box-border"
          size={ButtonSizeEnum.LG}
          type="submit"
          disabled={isSubmitting || !isValid}
          variant={ButtonVariantsEnum.Secondary}
          isLoading={isSubmitting}
        >
          {t('Modals.LoginModal.login')}
        </Button>
        <div className="flex justify-center items-center mt-6">
          <p className="text-dark-200 font-normal text-xs leading-[140%]">
            {t('Modals.LoginModal.no_account')}
            <button type="button" onClick={openRegisterModal}>
              <span className="text-green-600 font-medium cursor-pointer hover:underline capitalize">
                {t('Modals.LoginModal.register')}
              </span>
            </button>
          </p>
        </div>
      </form>
    </AuthModal>
  );
};

export default LoginModal;
