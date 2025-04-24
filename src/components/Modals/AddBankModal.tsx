'use client';

import { BankDropdown } from '@/components/BankDropdown/BankDropdown';
import { BaseInput, NumberInput } from '@/components/BaseInput';
import { BaseModal } from '@/components/BaseModal';

import { Button } from '@/components/ui/button';
import { ButtonVariantsEnum, ModalIdEnum, ModalSizeEnum } from '@/enums';
import { useAddBankForm, useUserBanks } from '@/hooks/account';
import { useDevice } from '@/hooks/utils';
import IconAddBankModal from '@/public/images/bank/add-bank.webp';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const AddBankModal = () => {
  const t = useTranslations();
  const { userBanks } = useUserBanks();

  const { isMobile } = useDevice();
  const { form, mappedBanks, handleSubmit, handleCloseModal } =
    useAddBankForm();
  const {
    control,
    formState: { isSubmitting, isValid },
  } = form;

  const renderModal = (
    <div className="flex flex-col items-center">
      <Image
        src={IconAddBankModal}
        alt="Add Bank Modal"
        width={156}
        height={156}
        className="size-[156px] object-cover mb-5"
      />
      <h2 className="text-xl md:text-2xl font-bold leading-[140%] uppercase mb-1 text-dark-700">
        {t('Modals.AddBankModal.title')}
      </h2>
      <p className="text-sm md:text-base text-dark-200 font-normal leading-[140%] mb-5 text-center">
        {t('Modals.AddBankModal.description')}
      </p>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={clsx('w-full', isMobile && 'px-[1px] mx-[-1px]')}
      >
        <div className="flex flex-col gap-3.5 mb-5 md:mb-6">
          <BankDropdown
            options={mappedBanks}
            label={t('Modals.AddBankModal.bank_select')}
            defaultValue={mappedBanks?.[0]?.value}
            name="bankCode"
            control={control}
            labelClassName="text-sm font-medium"
            commandListClassName="!max-h-[300px]"
            iconArrowDownClassName="!text-dark-700"
            iconCloseClassName="!mr-[15px] !mt-[12px] !border border-neutral-400 !rounded-0 !text-dark-100 p-1"
          />
          <BaseInput
            name="bankAccountName"
            control={control}
            placeholder={t('Modals.AddBankModal.account_holder_placeholder')}
            label={t('Modals.AddBankModal.account_holder')}
            inputContainerClassName="!h-auto"
            labelClassname="text-sm font-medium opacity-100"
            leftIcon={
              <span className="icon icon-account text-xl text-green-500 before:!text-green-500" />
            }
            enableSpace
            showValidState
            inputClassName="!uppercase placeholder:!normal-case text-sm border !border-neutral-400 !text-dark-200 opacity-100"
            disabled={userBanks?.length > 0}
            rightIcon={
              userBanks?.length > 0 && (
                <span className="icon icon-lock text-green-500 before:!text-green-500 text-xl" />
              )
            }
          />
          <NumberInput
            name="bankAccountNumber"
            control={control}
            placeholder={t('Modals.AddBankModal.account_number_placeholder')}
            label={t('Modals.AddBankModal.account_number')}
            inputContainerClassName="!h-auto text-sm font-normal placeholder:!text-dark-200 !border-neutral-400"
            maxLength={255}
            showValidState
            isPhoneInput
            labelClassname="text-sm font-medium"
            leftIcon={
              <span className="icon icon-security text-xl text-green-500 before:!text-green-500" />
            }
          />
        </div>

        <Button
          type="submit"
          name="add-bank-button"
          id="add-bank-button"
          className="w-full !capitalize"
          disabled={isSubmitting || !isValid}
          isLoading={isSubmitting}
          variant={ButtonVariantsEnum.Secondary}
        >
          {t('Modals.AddBankModal.submit')}
        </Button>
      </form>
    </div>
  );

  return (
    <BaseModal
      modalId={ModalIdEnum.AddBank}
      size={ModalSizeEnum.Small}
      onClose={handleCloseModal}
      modalClassName="max-w-[366px] md:max-w-[432px] p-6 md:p-8"
    >
      {renderModal}
    </BaseModal>
  );
};
