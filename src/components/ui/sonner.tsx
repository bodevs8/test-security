'use client';

import type { ToasterProps } from 'sonner';
import { TOAST_DURATION } from '@/constant/app';
import IMAGE_ERROR from '@/public/icons/error.svg';
import Image from 'next/image';
import { Toaster as Sonner } from 'sonner';
import '@/styles/components/toast.scss';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      gap={12}
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            'group toast !h-[40px] !rounded-[4px] !border-none backdrop-blur-[56px] group-[.toaster]:text-foreground group-[.toaster]:shadow-lg group-[.toaster]:rounded-[8px]',
          title:
            'group-[.toast]:text-muted-foreground text-[14px] !font-normal toast-content',
          icon: 'group-[.toast]:text-muted-foreground !w-[20px] !h-[20px] ml-10',
        },
      }}
      {...props}
      duration={TOAST_DURATION}
      icons={{
        success: (
          <div className="flex justify-center items-center w-[40px] h-[40px] bg-green-400 -ml-4 rounded-tl-[4px] rounded-bl-[4px]">
            <div className="flex justify-center items-center gap-2 w-[20px] h-[20px] bg-primary-light-0 rounded-full">
              <i className="icon-success text-base !text-green-500" />
            </div>
          </div>
        ),
        error: (
          <div className="flex justify-center items-center w-[40px] h-[40px] bg-error -ml-4 rounded-tl-[4px] rounded-bl-[4px]">
            <div className="flex justify-center items-center gap-2 w-[20px] h-[20px] bg-red-500 rounded-full ">
              <Image src={IMAGE_ERROR} alt="error" width={20} height={20} />
            </div>
          </div>
        ),
      }}
    />
  );
};

export { Toaster };
