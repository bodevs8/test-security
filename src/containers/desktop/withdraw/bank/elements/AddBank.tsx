'use client';
import { BankDropdown } from '@/components/BankDropdown';
import { BaseInput, NumberInput } from '@/components/BaseInput';
import { Button } from '@/components/ui/button';
import { DEFAULT_INPUT_MAX_LENGTH } from '@/constant/app';
import { ButtonVariantsEnum } from '@/enums';
import { useAddBankForm } from '@/hooks/account';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

type AddBankWithdrawProps = {
  isMobile?: boolean;
};

const AddBankWithdraw = ({ isMobile }: AddBankWithdrawProps) => {
  const t = useTranslations('Pages.Account.bank_information');
  const { form, mappedBanks, handleSubmit } = useAddBankForm();
  const {
    control,
    formState: { isSubmitting, isValid },
  } = form;

  return (
    <div
      className={clsx(
        'md:p-4 2xl:p-6 deposit-form-container relative h-fit min-h-[288px] md:min-h-[256px] bg-primary-light-0 rounded-lg',
        {
          '!pb-0 !min-h-[200px]': isMobile,
        },
      )}
    >
      <div className="flex flex-col items-center gap-[45px]">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={clsx('w-full flex flex-col gap-6', {
            '!gap-0': isMobile,
          })}
        >
          <div className="flex flex-col gap-4">
            <BankDropdown
              options={mappedBanks}
              label={t('choose_bank')}
              placeholder={t('choose_bank_placeholder')}
              defaultValue={mappedBanks?.[0]?.value}
              name="bankCode"
              control={control}
              showIconPlaceholder
              labelClassName="capitalize font-medium"
            />
          </div>
          <div
            className={clsx('flex gap-4', {
              '!flex-col mt-4': isMobile,
            })}
          >
            <BaseInput
              name="bankAccountName"
              control={control}
              placeholder={t('account_holder_placeholder')}
              label={t('account_holder')}
              inputContainerClassName="!h-auto"
              enableSpace
              showValidState
              leftIcon={
                <span className="icon icon-account text-xl text-green-500 before:!text-green-500" />
              }
              inputClassName="!uppercase placeholder:!normal-case placeholder:text-dark-200 placeholder:font-normal text-sm text-dark-700"
            />
            <NumberInput
              name="bankAccountNumber"
              control={control}
              placeholder={t('account_number_placeholder')}
              label={t('account_number')}
              inputContainerClassName="!h-auto"
              isPhoneInput
              inputClassName="text-ellipsis placeholder:text-dark-200 placeholder:font-normal text-sm text-dark-700"
              maxLength={DEFAULT_INPUT_MAX_LENGTH}
              leftIcon={
                <span className="icon icon-security text-xl text-green-500 before:!text-green-500" />
              }
              showValidState
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              name="add-bank-button"
              id="add-bank-button"
              className="w-[358px] max-w-full deposit-form-btn disabled:!opacity-100"
              disabled={isSubmitting || !isValid}
              isLoading={isSubmitting}
              variant={ButtonVariantsEnum.Secondary}
            >
              {t('add_bank_submit')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBankWithdraw;
