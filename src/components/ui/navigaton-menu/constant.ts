import { cva } from 'class-variance-authority';

export const navigationMenuTriggerStyle = cva(
  'flex h-[50px] w-max items-center justify-center px-3 py-4 text-base text-white font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 ',
);
