import type { RadioOption } from '@/types/app';
import type { ChangeEvent } from 'react';
import clsx from 'clsx';

type BaseRadioProps = {
  options: RadioOption[];
  value?: string | number;
  name: string;
  onChange: (value: string | number) => void;
  className?: string;
  disabled?: boolean;
};

export function BaseRadio({
  options,
  value,
  name,
  onChange,
  className = '',
  disabled = false,
}: BaseRadioProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={clsx('flex gap-6 items-center flex-wrap', className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className={clsx('flex items-center gap-2 cursor-pointer', {
            'opacity-50 cursor-not-allowed': option.disabled || disabled,
          })}
        >
          <div className="relative flex items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              disabled={option.disabled || disabled}
              className="peer w-5 h-5 cursor-pointer appearance-none rounded-full border border-neutral-300 checked:border-secondary-300 checked:border-[8px]"
            />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-neutral-500 peer-checked:w-3 peer-checked:h-3 peer-checked:bg-white pointer-events-none" />
          </div>
          <span className="text-[14px] leading-5 text-neutral-100">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
