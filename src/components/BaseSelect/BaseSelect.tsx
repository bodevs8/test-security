'use client';
import type { OptionType } from '@/types/app';
import { CustomDrawer } from '@/components/CustomDrawer';
import { DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { ALL_VALUE } from '@/constant/transaction';
import { SelectStyleTypeEnum, TextTransformEnum } from '@/enums';
import { useClickOutside, useDevice } from '@/hooks/utils';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';

type BaseSelectProps = {
  options: OptionType[];
  isMultiSelect?: boolean;
  selectPlaceholder?: string;
  className?: string;
  optionClassName?: string;
  optionWrapperClassName?: string;
  overlayClassName?: string;
  optionItemClassName?: string;
  initialValues?: string | number | (string | number)[] | undefined;
  isDisabled?: boolean;
  drawerTitle?: string;
  contentClassName?: string;
  renderNode?: (value: OptionType) => React.ReactNode;
  onChange?: (value: string | number | (string | number)[]) => void;
  selectTextTransform?: TextTransformEnum;
  styleType?: SelectStyleTypeEnum;
};

export const BaseSelect = ({
  options,
  isMultiSelect = false,
  selectPlaceholder = '',
  className = '',
  optionClassName = '',
  optionItemClassName = '',
  initialValues,
  isDisabled,
  drawerTitle,
  onChange,
  renderNode,
  contentClassName,
  selectTextTransform = TextTransformEnum.NONE,
  styleType = SelectStyleTypeEnum.Primary,
}: BaseSelectProps) => {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    () => {
      if (Array.isArray(initialValues)) {
        return initialValues;
      }
      if (initialValues) {
        return [initialValues];
      }
      return [];
    },
  );
  const [key, setKey] = useState<number>(+new Date());
  const { isMobile } = useDevice();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useClickOutside(selectRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (
      typeof initialValues === 'string' ||
      typeof initialValues === 'number'
    ) {
      setSelectedValues([initialValues]);
    } else if (Array.isArray(initialValues)) {
      setSelectedValues(initialValues);
    } else {
      setSelectedValues([]);
    }
  }, [initialValues]);

  const handleSelectChange = (value: string | number) => {
    setKey(+new Date());
    const updatedValues = isMultiSelect
      ? selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value]
      : [value];

    setSelectedValues(updatedValues);
    if (onChange) {
      onChange(isMultiSelect ? updatedValues : value);
    }
  };

  const isSelected = (value: string | number) => {
    return (
      selectedValues.includes(value) ||
      (selectedValues[0] === '' && value === ALL_VALUE)
    );
  };

  const displayValue = useMemo(() => {
    if (selectedValues[0] === ALL_VALUE) {
      return selectPlaceholder;
    }
    const selectedOption = options.find(
      (option) => String(option.value) === String(selectedValues[0]),
    );
    return selectedOption?.label || selectedValues[0] || '';
  }, [selectedValues, options, selectPlaceholder]);

  const renderOption = (options: OptionType[]) => {
    return (
      <>
        {options.map((option, index) => (
          <Select.Item
            key={option.value}
            value={String(option.value)}
            className={clsx(
              'select-item text-dark-200 text-[14px] font-medium outline-0 cursor-pointer hover:bg-cta-tertiary hover:text-dark-700 hover:rounded-[6px] px-4 py-3 flex items-center justify-between gap-2 !min-h-[44px] hover:text-tertiary-blue-300 whitespace-pre-wrap h-11',
              {
                '!text-green-500': isSelected(option.value),
                disabled: option.disabled,
                'mt-2': index !== 0,
              },
              optionItemClassName,
            )}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            {renderNode && (
              <Select.ItemText>{renderNode(option)}</Select.ItemText>
            )}
            {!renderNode && <Select.ItemText>{option.label}</Select.ItemText>}
            {isSelected(option.value) && (
              <Select.ItemIndicator className="item-indicator">
                <i className="icon-success text-[16px] text-green-500" />
              </Select.ItemIndicator>
            )}
          </Select.Item>
        ))}
      </>
    );
  };

  const renderMobile = () => {
    return (
      <CustomDrawer
        open={isOpen}
        handleOpen={setIsOpen}
        contentClassName={clsx('!h-fit !px-0', contentClassName)}
        overlayClassName="z-[54]"
        refContent={selectRef as React.RefObject<HTMLDivElement>}
      >
        <DrawerHeader>
          <DrawerTitle ref={selectRef as React.RefObject<HTMLHeadingElement>}>
            <div className="text-primary-blue-500 text-[16px] leading-[140%] font-medium">
              {drawerTitle || selectPlaceholder}
            </div>
            <button
              className="flex items-center justify-center rounded-[4px] !w-8 !h-8 !p-0 absolute top-[6px] right-[6px] bg-primary-light-0 border border-neutral-400"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <i className="icon-close text-6 text-dark-100 font-bold group-hover:text-green-neon-500"></i>
            </button>
          </DrawerTitle>
        </DrawerHeader>
        <div className="drawer-select" aria-hidden={false}>
          <Select.Content className="!pointer-events-auto z-[54000]">
            <Select.Viewport>{renderOption(options)}</Select.Viewport>
          </Select.Content>
        </div>
      </CustomDrawer>
    );
  };

  const renderDesktop = () => {
    return (
      <Select.Portal>
        <Select.Content
          side="bottom"
          sideOffset={10}
          position="popper"
          className={clsx(
            'w-full px-3 py-4 select-content bg-primary-light-0 !shadow-[0px_4px_47.7px_0px_#0719720D,0px_2px_12px_0px_#07197212] !rounded-[6px]',
            optionClassName,
          )}
        >
          <Select.ScrollUpButton />
          <Select.Viewport>{renderOption(options)}</Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    );
  };

  return (
    <>
      <Select.Root
        key={key}
        onValueChange={handleSelectChange}
        onOpenChange={setIsOpen}
        open={isMobile ? isOpen : undefined}
        value={isMultiSelect ? undefined : String(selectedValues[0] ?? '')}
        disabled={isDisabled}
      >
        <Select.Trigger
          className={clsx(
            'select-trigger !box-border flex justify-between items-center cursor-pointer text-dark-700 h-[40px] w-full outline-0 base-select overflow-hidden rounded-[4px]',
            {
              'hover:outline hover:outline-primary-light-500 hover:text-dark-200':
                !isDisabled,
              'bg-cta-tertiary': styleType === SelectStyleTypeEnum.Primary,
              'bg-secondary-light-200':
                styleType === SelectStyleTypeEnum.Secondary,
              'disabled bg-primary-light-50 border border-primary-light-150 text-dark-400-50 cursor-not-allowed pointer-events-[all] hover:!outline-0':
                isDisabled,
            },
            className,
          )}
        >
          <div className="!box-border flex justify-between items-center h-full w-full px-4 overflow-hidden">
            <div
              className={clsx(
                'select-value overflow-hidden whitespace-nowrap text-ellipsis text-[14px] font-medium',
                selectTextTransform,
              )}
            >
              <Select.Value
                placeholder={selectPlaceholder}
                className={clsx(
                  'w-full overflow-hidden whitespace-nowrap text-ellipsis font-medium',
                  selectTextTransform,
                )}
              >
                {displayValue}
              </Select.Value>
            </div>
            <Select.Icon className="select-icon !size-[20px]">
              <i
                className={clsx(
                  'icon-arrow-down text-[16px] text-primary-blue-400',
                  { 'text-disabled-30-light-200': isDisabled },
                )}
              />
            </Select.Icon>
          </div>
        </Select.Trigger>

        {isMobile && renderMobile()}
        {!isMobile && renderDesktop()}
      </Select.Root>
    </>
  );
};
