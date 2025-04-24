import type { BankOption } from '@/types/component';
import type { Control } from 'react-hook-form';
import { CustomDrawer } from '@/components/CustomDrawer';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DEFAULT_BANK_IMAGE,
  MAPPING_BANK_ROUDED_IMAGE,
} from '@/constant/images';
import { ButtonVariantsEnum, ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import { useDevice } from '@/hooks/utils';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useController } from 'react-hook-form';

type Props = {
  name: string;
  options?: BankOption[];
  label?: string;
  defaultValue?: string;
  control?: Control<any>;
  labelClassName?: string;
  popoverTriggerClassName?: string;
  placeholder?: string;
  showIconPlaceholder?: boolean;
  showVerify?: boolean;
  showAddBank?: boolean;
  onSelectBank?: (value: string) => void;
  addBankClassName?: string;
  iconArrowDownClassName?: string;
  optionContainerClassName?: string;
  drawerClassName?: string;
  commandItemClassName?: string;
  commandGroupClassName?: string;
  commandListClassName?: string;
  hideAfterButton?: boolean;
  iconCloseClassName?: string;
};

export function BankDropdown({
  name,
  options,
  label = 'Chọn ngân hàng',
  defaultValue = '',
  control,
  labelClassName,
  popoverTriggerClassName = '',
  placeholder = '',
  showIconPlaceholder = false,
  showVerify = false,
  showAddBank = false,
  onSelectBank,
  addBankClassName,
  iconArrowDownClassName,
  optionContainerClassName,
  drawerClassName,
  commandItemClassName,
  commandGroupClassName,
  commandListClassName,
  hideAfterButton = false,
  iconCloseClassName,
}: Props) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Modals.AddBankModal');
  const modalStore = useModalStore((state) => state);
  const selectRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDevice();

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (open && value) {
      const timeoutId = setTimeout(() => {
        document?.querySelector(`[data-value="${value}"]`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 300);

      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [open, value]);

  const handleSelect = (selectedValue: string) => {
    const newValue = selectedValue === value ? '' : selectedValue;
    onChange(newValue);
    onSelectBank?.(newValue);
    setOpen(false);
  };

  const selectedLabel = useMemo(() => {
    return options?.find((item) => item.value === value)?.label;
  }, [value, options]);

  const handleShowModalAddBank = () => {
    modalStore.openModal(ModalIdEnum.AddBank);
  };

  const handleFilter = (
    _value: string,
    search: string,
    keywords?: string[],
  ) => {
    if (!keywords) return 0;
    const isMatch = keywords.some((keyword: string) =>
      keyword.toLowerCase().includes(search.toLowerCase()),
    );
    return isMatch ? 1 : 0;
  };

  const renderOptions = (isMobile?: boolean) => {
    return (
      <Command
        className={clsx(
          'w-full px-3 py-4 bg-primary-light-0 !rounded-[6px] !border-0 !shadow-[0px_4px_47.7px_0px_#0719720D,0px_2px_12px_0px_#07197212]',
          {
            '!bg-secondary-light-200 !px-0 !pt-0': isMobile,
            '!pb-0': showAddBank,
          },
          optionContainerClassName,
        )}
        filter={handleFilter}
      >
        {!showVerify && (
          <CommandInput
            placeholder="Tìm kiếm ngân hàng"
            className={clsx('placeholder:primary-dark-200')}
            containerClassName={clsx({
              '!mx-3': isMobile,
            })}
          />
        )}
        <CommandList
          className={clsx(
            'max-h-[300px] md:max-h-[380px] overflow-y-auto custom-scrollbar',
            commandListClassName,
          )}
        >
          <CommandEmpty>{t('not_found')}</CommandEmpty>
          <CommandGroup
            className={clsx(
              'border-0 rounded-0',
              {
                '!px-3 !pt-0': isMobile,
              },
              commandGroupClassName,
            )}
          >
            {options?.map((item, index) => {
              return (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={handleSelect}
                  keywords={[item.label]}
                  ref={(el) => {
                    itemRefs.current[item.value] = el;
                  }}
                  className={clsx(
                    'text-dark-200 h-11 py-3 px-4 flex flex-col gap-2 bg-transparent border border-transparent rounded-[6px] cursor-pointer',
                    'transition-all hover:bg-primary-light-150 hover:border-green-200  hover:text-dark-700',
                    {
                      'pointer-events-none cursor-not-allowed': item.isMaintain,
                      '!h-[72px] !box-border !px-2': showVerify,
                      'mt-2': index !== 0,
                    },
                    commandItemClassName,
                  )}
                >
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={
                          MAPPING_BANK_ROUDED_IMAGE[item.value.toLowerCase()] ??
                          DEFAULT_BANK_IMAGE
                        }
                        alt={item.value}
                        width={20}
                        height={20}
                        className="size-5 rounded-full"
                      />
                      <span
                        className={clsx(
                          'leading-[140%] !font-medium text-dark-700',
                          {
                            '!text-dark-600': value === item.value,
                            'text-primary-blue-500 !text-[14px]': showVerify,
                            '!text-disabled-30-light-200': item.isMaintain,
                          },
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                    <i
                      className={clsx(
                        'icon icon-success text-green-500 font-bold size-4 text-base opacity-0',
                        {
                          'opacity-100': value === item.value,
                          '!mr-0': showVerify,
                        },
                      )}
                    />
                    {item.isMaintain && (
                      <span className="!text-disabled-30-light-200 text-[14px] font-medium">
                        ({t('maintain')})
                      </span>
                    )}
                  </div>
                  {showVerify && (
                    <div className="pl-[28px] flex justify-between items-center w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-primary-dark-200 text-[14px] font-medium leading-[140%]">
                          {item.account_number}
                        </span>
                        <div className="h-[20px] w-[1px] bg-primary-dark-200"></div>
                        <span className="text-primary-dark-200 text-[14px] font-medium leading-[140%]">
                          {item.account_name}
                        </span>
                      </div>
                      <div
                        className={clsx('text-[12px] text-orange-200', {
                          '!text-green-350': !item.is_disable,
                        })}
                      >
                        {item.is_disable ? t('not_verified') : t('verified')}
                      </div>
                    </div>
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
        {showAddBank && (
          <div
            className={clsx(
              'my-4 flex items-center justify-center w-full',
              isMobile && '!mb-0 !mx-auto !w-[calc(100%-24px)]',
            )}
          >
            <Button
              id="show-add-bank-button"
              name="show-add-bank-button-2"
              onClick={handleShowModalAddBank}
              className={clsx('w-full max-w-[358px]', addBankClassName)}
              variant={ButtonVariantsEnum.Secondary}
            >
              {!hideAfterButton && (
                <span className="icon icon-close rotate-45 text-[14px] !font-bold !text-primary-light-0" />
              )}
              {t('add_bank_button')}
            </Button>
          </div>
        )}
      </Command>
    );
  };

  const renderMobile = () => {
    return (
      <CustomDrawer
        open={open}
        handleOpen={setOpen}
        contentClassName={clsx(
          '!h-fit !bg-white border-2 border-primary-light-200 !rounded-0 !px-0 z-[100]',
          drawerClassName,
        )}
        refContent={selectRef as React.RefObject<HTMLDivElement>}
      >
        <DrawerHeader>
          <DrawerTitle ref={selectRef as React.RefObject<HTMLHeadingElement>}>
            <div className="text-primary-blue-500 text-[16px] leading-[140%] font-medium">
              {label}
            </div>
            <button
              className="flex items-center justify-center rounded-bl-[12px] !w-8 !h-8 !p-0 absolute top-0 right-0 bg-teriary-light-300"
              onClick={() => setOpen(false)}
              type="button"
            >
              <i
                className={clsx(
                  'icon-close text-xl font-bold text-navy-blue-300 hover:text-rose-red-200',
                  iconCloseClassName,
                )}
              />
            </button>
          </DrawerTitle>
        </DrawerHeader>
        <div className="drawer-select" aria-hidden={false}>
          {renderOptions(true)}
        </div>
      </CustomDrawer>
    );
  };

  const renderDesktop = () => {
    return (
      <PopoverContent
        id="bank-selector"
        className="p-0 top-2 popover-content border-0 !rounded-[0px] z-[53]"
        align="start"
      >
        {renderOptions()}
      </PopoverContent>
    );
  };

  return (
    <div>
      {label && (
        <label
          className={clsx([
            'block mb-1 text-[14px] leading-[140%] capitalize text-dark-700',
            labelClassName,
          ])}
        >
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <div
            id="bank-combobox"
            role="combobox"
            aria-expanded={open}
            aria-controls="bank-selector"
            className={clsx(
              'w-full flex justify-between items-center h-10 px-4 rounded-[4px] bg-primary-light-100 cursor-pointer group/bank-container',
              'hover:outline hover:outline-primary-light-500',
              popoverTriggerClassName,
              {
                'border border-green-500': open,
              },
            )}
          >
            {value && (
              <div
                className={clsx(
                  'flex items-center gap-2 text-sm text-dark-700',
                  {
                    'text-green-500': open,
                  },
                )}
              >
                <Image
                  src={
                    MAPPING_BANK_ROUDED_IMAGE[value.toLowerCase()] ??
                    DEFAULT_BANK_IMAGE
                  }
                  alt={value}
                  width={20}
                  height={20}
                  className="size-5 rounded-full"
                />
                {selectedLabel}
              </div>
            )}
            {!value && (
              <div className="flex items-center gap-2">
                {showIconPlaceholder && (
                  <i className="icon-bank text-[20px] text-green-500 before:!text-green-500" />
                )}
                <span className="text-sm text-primary-blue-500 font-medium">
                  {placeholder && <>{placeholder}</>}
                  {!placeholder && (
                    <div className="flex items-center gap-2 text-dark-700 group-hover/bank-container:text-dark-200">
                      <Image
                        src={DEFAULT_BANK_IMAGE}
                        alt="bank default"
                        width={20}
                        height={20}
                        className="size-5"
                      />
                      {t('bank_select_placeholder')}
                    </div>
                  )}
                </span>
              </div>
            )}
            <i
              className={clsx(
                'icon-arrow-down text-dark-700 text-base pointer-events-none shrink-0 translate-y-0.5 transition-transform duration-200',
                {
                  'rotate-180': open,
                },
                iconArrowDownClassName,
              )}
            />
          </div>
        </PopoverTrigger>
        {isMobile && renderMobile()}
        {!isMobile && renderDesktop()}
      </Popover>
    </div>
  );
}
