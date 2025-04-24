'use client';

import type { OptionType } from '@/types/app';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useClickOutside, useDevice } from '@/hooks/utils';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef, useState } from 'react';

type OptionMultiSelect = OptionType & {
  icon?: string;
  iconImage?: string;
  iconActiveImage?: string;
};

type BaseMultiSelectProps = {
  options: OptionMultiSelect[];
  defaultOption?: OptionMultiSelect;
  className?: string;
  optionClassName?: string;
  optionItemClassName?: string;
  optionWrapperClassName?: string;
  placeholder?: string;
  initialValues?: (string | number)[];
  showMobile?: boolean;
  multiOption?: boolean;
  title?: string;
  isDisabled?: boolean;
  onChange?: (value: (string | number)[]) => void;
  isImageUrlIcon?: boolean;
  isIconCheck?: boolean;
};

export function BaseMultiSelect({
  options,
  defaultOption,
  className = '',
  optionClassName = '',
  multiOption = true,
  title,
  optionItemClassName = '',
  optionWrapperClassName = '',
  initialValues,
  placeholder,
  showMobile,
  isDisabled,
  onChange,
  isImageUrlIcon = false,
  isIconCheck = false,
}: BaseMultiSelectProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useDevice();
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    initialValues || [],
  );
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelectChange = (value: string | number) => {
    const updatedValues = !multiOption
      ? [value]
      : selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];

    if (!multiOption) {
      setIsOpen(false);
    }
    setSelectedValues(updatedValues);
    onChange?.(updatedValues);
  };

  useClickOutside(selectRef, () => {
    setIsOpen(false);
  });

  const handleUnSelect = () => {
    if (selectedValues.length === 0) {
      return;
    }
    setSelectedValues([]);
    onChange?.([]);
  };

  const renderOption = () => {
    return (
      <>
        <div
          className={clsx(
            'max-h-[400px] h-[70vh] md:h-fit md:max-h-[40vh] xl:max-h-[310px] overflow-y-auto custom-scrollbar multi-select-option-list',
            optionWrapperClassName,
          )}
        >
          {options.map((option, index) => {
            const isSelected = selectedValues.includes(option.value);

            return (
              <button
                type="button"
                key={`option-${option.value}-${index}`}
                className={clsx(
                  'relative select-item mt-2 rounded-md first:mt-0 text-dark-200 outline-0 text-sm leading-5 font-medium cursor-pointer py-3 pl-4 pr-2 flex items-center gap-2 !min-h-[40px] hover:text-primary-200 whitespace-pre-wrap w-full',
                  'hover:bg-primary-light-100 hover:text-dark-700',
                  {
                    disabled: option.disabled,
                    '!text-green-500': isSelected,
                  },
                  optionItemClassName,
                )}
                onClick={() =>
                  !option.disabled && handleSelectChange(option.value)
                }
              >
                {multiOption && (
                  <div
                    className={clsx(
                      'size-5 border border-primary-light-400 rounded-sm text-dark-200 bg-white',
                      {
                        'flex items-center justify-center !bg-green-500 !text-white border-none':
                          isSelected,
                      },
                    )}
                  >
                    {isSelected && <i className="icon-success text-xs" />}
                  </div>
                )}
                <>
                  {option.iconImage && (
                    <>
                      <Image
                        src={String(option.iconActiveImage || option.icon)}
                        alt={String(option.label)}
                        width={20}
                        height={20}
                      />
                    </>
                  )}
                  {isImageUrlIcon && (
                    <Image
                      src={String(option.iconImage || option.icon)}
                      alt={String(option.label)}
                      width={20}
                      height={20}
                      className="rounded-full bg-white size-5 !object-contain"
                    />
                  )}
                  {!isImageUrlIcon && option.icon && !option.iconImage && (
                    <i
                      className={clsx(option.icon, 'text-xl text-green-500')}
                    />
                  )}
                </>
                <span className="text-sm font-medium">{option.label}</span>
                {isIconCheck && isSelected && !multiOption && (
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    <i className="icon-success text-secondary-300" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {multiOption && (
          <button
            type="button"
            id="un-select-button"
            name="un-select-button"
            onClick={handleUnSelect}
            disabled={selectedValues.length === 0}
            className={clsx(
              'block lg:cursor-pointer w-full py-4 text-sm !capitalize leading-5 text-center !text-green-500 hover:!text-green-300',
              {
                '!text-dark-200 !cursor-not-allowed pointer-events-none opacity-50':
                  selectedValues.length === 0,
              },
            )}
          >
            {t('Common.base_multi_select.un_selected')}
          </button>
        )}
      </>
    );
  };

  return (
    <div ref={selectRef} className="multi-select relative">
      <button
        type="button"
        className={clsx(
          'select-trigger flex group justify-between items-center cursor-pointer bg-primary-light-100 h-10 w-full text-dark-700 rounded-[4px] outline-0 base-select border border-transparent hover:border-green-200 overflow-hidden',
          { '!bg-primary-light-50 !text-dark-400-50': isDisabled },
          { '!border-green-500': isOpen },
          className,
        )}
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
      >
        <div className="!box-border flex justify-between items-center h-full w-full px-3 overflow-hidden">
          <div className="select-value min-w-0 flex items-center gap-1.5 flex-1 text-sm font-medium">
            {defaultOption?.icon && isImageUrlIcon && (
              <Image
                src={String(defaultOption.icon)}
                alt={String(defaultOption.label)}
                width={20}
                height={20}
                className="rounded-full bg-white flex-shrink-0 filter-pink"
              />
            )}
            {defaultOption?.icon && !isImageUrlIcon && (
              <i
                className={clsx(
                  'text-xl flex-shrink-0 text-green-500',
                  { '!text-dark-400-50': isDisabled },
                  { '!text-green-500': isOpen },
                  defaultOption.icon,
                )}
              />
            )}
            <span className="truncate text-left">
              {defaultOption?.label || t('Common.base_multi_select.default')}
            </span>
            {multiOption && selectedValues.length > 0 && (
              <span className="!w-4 h-4 rounded-full bg-[#F33F07] text-white text-[10px] flex items-center justify-center pr-[1px] flex-shrink-0">
                {selectedValues.length}
              </span>
            )}
          </div>
          <i
            className={clsx('icon-arrow-down text-[12px] ml-1 select-icon', {
              'rotate-180 text-green-500': isOpen,
            })}
          />
        </div>
      </button>
      {(isMobile || showMobile) && (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent ref={selectRef as React.RefObject<HTMLDivElement>}>
            <DrawerHeader>
              <DrawerTitle
                ref={selectRef as React.RefObject<HTMLHeadingElement>}
              >
                {title || placeholder}
                <button
                  className="absolute right-2 top-2 text-[24px] size-8 text-dark-200 border border-light-200-30 rounded-sm"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  <i className="icon-close"></i>
                </button>
              </DrawerTitle>
            </DrawerHeader>
            {renderOption()}
          </DrawerContent>
        </Drawer>
      )}
      {isOpen && !isMobile && !showMobile && (
        <div
          className={clsx(
            'absolute z-49 top-[calc(100%+12px)] left-0 w-full rounded-[6px] bg-white pt-4 px-3 dropdown-shadow-secondary',
            optionClassName,
          )}
        >
          {renderOption()}
        </div>
      )}
    </div>
  );
}
