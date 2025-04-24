import type { ChangeEvent, InputHTMLAttributes } from 'react';
import type { Control, RegisterOptions } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { DEFAULT_INPUT_MAX_LENGTH } from '@/constant/app';
import { ButtonVariantsEnum } from '@/enums';
import { useDevice, usePasteHandler } from '@/hooks/utils';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import { useController } from 'react-hook-form';
import '@/styles/base/input.scss';

type BaseInputProps = {
  name: string;
  control?: Control<any>;
  rules?: RegisterOptions;
  label?: string;
  labelClassname?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  pasteText?: boolean;
  onPasteText?: (text: string) => void;
  error?: string;
  disabled?: boolean;
  showValidState?: boolean;
  className?: string;
  inputClassName?: string;
  enableSpace?: boolean;
  enableSpecialCharater?: boolean;
  inputContainerClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

// Controlled Input Component (with React Hook Form)
const BaseInput = ({
  ref,
  name,
  control,
  rules,
  children,
  value,
  label,
  labelClassname,
  inputContainerClassName,
  leftIcon,
  rightIcon,
  pasteText,
  inputClassName,
  disabled,
  className,
  readOnly,
  showValidState,
  enableSpace,
  enableSpecialCharater = true,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onPasteText,
  ...props
}: BaseInputProps & { ref?: any }) => {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name,
    control,
    rules,
    defaultValue: value ?? '',
  });
  const t = useTranslations();
  const { handlePaste, isPaste } = usePasteHandler(onPasteText, field);
  const { isIOS } = useDevice();
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      if (!enableSpace) {
        event.target.value = event.target.value.replace(/\s/g, '');
      }
      if (!enableSpecialCharater) {
        event.target.value = event.target.value.replace(/[^a-z0-9 ]/g, '');
      }

      field.onChange(event.target.value);

      onChange?.(event);
    },
    [enableSpace, field, onChange, enableSpecialCharater],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>): void => {
      field.onBlur();
      onBlur?.(event);
    },
    [field, onBlur],
  );

  const inputProps = useMemo(
    () => ({
      ...props,
      disabled: disabled || isSubmitting,
      value: field.value,
      onChange: handleChange,
      onBlur: handleBlur,
      error: error?.message,
    }),
    [
      field.value,
      error?.message,
      disabled,
      isSubmitting,
      props,
      handleChange,
      handleBlur,
    ],
  );

  return (
    <div
      className={clsx(
        'base-input w-full',
        error?.message && 'input-error',
        className,
      )}
    >
      {label && (
        <label
          className={clsx([
            'block mb-1 text-sm font-medium',
            'text-dark-700 capitalize',
            labelClassname,
            {
              'opacity-50': disabled,
            },
          ])}
        >
          {label}
        </label>
      )}
      <div
        className={clsx(
          'relative h-full rounded-[4px]',
          {
            group:
              !error?.message && !disabled && (!showValidState || !field.value),
          },
          inputContainerClassName,
        )}
      >
        {leftIcon && (
          <div
            className={clsx(
              'absolute left-4 top-0 text-dark-100 h-full flex items-center justify-center',
            )}
          >
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          type="text"
          className={clsx([
            'w-full !box-border bg-primary-light-100 text-dark-700 rounded-[4px] px-4 max-h-full font-medium text-sm leading-[140%]',
            'placeholder:text-primary-dark-200 placeholder:text-sm placeholder:font-normal',
            'h-10',
            'focus:outline-none focus:ring-1',
            'border border-transparent focus:border-green-200 focus:!ring-0',
            'group-hover:border-green-200',
            {
              '!border-error !text-red-500': error?.message,
              'opacity-50': disabled,
              '!border-green-500':
                showValidState && field.value && !error?.message,
              'pl-12': leftIcon,
              'pr-20': rightIcon,
            },
            inputClassName,
            {
              '!text-base': isIOS,
            },
          ])}
          {...inputProps}
          maxLength={inputProps.maxLength || DEFAULT_INPUT_MAX_LENGTH}
        />
        {rightIcon && (
          <div className="absolute right-[14px] top-0 text-primary-blue-400 h-full flex items-center justify-center">
            {rightIcon}
          </div>
        )}
        {pasteText && (
          <div className="absolute right-1 top-0 text-secondary-blue-300 h-full flex items-center justify-center">
            <Button
              id="paste-button"
              name="paste-button"
              type="button"
              variant={ButtonVariantsEnum.Transparent}
              className="text-green-500 !font-medium !text-[12px] !leading-[140%] pr-3 !normal-case"
              onClick={handlePaste}
            >
              {isPaste ? t('Common.button.pasted') : t('Common.button.paste')}
            </Button>
          </div>
        )}
        {children && (
          <div className="absolute right-[14px] top-0 text-tertiary-blue-300 h-full flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
      {error?.message && (
        <p className="text-red-500 text-[12px] mt-1 text-left">
          {error?.message}
        </p>
      )}
    </div>
  );
};

BaseInput.displayName = 'BaseInput';

export { BaseInput };
export type { BaseInputProps };
