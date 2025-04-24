'use client';
import type { RegisterParams } from '@/types/auth';
import { BaseInput, NumberInput, PasswordInput } from '@/components/BaseInput';
import { AuthModal } from '@/components/BaseModal';
import { Button } from '@/components/ui/button';
import { GUIDELINE_LINKS } from '@/constant/guidelines/guideline';
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  ModalIdEnum,
  ResponseStatusEnum,
} from '@/enums';
import { useModalStore, useUserStore } from '@/hooks/stores';
import { useTrackingSignup } from '@/hooks/tracking';
import { useToast } from '@/hooks/utils';
import { registerRequest } from '@/services/client';
import { getTrackingParams } from '@/utils/cookie';
import { setStorage } from '@/utils/storage';
import { createRegisterSchema } from '@/validations/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import IncompleteRegisterModal from './IncompleteRegisterModal';

const LOGIN_STORAGE_KEY = 'auth_login_status';

const RegisterModal = () => {
  const t = useTranslations();
  const router = useRouter();
  const { success, error } = useToast();
  const { setUser } = useUserStore((state) => state);
  const modalStore = useModalStore((state) => state);
  const { trackSignUpInitiated, trackSignUpCompleted } = useTrackingSignup();
  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting, isValid },
    watch,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(createRegisterSchema(t)),
    defaultValues: {
      username: '',
      password: '',
      phone: '',
    },
  });

  const isOpenModal = useMemo(() => {
    return modalStore.isOpen(ModalIdEnum.Register);
  }, [modalStore]);

  useEffect(() => {
    if (isOpenModal) {
      trackSignUpInitiated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal]);

  const formValues = watch();

  const onSubmit = async (data: RegisterParams) => {
    const trackingParams = getTrackingParams();

    const requestParams = {
      ...data,
      confirmPassword: data.password,
      ...trackingParams,
    };

    const res = await registerRequest(requestParams);
    if (res.status === ResponseStatusEnum.Ok && res.data[0]) {
      setUser(res.data[0]);
      success(t('Toast.register.success'));
      trackSignUpCompleted(res.data[0].id);
      setStorage(LOGIN_STORAGE_KEY, Date.now().toString());
      modalStore.closeModal(ModalIdEnum.Register);
      router.refresh();
    } else {
      error(res.message || t('Toast.register.error'));
    }
  };

  const openLoginModal = () => {
    reset();
    modalStore.openModal(ModalIdEnum.Login);
  };

  const handleClose = () => {
    if (Object.values(formValues).some((value) => value)) {
      modalStore.openModal(ModalIdEnum.IncompleteRegister);
      modalStore.closeModal(ModalIdEnum.Register);
    } else {
      reset();
      modalStore.closeModal(ModalIdEnum.Register);
    }
  };

  const handleConfirmCancel = () => {
    reset({
      username: '',
      password: '',
      phone: '',
    });
  };

  return (
    <>
      <IncompleteRegisterModal onCancel={handleConfirmCancel} />
      <AuthModal
        modalId={ModalIdEnum.Register}
        modalClassName="z-[100] !bg-neutral-100 custom-scrollbar"
        onClose={handleClose}
        wrapChildrenClassName="!bg-primary-light-0"
        wrapContentClassName="!bg-primary-light-0"
      >
        <div className="flex flex-col gap-1 mb-6">
          <h2 className="font-bold text-xl leading-[140%] text-green-500 uppercase">
            {t('Modals.RegisterModal.title')}
          </h2>
          <p className="text-dark-200 font-normal text-sm leading-[140%]">
            {t('Modals.RegisterModal.description')}
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 lg:gap-4"
          autoComplete="off"
        >
          <BaseInput
            {...register('username')}
            label={t('Modals.RegisterModal.username')}
            placeholder={t('Modals.RegisterModal.username_placeholder')}
            autoFocus
            showValidState
            enableSpace={false}
            control={control}
          />
          <PasswordInput
            {...register('password')}
            label={t('Modals.RegisterModal.password')}
            placeholder={t('Modals.RegisterModal.password_placeholder')}
            iconClassName="text-green-500"
            showValidState
            hideLeftIcon
            enableSpace={false}
            control={control}
            maxLength={255}
            autoComplete="new-password"
          />
          <NumberInput
            {...register('phone')}
            label={t('Modals.RegisterModal.phone')}
            placeholder={t('Modals.RegisterModal.phone_placeholder')}
            showValidState
            isPhoneInput
            enableSpace={false}
            control={control}
            maxLength={255}
          />
          <div className="inline text-dark-200 text-[12px] leading-[140%] max-w-[248px] md:max-w-[245px] mx-auto">
            <p className="inline">{t('Modals.RegisterModal.agreement')}</p>
            <Link
              prefetch={false}
              href={`${GUIDELINE_LINKS.TERMS_AND_CONDITIONS}`}
              className="inline text-green-500 hover:underline capitalize mx-[2px]"
              onClick={() => modalStore.closeModal(ModalIdEnum.Register)}
            >
              {t('Modals.RegisterModal.terms_of_service')}
            </Link>
            <p className="inline-block mt-[2px]">
              {t('Modals.RegisterModal.of_site', {
                brandName: process.env.NEXT_PUBLIC_BRAND_NAME || '',
              })}
            </p>
          </div>
          <Button
            id="register-button"
            name="register-button"
            className="w-full !box-border"
            size={ButtonSizeEnum.LG}
            variant={ButtonVariantsEnum.Secondary}
            type="submit"
            disabled={isSubmitting || !isValid}
            isLoading={isSubmitting}
          >
            {t('Modals.RegisterModal.register')}
          </Button>
        </form>
        <div className="flex justify-center items-center  mt-10">
          <p className="text-dark-200 font-normal text-xs leading-[140%]">
            {t('Modals.RegisterModal.have_account')}
            <button type="button" onClick={openLoginModal}>
              <span className="text-green-600 cursor-pointer hover:underline capitalize font-medium">
                {t('Modals.RegisterModal.login')}
              </span>
            </button>
          </p>
        </div>
      </AuthModal>
    </>
  );
};

export default RegisterModal;
