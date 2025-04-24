import type { BaseInputProps } from '@/components/BaseInput';
import type { ChangeEvent } from 'react';
import { BaseInput } from '@/components/BaseInput';
import {
  DEFAULT_CURRENCY_UNIT,
  DEFAULT_NUMBER_INPUT_MAX_LENGTH,
} from '@/constant/app';
import { MIN_CARD_QUANTITY } from '@/constant/constants';
import { WithdrawOperatorEnum } from '@/enums/withdraw';

import PlusIcon from '@/public/images/account/withdraw/plus.webp';
import SubIcon from '@/public/images/account/withdraw/sub.webp';

import {
  convertCurrencyToNumber,
  formatNumberWithCommas,
} from '@/utils/format-currency';
import clsx from 'clsx';
import Image from 'next/image';
import { useController } from 'react-hook-form';

type NumberInputProps = BaseInputProps & {
  isCurrency?: boolean;
  convertUnit?: string;
  convertRate?: number;
  maxLength?: number;
  minAmount?: number;
  maxAmount?: number;
  convertInfoClassname?: string;
  isOperator?: boolean;
  isClearable?: boolean;
  isPhoneInput?: boolean;
  onActionQuantity?: (value: number) => void;
  onClearAction?: () => void;
};

const NumberInput = ({
  isCurrency,
  convertUnit = DEFAULT_CURRENCY_UNIT,
  convertRate,
  maxLength = DEFAULT_NUMBER_INPUT_MAX_LENGTH,
  convertInfoClassname,
  isOperator,
  onActionQuantity,
  isClearable,
  onClearAction,
  isPhoneInput,
  ...props
}: NumberInputProps) => {
  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
    defaultValue: props.value ?? '',
  });

  const handleClear = () => {
    field.onChange('');
    onClearAction?.();
  };

  const handleQuantity = (type: WithdrawOperatorEnum) => {
    const val = field.value ? BigInt(field.value.toString()) : BigInt(0);
    let quantity = val;

    if (
      quantity <= BigInt(MIN_CARD_QUANTITY) &&
      type === WithdrawOperatorEnum.Minus
    ) {
      return;
    }

    quantity =
      type === WithdrawOperatorEnum.Plus
        ? quantity + BigInt(1)
        : quantity - BigInt(1) >= BigInt(MIN_CARD_QUANTITY)
          ? quantity - BigInt(1)
          : quantity;

    const _formatter = quantity.toString();
    if (_formatter.length <= 255) {
      field.onChange(_formatter);
      onActionQuantity?.(Number(quantity));
    }
  };

  const formatValue = (value: string) => {
    // Remove leading zeros (except when value is just "0")
    if (!isPhoneInput && value.length > 0 && value.startsWith('0')) {
      value = value.replace(/^0+/, '');
    }

    const formattedValue = isCurrency ? formatNumberWithCommas(value) : value;
    field.onChange(formattedValue);
    props.onChange?.({
      target: {
        value: formattedValue,
      },
    } as ChangeEvent<HTMLInputElement>);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Remove non-digit characters
    const value = event.target.value.replace(/\D+/g, '');
    formatValue(value);
  };

  const handlePast = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    const pastedValue = text.replace(/\D/g, '');
    const {
      selectionStart = 0,
      selectionEnd = 0,
      value = '',
    } = event.currentTarget;

    const beforeSelection = value
      .slice(0, selectionStart ?? 0)
      .replace(/\D/g, '');
    const afterSelection = value.slice(selectionEnd ?? 0).replace(/\D/g, '');
    const COMMA_COUNT = isCurrency ? 2 : 0;
    const maxLengthValue = maxLength - COMMA_COUNT;

    const combinedValue = (
      beforeSelection +
      pastedValue +
      afterSelection
    ).slice(0, maxLengthValue);

    formatValue(combinedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClear();
    }
  };

  const renderConversionInfo = () => {
    if (!convertRate) {
      return null;
    }

    if (field.value) {
      return (
        <span
          className={clsx(
            'convert-info flex items-center gap-2',
            convertInfoClassname,
          )}
        >
          =&nbsp;
          {formatNumberWithCommas(
            convertCurrencyToNumber(field.value) * convertRate,
            convertUnit,
          )}
          <div className="flex justify-center items-center border border-neutral-400 rounded-[4px] size-[20px] overflow-hidden">
            <i
              onClick={handleClear}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
              className="icon-close text-[12px] text-icon-quaternary hover:text-icon-secondary !font-bold cursor-pointer"
            ></i>
          </div>
        </span>
      );
    }

    return (
      <span
        className={clsx(
          'convert-info [.input-error_&]:!text-disabled-30-light-200',
          convertInfoClassname,
        )}
      >
        {`1D = ${formatNumberWithCommas(convertRate)} ${convertUnit}`}
      </span>
    );
  };

  return (
    <>
      <BaseInput
        {...props}
        type="tel"
        maxLength={maxLength}
        onChange={handleChange}
        onPaste={handlePast}
      >
        <div className="flex items-center gap-2 text-green-500 text-[12px] font-medium leading-[140%]">
          {renderConversionInfo()}
        </div>
        {isOperator && (
          <div className="absolute right-[4px] top-0 text-white h-full flex items-center justify-center">
            <Image
              className={clsx('max-w-none', {
                'cursor-not-allowed': !field.value || Number(field.value) <= 1,
                'cursor-pointer': field.value && Number(field.value) > 1,
              })}
              src={SubIcon}
              alt="operator"
              width={20}
              height={20}
              onClick={() => handleQuantity(WithdrawOperatorEnum.Minus)}
            />
            <Image
              className="max-w-none ml-2 cursor-pointer"
              src={PlusIcon}
              alt="operator"
              width={20}
              height={20}
              onClick={() => handleQuantity(WithdrawOperatorEnum.Plus)}
            />
          </div>
        )}
        {isClearable && (
          <div className="absolute right-[4px] top-0 h-full flex items-center justify-center">
            <i
              onClick={handleClear}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
              className="icon-close text-[12px] text-secondary-blue-300 hover:text-error-red-200 !font-bold cursor-pointer"
            ></i>
          </div>
        )}
      </BaseInput>
    </>
  );
};

export { NumberInput };
