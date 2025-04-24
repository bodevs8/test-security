'use client';

import type { LimitDepositType } from '@/contexts/transaction/flexpay-context';
import type { EwalletMethodEnum } from '@/enums';
import type { DepositEwalletParamsType } from '@/types/deposit';
import type {
  Control,
  ControllerRenderProps,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { AmountSelect, NumberInput } from '@/components/BaseInput';
import CancelPromotionModal from '@/components/Modals/CancelPromotionModal';
import DepositPromotionModal from '@/components/Modals/DepositPromotion';
import { Button } from '@/components/ui/button';
import { DEFAULT_CURRENCY_UNIT } from '@/constant/app';
import { ButtonSizeEnum, ButtonVariantsEnum } from '@/enums';
import { formatNumberWithCommas } from '@/utils/format-currency';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

type FormEwalletProps = {
  onSubmit: (data: DepositEwalletParamsType) => void;
  provider: string;
  wallet: EwalletMethodEnum;
  onAmountChange: (value: string) => void;
  register: UseFormRegister<DepositEwalletParamsType>;
  control: Control<DepositEwalletParamsType>;
  amountField: ControllerRenderProps<DepositEwalletParamsType>;
  handleSubmit: UseFormHandleSubmit<DepositEwalletParamsType>;
  isSubmitting: boolean;
  isValid: boolean;
  limit: LimitDepositType;
  isPending?: boolean;
  isMobile?: boolean;
};

const FormEwallet = ({
  onSubmit,
  register,
  control,
  amountField,
  handleSubmit,
  isSubmitting,
  isValid,
  onAmountChange,
  limit,
  isPending,
  isMobile,
}: FormEwalletProps) => {
  const t = useTranslations();

  const handlePresetClick = (preset: number) => {
    const formattedValue = formatNumberWithCommas(preset);
    onAmountChange(formattedValue);
  };
  const onSubmitEwallet = (data: DepositEwalletParamsType) => {
    onSubmit(data);
  };

  const amountPlaceholder = useMemo(() => {
    return t('Pages.Account.deposit.flexpay.form.amount.placeholder', {
      min: formatNumberWithCommas(limit.min / 1000),
      max: formatNumberWithCommas(limit.max / 1000),
      unit: process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return (
    <>
      <div
        className={clsx(
          'flex flex-col gap-8 w-full px-3 py-6 lg:p-6',
          !isMobile && '!pt-2',
          isMobile && '!py-0',
        )}
      >
        <form
          onSubmit={handleSubmit(onSubmitEwallet)}
          className="flex flex-col w-full gap-6"
        >
          <div>
            <NumberInput
              {...register('amount')}
              label={t('Pages.Account.deposit.codepay.form.amount.label')}
              control={control}
              convertRate={1000}
              isCurrency
              maxLength={10}
              placeholder={amountPlaceholder}
              labelClassname="text-[14px] leading-[140%]"
              inputClassName="text-[14px] leading-[140%]"
              convertInfoClassname="text-[14px] leading-[140%] font-medium"
            />
            <AmountSelect
              amountListNumber={4}
              minAmount={limit.min}
              maxAmount={limit.max}
              onChooseAmount={handlePresetClick}
              convertRate={1000}
              convertUnit={DEFAULT_CURRENCY_UNIT}
              value={amountField.value}
            />
          </div>
          <Button
            id="deposit-button"
            name="deposit-button"
            className="w-full !box-border max-w-[358px] mx-auto deposit-form-btn"
            size={ButtonSizeEnum.LG}
            variant={ButtonVariantsEnum.Default}
            type="submit"
            disabled={isSubmitting || !isValid || isPending}
            isLoading={isSubmitting || isPending}
          >
            {t('Common.button.deposit')}
          </Button>
          <DepositPromotionModal />
          <CancelPromotionModal
            onSuccess={() => {
              handleSubmit(onSubmitEwallet);
            }}
          />
        </form>
      </div>
    </>
  );
};

export default FormEwallet;
