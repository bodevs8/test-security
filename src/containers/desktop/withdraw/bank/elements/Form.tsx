'use client';
import type { UserData } from '@/types/auth';
import type { UserBankType } from '@/types/userbank';
import type { WithdrawBankParamsType } from '@/types/withdraw';
import { BankDropdown } from '@/components/BankDropdown';
import { BaseInput, NumberInput } from '@/components/BaseInput';
import { Loading } from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { MAX_BANK_ACCOUNT, MAX_LENGTH_PHONE } from '@/constant/app';
import { MAX_AMOUNT_WITHDRAW, MIN_AMOUNT_WITHDRAW } from '@/constant/deposit';
import { ButtonSizeEnum, ButtonVariantsEnum } from '@/enums';
import { useRefresh, useUserBanks } from '@/hooks/account';
import { useWithdrawBank } from '@/hooks/withdraw';
import { createWithdrawBankSchema } from '@/validations/withdraw';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { useController, useForm } from 'react-hook-form';

type FormWithdrawBankProps = {
  userBanks: UserBankType[];
  user: UserData | undefined;
  isMobile: boolean;
};

const FormWithdrawBank = ({
  userBanks,
  user,
  isMobile,
}: FormWithdrawBankProps) => {
  const t = useTranslations();
  const { userData } = useRefresh();
  const [isBankVerified, setIsBankVerified] = useState(false);
  const { userBanks: userBanksData } = useUserBanks();

  const bankOptions = useMemo(() => {
    return (userBanksData || userBanks).map((bank) => ({
      value: bank.bank_code,
      label: bank.bank_name,
      account_name: bank.bank_account_name,
      account_number: bank.bank_account_no,
      bank_status: bank.bank_status,
      bank_txt: bank.bank_txt,
      is_disable: bank.is_disable,
    }));
  }, [userBanksData, userBanks]);

  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    trigger,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(
      createWithdrawBankSchema(
        t,
        MIN_AMOUNT_WITHDRAW,
        MAX_AMOUNT_WITHDRAW,
        userData || user,
        isBankVerified,
      ),
    ),
  });
  const { onSubmitWithdrawBank, isPending } = useWithdrawBank(reset);

  const withdrawAmount = watch('amount_withdraw');

  useEffect(() => {
    if (withdrawAmount && !isPending && !isSubmitting) {
      trigger('amount_withdraw');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.balance, isPending, isSubmitting, trigger]);

  const { field: toBankNameField } = useController({
    name: 'to_bank_name',
    control,
  });

  const { field: toBankNoField } = useController({
    name: 'to_bank_no',
    control,
  });

  const { field: phoneField } = useController({
    name: 'phone',
    control,
  });

  const phoneFieldValue = watch('phone');
  const amountWithdrawValue = watch('amount_withdraw');

  const handleSubmitWithdrawBank = (data: WithdrawBankParamsType) => {
    if (isBankVerified) {
      data.phone = '';
    }
    onSubmitWithdrawBank(data);
  };

  const handleChangeBank = (value: string) => {
    const bank = bankOptions.find((bank) => bank.value === value);
    if (bank) {
      toBankNameField.onChange(bank?.account_name ?? '');
      toBankNoField.onChange(bank?.account_number ?? '');
      setIsBankVerified(!bank.is_disable);

      // Always trigger amount validation when amount exists
      if (withdrawAmount) {
        setTimeout(() => trigger('amount_withdraw'), 100);
      }

      if (!bank.is_disable && withdrawAmount) {
        if (phoneFieldValue) {
          phoneField.onChange(phoneFieldValue);
          setTimeout(() => trigger('amount_withdraw'), 100);
        }
        reset({ phone: undefined }, { keepValues: true, keepDirty: true });
      } else {
        if (amountWithdrawValue) {
          setTimeout(() => trigger('amount_withdraw'), 100);
        }

        if (phoneFieldValue) {
          setTimeout(() => trigger('phone'), 100);
        }
      }
    }
  };

  const isShowAddBank = useMemo(() => {
    return (userBanksData || userBanks).length < MAX_BANK_ACCOUNT;
  }, [userBanksData, userBanks]);

  return (
    <div
      className={clsx(
        'max-md:pb-4 md:p-4 2xl:p-6 deposit-form-container relative h-fit min-h-[288px] md:min-h-[288px] bg-primary-light-0',
        {
          '!pb-0': isMobile,
        },
      )}
    >
      {isPending && <Loading />}
      <form onSubmit={handleSubmit(handleSubmitWithdrawBank)}>
        <div
          className={clsx('flex flex-col gap-6', {
            '!gap-4': isMobile,
          })}
        >
          <BankDropdown
            name="to_bank_code"
            options={bankOptions}
            onSelectBank={(value) => handleChangeBank(value)}
            label={t('Pages.Account.withdraw.bank.label_bank_name')}
            placeholder={t('Pages.Account.withdraw.bank.placeholder_bank')}
            control={control}
            labelClassName="!mb-1 font-medium"
            showIconPlaceholder
            showVerify
            showAddBank={isShowAddBank}
            addBankClassName="!max-w-[unset] !ring-0"
            popoverTriggerClassName="!border-0"
            hideAfterButton
            iconCloseClassName="!mr-[15px] !mt-[12px] !border border-neutral-400 !rounded-0 !text-dark-100 p-1"
            drawerClassName={clsx({
              '!bg-primary-light-0 !z-53': isMobile,
            })}
            optionContainerClassName={clsx({
              '!bg-primary-light-0': isMobile,
            })}
            commandItemClassName={clsx({
              '!bg-primary-light-0': isMobile,
            })}
            commandGroupClassName={clsx({
              '!bg-primary-light-0': isMobile,
            })}
          />
          <div className={clsx('w-full flex gap-4', isMobile && 'flex-col')}>
            <div className="w-full">
              <BaseInput
                name="to_bank_name"
                control={control}
                label={t('Pages.Account.withdraw.bank.account_name')}
                labelClassname="text-[14px] !mb-1 !text-dark-700 opacity-100 font-medium capitalize"
                inputContainerClassName="!h-auto"
                inputClassName="text-[14px] font-normal !text-dark-200 leading-5 placeholder:!text-dark-200 disabled:!border disabled:!border-neutral-400 opacity-100 capitalize"
                disabled
                rightIcon={
                  <span className="icon icon-lock text-green-500 before:!text-green-500" />
                }
                leftIcon={
                  <span className="icon icon-account text-xl text-green-500 before:!text-green-500" />
                }
                placeholder="-"
              />
            </div>
            <div className="w-full">
              <BaseInput
                name="to_bank_no"
                control={control}
                label={t('Pages.Account.withdraw.bank.account_number')}
                labelClassname="text-[14px] !mb-1 !text-dark-700 opacity-100"
                inputContainerClassName="!h-auto"
                inputClassName="text-[14px] font-normal !text-dark-200 leading-5 placeholder:!text-dark-200 disabled:!border disabled:!border-neutral-400 opacity-100"
                disabled
                leftIcon={
                  <span className="icon icon-security text-xl text-green-500 before:!text-green-500" />
                }
                rightIcon={
                  <span className="icon icon-lock text-green-500 before:!text-green-500" />
                }
                placeholder="-"
              />
            </div>
          </div>
          {toBankNameField.value && toBankNoField.value && !isBankVerified && (
            <div className="w-full">
              <NumberInput
                name="phone"
                isPhoneInput
                control={control}
                label={t('Pages.Account.withdraw.bank.phone')}
                labelClassname="text-[14px] !mb-1"
                inputContainerClassName="!h-auto"
                inputClassName="text-[14px] leading-5 placeholder:!text-dark-200 placeholder:font-normal"
                maxLength={MAX_LENGTH_PHONE}
                placeholder={t('Pages.Account.withdraw.bank.phone_placeholder')}
              />
            </div>
          )}
          <NumberInput
            {...register('amount_withdraw')}
            label={t('Pages.Account.withdraw.bank.amount.label')}
            control={control}
            convertRate={1000}
            isCurrency
            maxLength={9}
            labelClassname="text-[14px] leading-5 !mb-1"
            placeholder={t('Pages.Account.withdraw.bank.amount.placeholder')}
            inputClassName="text-[14px] placeholder:!text-dark-200 placeholder:font-normal"
            convertInfoClassname="text-[14px] font-medium"
          />
          <Button
            id="deposit-button"
            name="deposit-button"
            className="w-full !box-border max-w-[358px] mx-auto deposit-form-btn"
            size={ButtonSizeEnum.LG}
            variant={ButtonVariantsEnum.Secondary}
            type="submit"
            disabled={
              isSubmitting ||
              !isValid ||
              isPending ||
              (!isBankVerified && !phoneField.value)
            }
            isLoading={isSubmitting || isPending}
          >
            {t('Common.button.withdraw')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormWithdrawBank;
