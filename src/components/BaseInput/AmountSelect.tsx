'use client';
import { Button } from '@/components/ui/button';
import { DEFAULT_CURRENCY_UNIT } from '@/constant/app';
import {
  MAX_AMOUNT_DEPOSIT,
  MIN_AMOUNT_DEPOSIT,
  PRESET_AMOUNT_DEPOSIT,
} from '@/constant/deposit';
import { ButtonVariantsEnum } from '@/enums';
import {
  convertCurrencyToNumber,
  formatNumberWithCommas,
} from '@/utils/format-currency';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

type AmountSelectProps = {
  isCurrency?: boolean;
  convertUnit?: string;
  convertRate?: number;
  maxLength?: number;
  amountListNumber?: number;
  minAmount?: number;
  maxAmount?: number;
  onChooseAmount?: (amount: number) => void;
  value?: number | string;
  customAmounts?: number[];
  buttonClassName?: string;
};

export const AmountSelect = ({
  convertRate,
  minAmount = MIN_AMOUNT_DEPOSIT,
  maxAmount = MAX_AMOUNT_DEPOSIT,
  amountListNumber,
  onChooseAmount,
  value,
  customAmounts,
  buttonClassName,
}: AmountSelectProps) => {
  const [amountValue, setAmountValue] = useState<number | string | null>(
    value ?? null,
  );

  const unit = useMemo(() => {
    if (convertRate) {
      return process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT || '';
    }
    return DEFAULT_CURRENCY_UNIT;
  }, [convertRate]);

  const presetAmounts = useMemo(() => {
    if (customAmounts && customAmounts?.length > 0) {
      return customAmounts;
    }
    const convert = convertRate ?? 1;
    const min = minAmount / convert;
    const max = maxAmount / convert;
    const amountLength = amountListNumber ?? 2;

    const validAmounts = PRESET_AMOUNT_DEPOSIT.filter(
      (amount) => amount > min && amount < max,
    );

    const distributionIndices = Array.from(
      { length: amountLength - 2 },
      (_, index) => {
        if (index === 0) return validAmounts[0]; // First valid amount
        if (index === amountLength - 2) return validAmounts.length - 1; // Last valid amount

        return validAmounts[
          Math.floor((validAmounts.length * index) / (amountLength - 1))
        ];
      },
    );

    const result = [min, ...distributionIndices, max];

    return result;
  }, [minAmount, maxAmount, convertRate, amountListNumber, customAmounts]);

  const handleChooseAmount = (amount: number) => {
    setAmountValue(amount);
    onChooseAmount?.(amount);
  };

  useEffect(() => {
    setAmountValue(convertCurrencyToNumber(value?.toString() ?? '') ?? null);
  }, [value]);

  return (
    <div className="grid grid-cols-4 gap-1 mt-3 md:mt-4">
      {presetAmounts.map((preset) => (
        <Button
          id={preset!.toString()}
          name={preset!.toString()}
          key={preset!}
          variant={ButtonVariantsEnum.Secondary}
          type="button"
          onClick={() => handleChooseAmount?.(preset!)}
          className={clsx(
            '!rounded-[4px] !bg-white !text-[14px] min-[390px]:!text-[14px] !font-bold button-amount-select !outline-[1px] !outline-primary-light-400 !text-dark-700',
            'hover:!text-green-500 hover:!outline-green-500',
            buttonClassName,
            {
              '!text-green-500 !outline-green-500 !bg-green-80':
                amountValue === preset,
            },
          )}
        >
          {formatNumberWithCommas(preset!, unit)}
        </Button>
      ))}
    </div>
  );
};
