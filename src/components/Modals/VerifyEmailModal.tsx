import type { VerifyOtpSchemaType } from '@/validations/userSchema';
import { NumberInput } from '@/components/BaseInput';
import { BaseModal } from '@/components/BaseModal';

import { Button } from '@/components/ui/button';
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  CountdownEnum,
  ModalIdEnum,
  ModalSizeEnum,
  ResponseStatusEnum,
} from '@/enums';
import { useModalStore } from '@/hooks/stores';
import { useTrackingProfile } from '@/hooks/tracking';
import { useToast } from '@/hooks/utils';
import IconEmail from '@/public/images/account/profile/email.webp';
import {
  emailOTPVerification,
  getOtpUser,
  getUserBank,
} from '@/services/client';
import { verifyOtpSchema } from '@/validations/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type Props = {
  email: string;
  countdown: number;
  startCountdown: (duration: number) => void;
  clearCountdown: () => void;
  onSuccessVerifyEmail: () => void;
};

const VerifyEmailModal = ({
  email,
  countdown,
  startCountdown,
  clearCountdown,
  onSuccessVerifyEmail,
}: Props) => {
  const { success, error } = useToast();
  const t = useTranslations();
  const modalStore = useModalStore((state) => state);
  const router = useRouter();
  const { trackProfileCompletion } = useTrackingProfile();

  const {
    handleSubmit,
    control,
    reset: resetForm,
    formState: { isSubmitting, isValid },
  } = useForm<VerifyOtpSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(verifyOtpSchema(t)),
    defaultValues: {
      otpCode: '',
    },
  });

  const handleResendOtp = async () => {
    try {
      const response = await getOtpUser({ email });
      if (response.status === ResponseStatusEnum.Ok) {
        success(response.message);
        startCountdown(CountdownEnum.OTP_COUNTDOWN);
      } else {
        error(response.message);
      }
    } catch (err: any) {
      error(err.message);
    }
  };

  const onSubmitOtp = async (data: VerifyOtpSchemaType) => {
    try {
      const response = await emailOTPVerification({ code: data.otpCode });
      if (response.status === ResponseStatusEnum.Ok) {
        success(response.message);
        const userBanks = await getUserBank();

        trackProfileCompletion({
          hasEmail: true,
          hasUserBanks: !!userBanks.length,
        });
        modalStore.closeModal(ModalIdEnum.VerifyEmail);
        clearCountdown();
        onSuccessVerifyEmail();
        router.refresh();
      } else {
        error(response.message);
      }
    } catch (err: any) {
      error(err.message);
    }
  };

  const renderModal = (
    <div className="flex flex-col items-center overflow-y-auto md:px-[1px]">
      <Image
        src={IconEmail}
        width={156}
        height={156}
        className="size-[156px] mb-5 md:mb-6"
        alt="Verify Email"
      />
      <div className="flex flex-col gap-1 items-center mb-5 md:mb-6 justify-between">
        <h2 className="text-xl md:text-2xl font-bold leading-[33.6px] uppercase text-primary-blue-500">
          {t('Modals.VerifyEmailModal.title')}
        </h2>
        <p
          className="text-sm md:text-base leading-[140%] font-normal text-center text-dark-200"
          dangerouslySetInnerHTML={{
            __html: t('Modals.VerifyEmailModal.description'),
          }}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmitOtp)} className="w-full">
        <div className="w-full mb-5 md:mb-6">
          <div className="relative">
            <NumberInput
              name="otpCode"
              placeholder={t('Modals.VerifyEmailModal.otp_placeholder')}
              label="OTP"
              showValidState
              enableSpace={false}
              control={control}
              maxLength={6}
              pattern="[0-9]{6}"
              inputMode="numeric"
              isPhoneInput
              inputClassName="placeholder:!leading-[30px] placeholder:py-1 !font-normal"
              rightIcon={
                <Button
                  id="resend-otp"
                  name="resend-otp"
                  type="button"
                  variant={ButtonVariantsEnum.Transparent}
                  size={ButtonSizeEnum.None}
                  disabled={countdown > 0}
                  onClick={handleResendOtp}
                  className={clsx(
                    'text-sm  disable-bg !capitalize !text-green-500 cursor-pointer',
                    { 'text-green-500': countdown > 0 },
                  )}
                >
                  {countdown > 0 &&
                    `${t('Modals.VerifyEmailModal.resend_otp')} (${countdown}s)`}
                  {countdown <= 0 && t('Modals.VerifyEmailModal.resend_otp')}
                </Button>
              }
            />
          </div>
          <p className="text-dark-200 text-xs font-normal md:font-medium leading-[140%] text-right mt-1">
            {t('Modals.VerifyEmailModal.desc_otp')}
          </p>
        </div>
        <Button
          id="verify-email-button"
          name="verify-email-button"
          className="w-full !box-border !capitalize"
          size={ButtonSizeEnum.LG}
          type="submit"
          disabled={isSubmitting || !isValid}
          isLoading={isSubmitting}
          variant={ButtonVariantsEnum.Secondary}
        >
          {t('Pages.Account.my_profile.verify')}
        </Button>
      </form>
    </div>
  );

  return (
    <BaseModal
      modalId={ModalIdEnum.VerifyEmail}
      size={ModalSizeEnum.Small}
      modalClassName="max-w-[366px] md:max-w-[432px] p-5 md:p-6"
      onClose={() => resetForm()}
    >
      {renderModal}
    </BaseModal>
  );
};

export default VerifyEmailModal;
