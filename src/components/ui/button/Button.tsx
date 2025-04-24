'use client';
import type { VariantProps } from 'class-variance-authority';
import { useTrackingButton } from '@/hooks/tracking';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { buttonVariants } from './button-variants';

export type ButtonProps = {
  asChild?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  id: string; // DON'T CHANGE TO OPTIONAL
  name: string; // DON'T CHANGE TO OPTIONAL
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = ({
  ref,
  className,
  variant,
  size,
  style,
  asChild = false,
  isLoading,
  disabled,
  children,
  id,
  ...props
}: ButtonProps & { ref?: React.RefObject<HTMLButtonElement> }) => {
  const Comp = asChild ? Slot : 'button';
  const { trackButtonClick } = useTrackingButton();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    trackButtonClick({
      buttonId: id,
      buttonName: props.name,
    });
  };

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, className, style }),
        'base-button !box-border capitalize',
        { loading: isLoading, disabled },
      )}
      ref={ref}
      {...props}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading && <div className="spinner mr-.5" />}
      {children}
    </Comp>
  );
};
Button.displayName = 'Button';

export { Button };
