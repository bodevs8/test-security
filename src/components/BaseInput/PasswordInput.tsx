'use client';

import type { BaseInputProps } from '@/components/BaseInput';
import { BaseInput } from '@/components/BaseInput';
import clsx from 'clsx';
import { useState } from 'react';

type PasswordInputProp = BaseInputProps & {
  hideLeftIcon?: boolean;
  iconClassName?: string;
};

const PasswordInput = ({
  hideLeftIcon,
  iconClassName,
  leftIcon,
  ...props
}: PasswordInputProp) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleInputType = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <BaseInput
      type={isShowPassword ? 'text' : 'password'}
      inputClassName="bg-neutral-600 pr-10"
      {...props}
      {...(hideLeftIcon
        ? {}
        : {
            leftIcon: leftIcon || (
              <i className={clsx('icon-lock text-[20px]', iconClassName)} />
            ),
          })}
    >
      <button
        type="button"
        onClick={toggleInputType}
        className="flex items-center focus:outline-none"
        aria-label={isShowPassword ? 'Hide password' : 'Show password'}
      >
        <i
          className={clsx(
            'text-[20px] text-icon-primary',
            iconClassName,
            isShowPassword ? 'icon-eye' : 'icon-eye-close',
          )}
          aria-hidden="true"
        />
      </button>
    </BaseInput>
  );
};

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
