'use client';

import type { RadioOption } from '@/types/app';
import type { DepositCodepayParamsType } from '@/types/deposit';
import { AmountSelect, NumberInput } from '@/components/BaseInput';
import CancelPromotionModal from '@/components/Modals/CancelPromotionModal';
import DepositPromotionModal from '@/components/Modals/DepositPromotion';
import ErrorCodepayModal from '@/components/Modals/ErrorCodepayModal';
import { Button } from '@/components/ui/button';
import { DEFAULT_CURRENCY_UNIT } from '@/constant/app';
import { MAX_AMOUNT_DEPOSIT, MIN_AMOUNT_DEPOSIT } from '@/constant/deposit';
import { ButtonSizeEnum, PackageIdEnum } from '@/enums';
import { formatNumberWithCommas } from '@/utils/format-currency';
import { createDepositCodePaySchema } from '@/validations/deposit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useController, useForm } from 'react-hook-form';
import Package from './Package';

type FormCodepayProps = {
  packages: RadioOption[];
  onSubmit: (data: DepositCodepayParamsType) => void;
  isPending?: boolean;
};

const FormCodepay = ({ packages, onSubmit, isPending }: FormCodepayProps) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const packageIdFromUrl = searchParams.get('packageId');

  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(
      createDepositCodePaySchema(t, MIN_AMOUNT_DEPOSIT, MAX_AMOUNT_DEPOSIT),
    ),
  });

  const amountPlaceholder = useMemo(() => {
    return t('Pages.Account.deposit.codepay.form.amount.placeholder', {
      min: formatNumberWithCommas(MIN_AMOUNT_DEPOSIT / 1000),
      max: formatNumberWithCommas(MAX_AMOUNT_DEPOSIT / 1000),
      unit: process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { field } = useController({
    name: 'packageId',
    control,
    defaultValue: packageIdFromUrl
      ? Number(packageIdFromUrl)
      : Number(packages?.[0]?.value ?? PackageIdEnum.Return),
  });

  const { field: amountField } = useController({
    name: 'amount',
    control,
  });

  const handlePresetClick = (preset: number) => {
    const formattedValue = formatNumberWithCommas(preset);
    amountField.onChange(formattedValue);
  };

  const onSubmitCodepay = (data: DepositCodepayParamsType) => {
    onSubmit(data);
  };

  function handleChangeStatus(
    value: string | number | (string | number)[],
  ): void {
    field.onChange(Number(value));
  }

  return (
    <>
      <div className="flex flex-col gap-6 w-full">
        <div className="md:flex flex-col gap-1 justify-center items-center w-full uppercase text-center">
          <div className="text-dark-700 text-[14px] md:text-[18px] font-bold leading-[21px]">
            {t('Pages.Account.deposit.codepay.form.header.title')}
          </div>
          <div className="text-[14px] md:text-[18px] leading-[18px] text-dark-700 font-bold">
            {t('Pages.Account.deposit.codepay.form.header.content')}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmitCodepay)}
          className="flex flex-col w-full gap-6"
        >
          <div>
            <NumberInput
              {...register('amount')}
              label={t('Pages.Account.deposit.codepay.form.amount.label')}
              control={control}
              convertRate={1000}
              isCurrency
              maxLength={9}
              labelClassname="text-[14px] leading-5 font-medium"
              placeholder={amountPlaceholder}
              inputClassName="text-[14px] !bg-primary-light-50 md:!bg-primary-light-100"
              convertInfoClassname="text-[12px] font-medium"
            />
            <AmountSelect
              amountListNumber={8}
              minAmount={MIN_AMOUNT_DEPOSIT}
              maxAmount={MAX_AMOUNT_DEPOSIT}
              onChooseAmount={handlePresetClick}
              convertRate={1000}
              convertUnit={DEFAULT_CURRENCY_UNIT}
              value={amountField.value}
            />
          </div>
          <div>
            <div className="text-dark-700 text-[14px] font-medium leading-5 mb-1">
              {t('Pages.Account.deposit.codepay.form.package.label')}
            </div>
            <Package
              packages={packages}
              value={field.value}
              onChange={handleChangeStatus}
            />
          </div>
          <Button
            id="deposit-button"
            name="deposit-button"
            className="w-full !box-border max-w-[358px] mx-auto md:mb-2 deposit-form-btn disabled:!opacity-100 !text-white !capitalize font-medium "
            size={ButtonSizeEnum.LG}
            type="submit"
            disabled={isSubmitting || !isValid || isPending}
            isLoading={isSubmitting || isPending}
          >
            {t('Common.button.deposit')}
          </Button>
          <DepositPromotionModal />
          <ErrorCodepayModal />
          <CancelPromotionModal
            onSuccess={() => {
              handleSubmit(onSubmitCodepay);
            }}
          />
        </form>
      </div>
    </>
  );
};

export default FormCodepay;
