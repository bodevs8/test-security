'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ButtonVariantsEnum } from '@/enums';
import { cn } from '@/lib/utils';

import { Command as CommandPrimitive } from 'cmdk';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Button } from './button';

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
        className,
      )}
      {...props}
    />
  );
}

const CommandDialog = ({
  ref,
  children,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  ref: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <Dialog {...props}>
      <DialogContent ref={ref} className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[data-slot=command-input-wrapper]]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};
CommandDialog.displayName = 'CommandDialog';

function CommandInput({
  className,
  containerClassName,
  onValueChange,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  containerClassName?: string;
}) {
  const t = useTranslations();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    onValueChange?.('');
  };

  const handleCancel = () => {
    setValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onValueChange?.('');
    // Close the command list by triggering a blur event
    inputRef.current?.blur();
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div
      data-slot="command-input-wrapper"
      className={cn(
        'px-4 py-[10px] bg-primary-light-50 border border-primary-light-50 flex items-center gap-2 rounded-[4px] h-10',
        containerClassName,
      )}
    >
      <SearchIcon className="size-5 text-green-500 shrink-0 bg-primary-light-50" />
      <CommandPrimitive.Input
        ref={inputRef}
        data-slot="command-input"
        className={cn(
          'placeholder:!text-dark-200 flex h-10 w-full rounded-md bg-transparent py-3 lg:text-[14px] text-dark-700 leading-[140%] outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        value={value}
        onValueChange={handleValueChange}
        {...props}
      />
      {value && (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center p-0"
            id="command-input-clear"
            name="command-input-clear"
            variant={ButtonVariantsEnum.Transparent}
          >
            <i className="icon-close text-[12px] w-[18px] h-[18px] flex items-center justify-center hover:bg-dark-200 bg-primary-light-300 text-white rounded-full" />
          </Button>
          <div className="w-[1px] h-[18px] bg-primary-light-400" />
          <Button
            type="button"
            onClick={handleCancel}
            className="text-green-500 text-sm p-0 font-medium hover:opacity-70"
            id="command-input-cancel"
            name="command-input-cancel"
            variant={ButtonVariantsEnum.Transparent}
          >
            {t('Common.cancel')}
          </Button>
        </div>
      )}
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn('max-h-[300px] ', className)}
      {...props}
    />
  );
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm text-dark-700"
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden pt-1 pr-0 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn('bg-border -mx-1 h-px', className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        " [&_svg:not([class*='text-'])]:text-pink-100 relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        className,
      )}
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
