'use client';

import type { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

function Accordion({
  onChange,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & {
  onChange?: (value: any) => void;
}) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      onValueChange={onChange}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('mb-4 last:mb-0', className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  plusIcon,
  subIcon,
  children,
  ChevronDownIconClassName,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  plusIcon?: StaticImageData;
  subIcon?: StaticImageData;
  ChevronDownIconClassName?: string;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'bg-[#122039] p-4 cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        {!plusIcon && !subIcon && (
          <ChevronDownIcon
            className={cn(
              'text-dark-600 pointer-events-none size-6 shrink-0 translate-y-0.5 transition-transform duration-200',
              ChevronDownIconClassName,
            )}
          />
        )}
        {plusIcon && (
          <Image
            className="text-yellow-500 pointer-events-none size-5 md:size-6 shrink-0 translate-y-0.5 transition-transform duration-200 open-icon data-[state=open]:hidden"
            src={plusIcon}
            alt="plus"
            width={20}
            height={20}
          />
        )}
        {subIcon && (
          <Image
            className="text-yellow-500 pointer-events-none size-5 md:size-6 shrink-0 translate-y-0.5 transition-transform duration-200 hidden close-icon data-[state=open]:block"
            src={subIcon}
            alt="minus"
            width={20}
            height={20}
          />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
