'use client';

import type { PopoverContentProps } from '@radix-ui/react-popover';
import { CustomDrawer } from '@/components/CustomDrawer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MIN_DATE_DEFAULT } from '@/constant/constants';
import { ButtonVariantsEnum } from '@/enums';
import { useDevice } from '@/hooks/utils/use-device';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/date';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';

type BaseCalendarProps = PopoverContentProps & {
  date: Date;
  setDate: (date: Date) => void;
  placeholder?: string;
  format?: string;
  disableFeatureFrom?: Date;
  buttonClassName?: string;
  showMobile?: boolean;
};

export function BaseCalendar({
  date,
  setDate,
  placeholder,
  format,
  buttonClassName,
  showMobile,
  disableFeatureFrom,
  ...props
}: BaseCalendarProps) {
  const ref = useRef<HTMLDivElement>(null);

  const isDateDisabled = (date: Date) => {
    if (!date) return false;

    if (disableFeatureFrom) {
      return date > disableFeatureFrom;
    }
    return date > new Date() || date < MIN_DATE_DEFAULT;
  };

  const { isMobile } = useDevice();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopover, setOpenPopOver] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setIsOpen(false);
    }
  };

  const closeCalendar = () => {
    setIsOpen(false);
    setOpenPopOver(false);
  };

  if (showMobile || isMobile) {
    return (
      <>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={clsx(
            'bg-primary-light-100 text-dark-700 font-medium rounded-[4px] py-2.5 px-3',
            {
              'outline outline-green-500 !text-green-500': isOpen,
            },
            buttonClassName,
          )}
        >
          <div className="flex justify-between items-center">
            <p className="text-left text-sm !box-border outline-none select-none">
              {date && formatDate(date, format)}
            </p>
            <div className="h-full flex items-center justify-center text-base">
              <i className="icon-calendar-dots text-green-500" />
            </div>
          </div>
        </button>

        <CustomDrawer
          open={isOpen}
          handleOpen={setIsOpen}
          overlayClassName="z-[101]"
          contentClassName="bg-primary-light-0 !h-[auto] !p-0 z-[102]"
        >
          <div className="mx-auto w-full max-w-[390px]">
            <Button
              type="button"
              id="close-button"
              name="close-button"
              className="p-[8.5px] rounded-bl-md !bg-teriary-light-300 h-8 absolute top-0 right-0"
              onClick={closeCalendar}
              variant={ButtonVariantsEnum.Ghost}
            >
              <i className="icon-close text-dark-700 text-[15px]" />
            </Button>
            <div className="pb-5" />
            <Calendar
              mode="single"
              selected={date}
              onSelect={(day) => {
                if (day) {
                  setDate(day);
                  handleSelect(day);
                }
              }}
              disabled={isDateDisabled}
              initialFocus
            />
          </div>
        </CustomDrawer>
      </>
    );
  }

  return (
    <Popover
      open={isOpenPopover}
      onOpenChange={(open) => {
        setOpenPopOver(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id="calendar-button"
          name="calendar-button"
          className={cn(
            buttonClassName,
            'flex flex-row-reverse gap-8 py-2.5 pl-4 pr-[14px] text-left text-sm font-medium border border-transparent !bg-primary-light-100 !outline-0 leading-5',
            {
              'border-green-500 !text-green-500 hover:!text-green-500':
                isOpenPopover,
              '!text-dark-700 hover:!text-dark-200 hover:border-primary-light-500':
                !isOpenPopover,
            },
          )}
        >
          <i className="text-green-500 icon-calendar-dots text-xl"></i>
          <span className="leading-5 pt-0.5">
            {date && formatDate(date, format)}
            {(!date && placeholder) ?? ''}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto !p-0 !bg-neutral-500 border-none"
        align="end"
        side={props.side}
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <div className="min-w-[390px] min-h-[390px] overflow-hidden rounded-md bg-primary-light-0">
          <div className="w-full flex items-center justify-end">
            <Button
              type="button"
              id="close-button"
              name="close-button"
              className="rounded-sm m-1 !bg-teriary-light-300 h-6 w-6 border border-primary-light-200"
              onClick={closeCalendar}
              variant={ButtonVariantsEnum.Ghost}
            >
              <i className="icon-close text-dark-200 text-[15px]" />
            </Button>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => {
              if (day) {
                setDate(day);
                handleSelect(day);
              }
            }}
            disabled={isDateDisabled}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
