'use client';

import type { VerifyOtpSchemaType } from '@/validations/userSchema';
import { NumberInput } from '@/components/BaseInput';
import { BaseModal } from '@/components/BaseModal';

import { Button } from '@/components/ui/button';

import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  ModalIdEnum,
  ModalSizeEnum,
  ResponseStatusEnum,
} from '@/enums';
import { useModalStore } from '@/hooks/stores';
import { useDevice, useToast } from '@/hooks/utils';
import { useTelegramDownload } from '@/hooks/utils/use-telegram-download';
import IconTelegram from '@/public/images/account/profile/email.webp';
import { telegramOTPVerification } from '@/services/client';
import { verifyOtpSchema } from '@/validations/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const VerifyTelegramModal = () => {
  const t = useTranslations();
  const modalStore = useModalStore((state) => state);
  const router = useRouter();
  const { success, error } = useToast();
  const { downloadLink } = useTelegramDownload();
  const { isMobile } = useDevice();

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, isValid },
    reset: resetForm,
  } = useForm<VerifyOtpSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(verifyOtpSchema(t)),
    defaultValues: {
      otpCode: '',
    },
  });

  const otpCode = watch('otpCode');

  const onSubmitOtp = async (data: VerifyOtpSchemaType) => {
    try {
      const response = await telegramOTPVerification({ otp: data.otpCode });
      if (response.status === ResponseStatusEnum.Ok) {
        success(response.message);
        modalStore.closeModal(ModalIdEnum.VerifyTelegram);
        router.refresh();
      } else {
        error(response.message);
      }
    } catch (err: any) {
      error(err.message);
    }
  };

  const renderModal = (
    <div className="flex flex-col items-center">
      <Image
        src={IconTelegram}
        width={156}
        height={156}
        className="mb-5 md:mb-6 size-[156px]"
        alt="Verify Telegram"
      />
      <div className="flex flex-col gap-1 md:gap-2 items-center mb-5 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold leading-[33.6px] uppercase text-primary-blue-500">
          {t('Modals.VerifyTelegramModal.title')}
        </h2>
        <p
          className="text-sm md:text-base leading-[140%] text-center text-dark-200 font-normal"
          dangerouslySetInnerHTML={{
            __html: isMobile
              ? t('Modals.VerifyTelegramModal.description_mb')
              : t('Modals.VerifyTelegramModal.description'),
          }}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmitOtp)}
        className="w-full mb-5 md:mb-6"
      >
        <div className="flex flex-col gap-3.5 mb-5 md:mb-6">
          <div className="text-sm leading-[140%] px-4 py-2 bg-primary-light-100 rounded-[4px] flex items-center h-10">
            <span className="font-medium text-dark-700 mr-1">
              {t('Modals.VerifyTelegramModal.step_1')}:
            </span>{' '}
            <span className="text-dark-200 font-normal">
              {t('Modals.VerifyTelegramModal.step_1_content')}
            </span>
            <Link
              href={downloadLink}
              target="_blank"
              className="text-green-500 ml-auto capitalize font-medium"
              prefetch={false}
            >
              {t('Modals.VerifyTelegramModal.telegram')}
            </Link>
          </div>
          <div className="text-sm leading-[140%] px-4 py-2 bg-primary-light-100 rounded-[4px] w-full flex items-center h-10">
            <span className="font-medium text-dark-700 mr-1">
              {t('Modals.VerifyTelegramModal.step_2')}:
            </span>
            <span className="text-dark-200 font-normal">
              {t('Modals.VerifyTelegramModal.step_2_content')}
            </span>
            <Link
              prefetch={false}
              target="_blank"
              href={String(process.env.NEXT_PUBLIC_GET_CODE_TELEGRAM_LINK)}
              className="text-green-500 ml-auto capitalize font-medium"
            >
              {t('Modals.VerifyTelegramModal.step_2_link')}
            </Link>
          </div>
          <div className="relative z-[1] h-10">
            <NumberInput
              name="otpCode"
              placeholder=""
              showValidState
              enableSpace={false}
              control={control}
              maxLength={6}
              pattern="[0-9]{6}"
              inputMode="numeric"
              inputContainerClassName="!h-auto verify-step-3"
              isPhoneInput
            />
            {!otpCode && (
              <span className="absolute left-4 top-0 text-sm font-bold text-dark-700 h-10 flex items-center pointer-events-none">
                <span className="font-medium text-dark-700">
                  {t('Modals.VerifyTelegramModal.step_3')}:
                </span>
                <span className="mx-1 text-dark-700 font-normal">|</span>
                <span className="text-dark-200 font-normal">
                  {t('Modals.VerifyTelegramModal.step_3_content')}
                </span>
              </span>
            )}
          </div>
        </div>

        <Button
          id="verify-telegram-button"
          name="verify-telegram-button"
          className="w-full !box-border !capitalize"
          size={ButtonSizeEnum.LG}
          type="submit"
          disabled={isSubmitting || !isValid}
          isLoading={isSubmitting}
          variant={ButtonVariantsEnum.Secondary}
        >
          {t('Modals.VerifyTelegramModal.verify')}
        </Button>
      </form>
      <p className="text-xs leading-[140%] font-normal text-dark-200 text-center">
        {t('Modals.VerifyTelegramModal.success_note')}
      </p>
    </div>
  );

  return (
    <BaseModal
      modalId={ModalIdEnum.VerifyTelegram}
      size={ModalSizeEnum.Small}
      modalClassName="max-w-[366px] md:max-w-[432px] p-5 md:p-6"
      onClose={() => resetForm()}
    >
      {renderModal}
    </BaseModal>
  );
};

export default VerifyTelegramModal;
