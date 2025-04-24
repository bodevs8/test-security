'use client';

import { buttonVariants } from '@/components/ui/button';
import { ButtonVariantsEnum } from '@/enums';

import { cn } from '@/lib/utils';

import { vi } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const IconLeft = ({ className, ...props }: React.ComponentProps<'svg'>) => (
  <ChevronLeft className={cn('h-8 w-8', className)} {...props} />
);

const IconRight = ({ className, ...props }: React.ComponentProps<'svg'>) => (
  <ChevronRight className={cn('h-8 w-8', className)} {...props} />
);

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // const currentLang = useLocale();
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      // locale={currentLang === 'vi' ? vi : enUS}
      locale={vi}
      fixedWeeks={true}
      className={cn('bg-primary-light-0 pb-[14px]', className)}
      classNames={{
        months:
          'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full',
        month: 'space-y-4 w-full',
        caption:
          'h-5 flex justify-center pt-2 relative items-center text-white',
        caption_label: 'text-sm font-medium text-dark-700 absolute left-4',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: ButtonVariantsEnum.Outline }),
          'h-7 w-7 bg-transparent p-0 text-dark-200 hover:bg-primary-200 hover:text-white border-none',
        ),
        nav_button_previous:
          'absolute right-9 hover:text-green-500 hover:!text-green-500 !shadow-none [&>svg]:h-5 [&>svg]:w-5',
        nav_button_next:
          'absolute right-3 hover:text-green-500 hover:!text-green-500 !shadow-none [&>svg]:h-5 [&>svg]:w-5',
        table: 'w-full border-collapse space-y-1 flex flex-col items-center',
        head: 'bg-yellow-neon w-full',
        head_row: 'flex px-3 justify-around',
        head_cell:
          'text-orange-50 rounded-md w-8 font-medium text-nowrap text-base leading-8',
        tbody: 'w-full',
        row: 'flex w-full px-3 mt-3 justify-around',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          buttonVariants({ variant: ButtonVariantsEnum.Ghost }),
          'h-8 w-8 p-0 font-medium text-sm text-dark-700 hover:text-primary-200 hover:bg-yellow-50',
        ),
        day_selected:
          'rounded-none hover:!text-orange-50 text-yellow-500 border !border-yellow-500 rounded-sm hover:!bg-yellow-50',
        day_today:
          'hover:text-yellow-500 bg-secondary-light-400 rounded-none !text-primary-200',
        day_outside:
          '!text-gray-600 hover:!text-gray-400 border-transparent bg-transparent !text-primary-dark-200',
        day_disabled:
          'text-gray-600 opacity-50 !border-transparent !bg-transparent !text-primary-dark-200',
        day_range_middle: 'bg-[#2a2b36] text-white',
        day_hidden: 'invisible ',
        ...classNames,
      }}
      components={{
        IconLeft,
        IconRight,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
