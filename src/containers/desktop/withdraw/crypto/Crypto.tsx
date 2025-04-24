'use client';

import type { UserData } from '@/types/auth';
import type { WithdrawCryptoType } from '@/types/withdraw';
import { BaseInput, NumberInput } from '@/components/BaseInput';
import ConfirmModal from '@/components/Modals/ConfirmModal';
import { Button } from '@/components/ui/button';
import { ButtonVariantsEnum, ModalIdEnum } from '@/enums';
import { useRefresh } from '@/hooks/account';
import { useWithdrawContext } from '@/hooks/contexts';
import { useModalStore } from '@/hooks/stores';
import { useCrypto } from '@/hooks/withdraw';
import NotifyWarningIcon from '@/public/images/empty/notify.webp';
import {
  convertCurrencyToNumber,
  formatNumberWithCommas,
} from '@/utils/format-currency';
import { createWithdrawCryptoSchema } from '@/validations/withdraw';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

type CryptoProps = {
  user: UserData | undefined;
  isMobile?: boolean;
};

const Crypto = ({ user, isMobile }: CryptoProps) => {
  const t = useTranslations();
  const { setSelectedCrypto, selectedCrypto } = useWithdrawContext();
  const { onSubmit, isPending } = useCrypto();
  const { cryptoList } = useWithdrawContext();
  const modalStore = useModalStore((state) => state);
  const { userData } = useRefresh();

  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
    getValues,
    reset,
    watch,
    trigger,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(
      createWithdrawCryptoSchema(
        t,
        selectedCrypto?.min || 0,
        userData?.balance || user?.balance || 0,
      ),
    ),
  });
  const withdrawAmount = watch('withdrawAmount');

  useEffect(() => {
    if (withdrawAmount && !isPending && !isSubmitting) {
      trigger('withdrawAmount');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.balance, isPending, isSubmitting, trigger]);

  const handleSelectCrypto = (crypto: WithdrawCryptoType) => {
    setSelectedCrypto(crypto);
    reset();
  };

  const handleSubmitWithdraw = () => {
    modalStore.openModal(ModalIdEnum.WithdrawCryptoConfirm);
  };

  const handleConfirmWithdraw = () => {
    modalStore.closeModal(ModalIdEnum.WithdrawCryptoConfirm);
    onSubmit(getValues(), () => reset());
  };

  const closeChangeRateModal = () => {
    modalStore.closeModal(ModalIdEnum.WithdrawCryptoChangeRate);
  };

  const newRateText = useMemo(() => {
    const prefix = t('Pages.Account.withdraw.crypto.rate_change.rate'); // ví dụ: "Tỷ giá mới:"
    const formattedRate = `1 ${selectedCrypto?.currency} = ${formatNumberWithCommas(
      selectedCrypto?.price || 0,
      process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT || '',
    )}`;

    return (
      <div>
        {prefix} <span className="text-yellow-600">{formattedRate}</span>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCrypto]);

  const receiveAmountText = useMemo(() => {
    const amount = convertCurrencyToNumber(withdrawAmount?.toString() ?? '');
    return ` Số Lượng Nhận: ${Number.isNaN(amount) || !amount ? '' : formatNumberWithCommas((amount * 1000) / (selectedCrypto?.price || 1), '')} ${selectedCrypto?.currency ?? ''}`;
  }, [withdrawAmount, selectedCrypto]);

  return (
    <div
      className={clsx(
        'p-6 md:border bg-primary-light-0 border-neutral-400 rounded-[4px]',
        {
          'deposit-form-container': !isMobile,
          '!p-0': isMobile,
        },
      )}
    >
      <div className="pb-2 md:pb-0">
        <form
          className={clsx('flex flex-col gap-[16px]', {
            '!gap-6': isMobile,
          })}
          onSubmit={handleSubmit(handleSubmitWithdraw)}
        >
          <div
            className={clsx('flex gap-2', {
              '!grid !grid-cols-2': isMobile,
            })}
          >
            {cryptoList?.map((crypto) => (
              <Button
                key={crypto.currency}
                id={`withdraw-crypto-${crypto.currency}`}
                name={`withdraw-crypto-${crypto.currency}`}
                className={clsx(
                  'w-full flex !gap-0 flex-col items-center justify-center relative h-[56px] uppercase border border-primary-light-400 rounded-[4px]',
                  'font-bold text-[14px] leading-[140%] text-dark-700',
                  {
                    'bg-green-80 text-green-400 border-green-500 ':
                      selectedCrypto?.currency === crypto.currency,
                  },
                )}
                type="button"
                variant={
                  selectedCrypto?.currency === crypto.currency
                    ? ButtonVariantsEnum.TabActive
                    : ButtonVariantsEnum.Ghost
                }
                onClick={() => handleSelectCrypto(crypto)}
              >
                <div
                  className={clsx('', {
                    'text-green-400':
                      selectedCrypto?.currency === crypto.currency,
                  })}
                >
                  {`${crypto.currency} (${crypto.network[0]})`}
                </div>
                <div
                  className={clsx('uppercase ', {
                    '!text-[12px]': isMobile,
                    'text-green-400':
                      selectedCrypto?.currency === crypto.currency,
                  })}
                >
                  {`tỷ giá: ${formatNumberWithCommas(crypto.price)} VND`}
                </div>
              </Button>
            ))}
          </div>
          <BaseInput
            label={t('Pages.Account.withdraw.crypto.walletAddress.label')}
            placeholder={t(
              'Pages.Account.withdraw.crypto.walletAddress.placeholder',
            )}
            control={control}
            labelClassname="text-[14px] leading-5 mt-2"
            inputClassName="text-[14px] leading-5 text-ellipsis placeholder:font-normal placeholder:!text-dark-200"
            {...register('walletAddress')}
          />
          <NumberInput
            label={t('Pages.Account.withdraw.crypto.withdrawAmount.label')}
            placeholder={t(
              'Pages.Account.withdraw.crypto.withdrawAmount.placeholder',
            )}
            control={control}
            isCurrency
            labelClassname="text-[14px] leading-5"
            inputClassName="text-[14px] leading-5 placeholder:font-normal placeholder:!text-dark-200"
            rightIcon={
              <span
                className={clsx(
                  'text-[14px] font-medium',
                  !!withdrawAmount && 'mr-[28px]',
                )}
              >
                <span className="text-green-500">{receiveAmountText}</span>
              </span>
            }
            {...register('withdrawAmount')}
            maxLength={9}
            isClearable={!!withdrawAmount}
          />
          <NumberInput
            label={t('Pages.Account.withdraw.crypto.phoneVerify.label')}
            placeholder={t(
              'Pages.Account.withdraw.crypto.phoneVerify.placeholder',
            )}
            control={control}
            maxLength={5}
            labelClassname="text-[14px] leading-5"
            inputClassName="text-[14px] leading-5 placeholder:font-normal placeholder:!text-dark-200"
            {...register('phoneVerify')}
            isPhoneInput
          />
          <div
            className={clsx('flex justify-center', {
              '!mt-[-24px]': isMobile,
            })}
          >
            <Button
              id="withdraw-crypto"
              name="withdraw-crypto"
              type="submit"
              className="w-full max-w-[358px] mx-auto deposit-form-btn"
              variant={ButtonVariantsEnum.Default}
              disabled={!isValid || isSubmitting || isPending}
              isLoading={isSubmitting || isPending}
            >
              {t('Pages.Account.withdraw.crypto.withdraw')}
            </Button>
          </div>
        </form>
      </div>
      <ConfirmModal
        title={t('Pages.Account.withdraw.crypto.rate_change.title')}
        modalId={ModalIdEnum.WithdrawCryptoChangeRate}
        description={t('Pages.Account.withdraw.crypto.rate_change.description')}
        onConfirm={closeChangeRateModal}
        confirmText={t('Pages.Account.withdraw.crypto.rate_change.confirm')}
        confirmBtnVariant={ButtonVariantsEnum.Secondary}
      >
        {newRateText}
      </ConfirmModal>
      <ConfirmModal
        imageSrc={NotifyWarningIcon}
        title={t('Pages.Account.withdraw.crypto.confirm_withdraw.title')}
        description2={t(
          'Pages.Account.withdraw.crypto.confirm_withdraw.description',
        )}
        titleClassName="!text-icon-quinary"
        description2Classname="text-center text-dark-100 !text-sm"
        modalId={ModalIdEnum.WithdrawCryptoConfirm}
        onConfirm={handleConfirmWithdraw}
        confirmText={t(
          'Pages.Account.withdraw.crypto.confirm_withdraw.confirm',
        )}
        confirmClassName="!text-white"
        confirmBtnVariant={ButtonVariantsEnum.Default}
      />
    </div>
  );
};

export { Crypto };
