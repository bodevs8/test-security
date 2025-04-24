import type { LimitDepositType } from '@/contexts/transaction';
import type { BankOption } from '@/types/component';
import type { DepositFlexpayFormType } from '@/types/deposit';
import { BankDropdown } from '@/components/BankDropdown';
import { AmountSelect, NumberInput } from '@/components/BaseInput';
import { Button } from '@/components/ui/button';
import { DEFAULT_CURRENCY_UNIT } from '@/constant/app';
import { MAX_AMOUNT_DEPOSIT, MIN_AMOUNT_DEPOSIT } from '@/constant/deposit';
import { ButtonSizeEnum, ButtonVariantsEnum } from '@/enums';
import { useDevice } from '@/hooks/utils';
import { formatNumberWithCommas } from '@/utils/format-currency';
import { createDepositFlexPaySchema } from '@/validations/deposit';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useController, useForm } from 'react-hook-form';

type FormFlexpayProps = {
  bankList: BankOption[];
  onSubmit: (data: DepositFlexpayFormType) => void;
  limit: LimitDepositType;
  isPending?: boolean;
};

const FormFlexpay = ({
  bankList,
  onSubmit,
  limit,
  isPending,
}: FormFlexpayProps) => {
  const t = useTranslations();
  const { isMobile } = useDevice();

  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(
      createDepositFlexPaySchema(t, MIN_AMOUNT_DEPOSIT, MAX_AMOUNT_DEPOSIT),
    ),
  });

  const { field: amountField } = useController({
    name: 'amount',
    control,
  });

  const amountPlaceholder = useMemo(() => {
    return t('Pages.Account.deposit.flexpay.form.amount.placeholder', {
      min: formatNumberWithCommas(limit.min / 1000),
      max: formatNumberWithCommas(limit.max / 1000),
      unit: process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresetClick = (preset: number) => {
    const formattedValue = formatNumberWithCommas(preset);
    amountField.onChange(formattedValue);
  };

  return (
    <div className="w-full mt-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx('flex flex-col w-full gap-6', {
          'mb-4': isMobile,
        })}
      >
        <div>
          <BankDropdown
            options={bankList}
            label={t('Pages.Account.deposit.flexpay.form.bank_select')}
            name="bank_code"
            control={control}
            labelClassName="text-[14px]"
            popoverTriggerClassName="text-[14px]"
          />
        </div>
        <div>
          <NumberInput
            {...register('amount')}
            label={t('Pages.Account.deposit.flexpay.form.amount.label')}
            control={control}
            convertRate={1000}
            isCurrency
            maxLength={10}
            labelClassname="text-[14px] leading-5 font-medium"
            placeholder={amountPlaceholder}
            inputClassName="text-[14px]"
            convertInfoClassname="text-[14px] font-meidum"
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
        <Button
          id="deposit-button"
          name="deposit-button"
          className="w-full !box-border max-w-[358px] mx-auto mt-2 deposit-form-btn disabled:!opacity-100"
          size={ButtonSizeEnum.LG}
          type="submit"
          variant={ButtonVariantsEnum.Default}
          disabled={isSubmitting || !isValid || isPending}
          isLoading={isSubmitting || isPending}
        >
          {t('Common.button.deposit')}
        </Button>
      </form>
    </div>
  );
};

export default FormFlexpay;
