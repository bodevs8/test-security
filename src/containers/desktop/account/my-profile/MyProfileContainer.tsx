'use client';

import type { UserData } from '@/types/auth';
import type {
  UpdateDisplayNameSchemaType,
  UpdateEmailSchemaType,
} from '@/validations/userSchema';
import { BaseInput } from '@/components/BaseInput';
import VerifyEmailModal from '@/components/Modals/VerifyEmailModal';
import { Button } from '@/components/ui/button';
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  CountdownEnum,
  ModalIdEnum,
  QueryKeyEnum,
  ResponseStatusEnum,
} from '@/enums';
import { useRefresh } from '@/hooks/account';
import { useModalStore, useUserStore } from '@/hooks/stores';
import { useCountdownOtpEmail, useToast } from '@/hooks/utils';
import BgVerifyTelegram from '@/public/images/account/profile/bg-verify-tele.webp';
import TelegramIcon from '@/public/images/account/profile/telegram-icon.webp';
import {
  getOtpUser,
  updateUserInfo,
  verifyUpdateEmail,
} from '@/services/client';
import { formatUsername } from '@/utils/format-username';
import {
  updateDisplayNameSchema,
  updateEmailSchema,
} from '@/validations/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useForm } from 'react-hook-form';
import '@/styles/pages/account/my-profile.scss';

type Props = {
  user?: UserData;
};

