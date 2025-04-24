import type { BaseInputProps } from '@/components/BaseInput';
import type { ChangeEvent, RefObject } from 'react';
import { BaseInput } from '@/components/BaseInput';
import { Button } from '@/components/ui/button';
import { ButtonVariantsEnum } from '@/enums';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { useController } from 'react-hook-form';

type Props = Omit<BaseInputProps, 'ref'> & {
  showCancelButton?: boolean;
  onClear?: () => void;
  onCancel?: () => void;
  watchValue?: boolean;
  ref?: RefObject<HTMLInputElement | null>;
};

const SearchInput = ({
  ref,
  showCancelButton = true,
  watchValue = false,
  onClear,
  onCancel,
  ...props
}: Props) => {
  const t = useTranslations();
  const internalRef = useRef<HTMLInputElement>(null);

  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
    defaultValue: props.value ?? '',
  });

  const clearInput = () => {
    field.onChange('');
    const syntheticEvent = {
      target: { value: '' },
      currentTarget: { value: '' },
    } as ChangeEvent<HTMLInputElement>;

    props.onChange?.(syntheticEvent);
    onClear?.();

    if (internalRef.current) {
      internalRef.current.focus();
    }
  };

  const assignRef = (el: HTMLInputElement) => {
    internalRef.current = el;
    if (ref) ref.current = el;
  };

  useEffect(() => {
    if (watchValue) {
      field.onChange(props.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchValue, props.value]);

  return (
    <BaseInput
      ref={assignRef}
      {...props}
      inputClassName={clsx(props.inputClassName, 'h-10 ', {
        '!pr-[120px]': showCancelButton && field.value,
      })}
      leftIcon={<i className="icon-search text-[20px] text-cta-primary" />}
    >
      <div className="absolute right-0 flex items-center justify-center w-max">
        {field.value && (
          <Button
            type="button"
            className="items-center p-0 rounded-md transition-colors hover:bg-[unset] cursor-pointer"
            onClick={clearInput}
            aria-label="Clear search"
            name="search-btn-clear"
            id="search-btn-clear"
            variant={ButtonVariantsEnum.Ghost}
          >
            <div className="flex items-center justify-center bg-primary-light-300 w-[20px] h-[20px] rounded-full">
              <i className="icon-close text-[14px] text-white" />
            </div>
          </Button>
        )}
        {showCancelButton && (
          <Button
            type="button"
            onClick={onCancel}
            className="cancel-search-button flex gap-3 items-center cursor-pointer hover:!bg-transparent md:!hidden"
            name="search-btn-close"
            id="search-btn-close"
            variant={ButtonVariantsEnum.Ghost}
          >
            {!!field.value && (
              <div className="w-[1px] h-[11px] bg-neutral-300" />
            )}

            <p className="text-sm uppercase font-medium text-cta-primary">
              {t('Common.close')}
            </p>
          </Button>
        )}
      </div>
    </BaseInput>
  );
};

SearchInput.displayName = 'SearchInput';

export { SearchInput };
