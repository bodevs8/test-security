import { ButtonSizeEnum, ButtonStyleEnum, ButtonVariantsEnum } from '@/enums';
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'base-button font-bold cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-all disabled:cursor-not-allowed [&_svg]:pointer-events-all [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        [ButtonVariantsEnum.Default]:
          'button-primary text-dark-700 bg-yellow-500 hover:bg-yellow-400',
        [ButtonVariantsEnum.Secondary]:
          'button-secondary text-neutral-100 hover:bg-secondary/80',
        [ButtonVariantsEnum.Gray]:
          'button-gray text-neutral-100 bg-neutral-400',
        [ButtonVariantsEnum.Outline]:
          'border border-neutral-400 bg-background hover:bg-accent hover:text-accent-foreground',
        [ButtonVariantsEnum.Destructive]:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        [ButtonVariantsEnum.Ghost]:
          'hover:bg-accent hover:text-accent-foreground',
        [ButtonVariantsEnum.Transparent]: 'p-0',
        [ButtonVariantsEnum.Tab]: 'button-tab',
        [ButtonVariantsEnum.TabActive]: 'button-tab-active',
        [ButtonVariantsEnum.Disabled]: 'text-white bg-primary-light-300',
      },
      style: {
        [ButtonStyleEnum.Fill]: 'button-fill',
        [ButtonStyleEnum.Outline]: 'button-outline',
        [ButtonStyleEnum.Gradient]: 'button-gradient',
        [ButtonStyleEnum.Bet]: 'button-bet',
        [ButtonStyleEnum.Link]: 'button-link lg:hover:underline',
      },
      size: {
        [ButtonSizeEnum.Default]:
          'h-6 px-3 text-xs leading-[140%] size-default',
        [ButtonSizeEnum.SM]: 'h-8 px-3 text-sm leading-[140%] size-sm',
        [ButtonSizeEnum.LG]: 'h-10 px-3 text-base leading-[140%] size-lg',
        [ButtonSizeEnum.Icon]: 'h-10 w-10 rounded-[8px]',
        [ButtonSizeEnum.None]: '',
      },
    },
    defaultVariants: {
      variant: ButtonVariantsEnum.Default,
      style: ButtonStyleEnum.Fill,
      size: ButtonSizeEnum.LG,
    },
  },
);