const MyProfileContainer = ({ user: userProp }: Props) => {
  const { success, error } = useToast();
  const t = useTranslations();
  const router = useRouter();
  const { refetchUser, userData } = useRefresh();
  const modalStore = useModalStore((state) => state);
  const queryClient = useQueryClient();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const [isShowModalVerifyEmail, setIsShowModalVerifyEmail] = useState(false);
  const [canUpdateFullName, setCanUpdateFullName] = useState(false);
  const { remainingTime, startCountdown, clearCountdown } =
    useCountdownOtpEmail();
  const [email, setEmail] = useState('');

  const user = useMemo(() => userData || userProp, [userProp, userData]);

  if (user?.username) {
    user.username = formatUsername(user.username);
  }

  const {
    data: verifyEmailResponse,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: [QueryKeyEnum.VerifyUpdateEmail],
    queryFn: verifyUpdateEmail,
    enabled: !!user && isLoggedIn,
    retry: false,
  });

  const {
    handleSubmit: handleSubmitDisplayName,
    control: controlDisplayName,
    formState: {
      isValid: isDisplayNameValid,
      touchedFields: displayNameTouched,
    },
  } = useForm<UpdateDisplayNameSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(updateDisplayNameSchema(t, user?.username)),
    defaultValues: {
      displayName: user?.fullname,
    },
  });

  // Form for email
  const {
    handleSubmit: handleSubmitEmail,
    control: controlEmail,
    formState: {
      isValid: isEmailValid,
      touchedFields: emailTouched,
      isSubmitting,
    },
    watch: emailWatch,
    reset: resetEmailForm,
  } = useForm<UpdateEmailSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(updateEmailSchema(t)),
    defaultValues: {
      email: user?.is_verify_email ? user?.email : '',
    },
  });

  const emailWatchValue = emailWatch('email');

  const onSubmitFullName = async (data: UpdateDisplayNameSchemaType) => {
    try {
      const response = await updateUserInfo({ fullname: data.displayName });

      if (response.status === ResponseStatusEnum.Ok) {
        queryClient.refetchQueries({ queryKey: [QueryKeyEnum.UserInfo] });
        success(response.message || t('Toast.myProfile.update_success'));

        refetch();
        refetchUser();
        router.refresh();
      } else {
        throw new Error(response.message || t('Toast.myProfile.update_error'));
      }
    } catch (err) {
      error(
        err instanceof Error ? err.message : t('Toast.myProfile.update_error'),
      );
    }
  };

  const onSubmitEmail = async (data: UpdateEmailSchemaType) => {
    try {
      const response = await getOtpUser({ email: data.email || '' });
      if (response.status === ResponseStatusEnum.Ok) {
        success(response.message);
        setEmail(data.email || '');
        setIsShowModalVerifyEmail(true);
        setTimeout(() => {
          startCountdown(CountdownEnum.OTP_COUNTDOWN);
          modalStore.openModal(ModalIdEnum.VerifyEmail);
        }, 1000);
        router.refresh();
      } else {
        error(response.message);
      }
    } catch (err: any) {
      error(err.message);
    }
  };

  const handleVerifyTelegram = useCallback(() => {
    modalStore.openModal(ModalIdEnum.VerifyTelegram);
  }, [modalStore]);

  useEffect(() => {
    if (isSuccess && verifyEmailResponse?.data?.can_update_fullname) {
      setCanUpdateFullName(true);
    } else if (isError) {
      error(verifyEmailResponse?.message || t('Toast.myProfile.update_error'));
    } else {
      setCanUpdateFullName(false);
    }
  }, [isSuccess, isError, verifyEmailResponse, t, error]);

  useEffect(() => {
    if (user?.is_verify_email) {
      resetEmailForm({ email: user.email });
    }
  }, [user, resetEmailForm]);

  return (
    <>
      <div className="bg-primary-light-0 rounded-[8px] w-full px-3 md:px-8 py-6 md:py-10 min-h-[calc(100vh-50px-40px)] md:min-h-auto md:h-full box-border">
        <div className="max-w-[480px] flex flex-col gap-6 xl:gap-6">
          <BaseInput
            label={t('Pages.Account.my_profile.username')}
            placeholder={t('Pages.Account.my_profile.username')}
            rightIcon={<i className="icon-lock text-xl text-green-500" />}
            name="userName"
            control={controlDisplayName}
            value={user?.username}
            disabled
          />
          <form onSubmit={handleSubmitDisplayName(onSubmitFullName)}>
            <BaseInput
              label={t('Pages.Account.my_profile.display_name')}
              placeholder={t('Pages.Account.my_profile.display_name')}
              name="displayName"
              control={controlDisplayName}
              disabled={!canUpdateFullName}
              showValidState={
                !!displayNameTouched.displayName && canUpdateFullName
              }
              rightIcon={
                <>
                  {canUpdateFullName && (
                    <Button
                      id="update-fullname"
                      name="update-fullname"
                      type="submit"
                      disabled={!isDisplayNameValid}
                      variant={ButtonVariantsEnum.Transparent}
                      size={ButtonSizeEnum.None}
                      className="!text-green-500 !bg-transparent disabled:opacity-50 text-xs capitalize"
                    >
                      {t('Pages.Account.my_profile.update')}
                    </Button>
                  )}
                  {!canUpdateFullName && (
                    <i className="icon-lock text-xl text-green-500" />
                  )}
                </>
              }
            />
          </form>
          <BaseInput
            label={t('Pages.Account.my_profile.phone')}
            placeholder={t('Pages.Account.my_profile.phone')}
            name="phone"
            control={controlDisplayName}
            disabled
            value={user?.phone}
            rightIcon={<i className="icon-lock text-xl text-green-500" />}
          />
          <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
            <BaseInput
              name="email"
              label={t('Pages.Account.my_profile.email')}
              placeholder={t('Pages.Account.my_profile.placeholder_email')}
              control={controlEmail}
              inputClassName={clsx({
                '!pr-[110px]': remainingTime > 0,
              })}
              showValidState={
                (!!emailTouched.email || !!emailWatchValue) &&
                !user?.is_verify_email
              }
              disabled={user?.is_verify_email}
              rightIcon={
                <>
                  {user?.is_verify_email && (
                    <i className="icon-lock text-xl text-green-500" />
                  )}
                  {!user?.is_verify_email && (
                    <Button
                      id="verify-email"
                      name="verify-email"
                      variant={ButtonVariantsEnum.Transparent}
                      size={ButtonSizeEnum.None}
                      type="submit"
                      disabled={
                        !isEmailValid ||
                        !emailWatchValue ||
                        remainingTime > 0 ||
                        isSubmitting
                      }
                      className="!text-green-500 !bg-transparent disabled:opacity-50 text-xs capitalize"
                    >
                      {remainingTime > 0
                        ? `${t('Modals.VerifyEmailModal.resend_otp')} (${remainingTime}s)`
                        : t('Pages.Account.my_profile.verify')}
                    </Button>
                  )}
                </>
              }
            />
          </form>

          <>
            {user?.is_verify_tele && (
              <BaseInput
                label={t('Pages.Account.my_profile.telegram_label')}
                placeholder={t('Pages.Account.my_profile.telegram_label')}
                rightIcon={<i className="icon-lock text-xl text-green-500" />}
                name="telegram"
                control={controlDisplayName}
                value={String(user?.tele_chat_id)}
                disabled
              />
            )}
            {!user?.is_verify_tele && (
              <div className="flex justify-between items-center relative rounded-lg">
                <Image
                  src={BgVerifyTelegram}
                  alt="telegram"
                  width={44}
                  height={44}
                  className="absolute top-0 left-0 w-full h-full"
                />
                <div className="flex items-center gap-2 p-2 z-10">
                  <Image
                    src={TelegramIcon}
                    alt="telegram"
                    width={44}
                    height={44}
                    className="size-11"
                  />
                  <div className="flex flex-col gap-1 md:gap-0">
                    <span className="text-xs md:text-base whitespace-nowrap font-bold leading-[140%] text-white">
                      {t('Pages.Account.my_profile.telegram')}
                    </span>
                    <span className="font-medium text-xs md:text-sm text-white">
                      {t('Pages.Account.my_profile.telegram_description')}
                    </span>
                  </div>
                </div>
                <div className="p-2 flex items-center justify-end z-10">
                  <Button
                    id="verify-telegram"
                    name="verify-telegram"
                    onClick={handleVerifyTelegram}
                    variant={ButtonVariantsEnum.Secondary}
                    className="w-[134px] h-11 md:h-[46px] md:w-[201px] text-sm md:text-base"
                  >
                    {t('Pages.Account.my_profile.verify_now')}
                  </Button>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
      {isShowModalVerifyEmail && (
        <VerifyEmailModal
          email={email}
          countdown={remainingTime}
          startCountdown={startCountdown}
          clearCountdown={clearCountdown}
          onSuccessVerifyEmail={() => {
            refetchUser();
          }}
        />
      )}
    </>
  );
};

export default MyProfileContainer;
