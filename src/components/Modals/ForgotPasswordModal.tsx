import { AuthModal } from '@/components/BaseModal/AuthModal';
import {
  ForgotPasswordByEmail,
  ForgotPasswordByTelegram,
  ResetPasswordByEmail,
  ResetPasswordByTelegram,
} from '@/components/Forms';
import {
  ForgotPasswordMethodEnum,
  ForgotPasswordStepEnum,
  ModalIdEnum,
} from '@/enums';
import { useModalStore } from '@/hooks/stores';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ForgotPasswordModal() {
  const t = useTranslations();
  const modalStore = useModalStore((state) => state);
  const searchParams = useSearchParams();
  const token = searchParams.get('token') as string;

  const [selectedMethod, setSelectedMethod] =
    useState<ForgotPasswordMethodEnum>(ForgotPasswordMethodEnum.EMAIL);
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStepEnum>(
    token
      ? ForgotPasswordStepEnum.RESET_PASSWORD
      : ForgotPasswordStepEnum.SUBMIT_METHOD,
  );

  const openLoginModal = () => {
    setCurrentStep(ForgotPasswordStepEnum.SUBMIT_METHOD);
    setSelectedMethod(ForgotPasswordMethodEnum.EMAIL);
    modalStore.openModal(ModalIdEnum.Login);
  };

  const handleClose = () => {
    setCurrentStep(ForgotPasswordStepEnum.SUBMIT_METHOD);
    setSelectedMethod(ForgotPasswordMethodEnum.EMAIL);
  };

  return (
    <AuthModal
      modalId={ModalIdEnum.ForgotPassword}
      modalClassName="z-[100]"
      onClose={handleClose}
    >
      {currentStep === ForgotPasswordStepEnum.SUBMIT_METHOD && (
        <>
          <h2 className="font-bold text-xl leading-[140%] text-green-500 uppercase mb-1">
            {t('Modals.ForgotPasswordModal.title')}
          </h2>
          <p className="font-normal text-sm leading-[140%] text-dark-200 mb-6">
            {t('Modals.ForgotPasswordModal.description')}
          </p>
          <div className="flex justify-start items-center mt-6 mb-4 uppercase bg-primary-light-100 p-1 rounded-[8px]">
            <button
              type="button"
              onClick={() => setSelectedMethod(ForgotPasswordMethodEnum.EMAIL)}
              className={clsx(
                'rounded-[8px] w-full h-10 flex items-center justify-center gap-2 cursor-pointer',
                selectedMethod === ForgotPasswordMethodEnum.EMAIL && 'bg-white',
              )}
            >
              <i
                className={clsx(
                  'icon-mail text-[20px] text-primary-light-500',
                  selectedMethod === ForgotPasswordMethodEnum.EMAIL &&
                    '!text-green-500',
                )}
              ></i>
              <p
                className={clsx(
                  'font-normal text-sm leading-[140%] text-dark-200 capitalize',
                  selectedMethod === ForgotPasswordMethodEnum.EMAIL &&
                    'text-green-500',
                )}
              >
                {t('Modals.ForgotPasswordModal.email')}
              </p>
            </button>
            <button
              type="button"
              onClick={() =>
                setSelectedMethod(ForgotPasswordMethodEnum.TELEGRAM)
              }
              className={clsx(
                'rounded-[8px] w-full h-10 flex items-center justify-center gap-2 cursor-pointer',
                selectedMethod === ForgotPasswordMethodEnum.TELEGRAM &&
                  'bg-white',
              )}
            >
              <i
                className={clsx(
                  'icon-telegram text-[20px] text-primary-light-500',
                  selectedMethod === ForgotPasswordMethodEnum.TELEGRAM &&
                    '!text-green-500',
                )}
              ></i>
              <p
                className={clsx(
                  'font-normal text-sm leading-[140%] text-dark-200 capitalize',
                  selectedMethod === ForgotPasswordMethodEnum.TELEGRAM &&
                    'text-green-500',
                )}
              >
                {t('Modals.ForgotPasswordModal.telegram')}
              </p>
            </button>
          </div>
          {selectedMethod === ForgotPasswordMethodEnum.EMAIL && (
            <ForgotPasswordByEmail />
          )}
          {selectedMethod === ForgotPasswordMethodEnum.TELEGRAM && (
            <ForgotPasswordByTelegram setCurrentStep={setCurrentStep} />
          )}
        </>
      )}
      {currentStep === ForgotPasswordStepEnum.RESET_PASSWORD && (
        <>
          <h2 className="font-bold text-xl leading-[140%] text-green-500 uppercase mb-6">
            {t('Modals.ForgotPasswordModal.reset_password_title')}
          </h2>
          {selectedMethod === ForgotPasswordMethodEnum.EMAIL && (
            <ResetPasswordByEmail />
          )}
          {selectedMethod === ForgotPasswordMethodEnum.TELEGRAM && (
            <ResetPasswordByTelegram />
          )}
        </>
      )}
      <div className="flex justify-center items-center  mt-10">
        <p className="text-dark-200 font-normal text-xs leading-[140%]">
          {t('Modals.ForgotPasswordModal.back')}
          <button type="button" onClick={openLoginModal}>
            <span className="text-green-600 font-medium cursor-pointer hover:underline capitalize">
              {t('Modals.ForgotPasswordModal.login')}
            </span>
          </button>
        </p>
      </div>
    </AuthModal>
  );
}
