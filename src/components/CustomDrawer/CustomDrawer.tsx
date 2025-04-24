import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerOverlay,
  DrawerTitle,
} from '@/components/ui/drawer';
import { ButtonVariantsEnum } from '@/enums';
import { cn } from '@/lib/utils';
import React, { useLayoutEffect, useRef } from 'react';

type CustomDrawerProps = {
  open: boolean;
  handleOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
  contentClassName?: string;
  overlayClassName?: string;
  refContent?: React.RefObject<HTMLDivElement>;
  showHandle?: boolean;
  showCloseButton?: boolean;
  title?: string;
  description?: string;
};

export const CustomDrawer = ({
  open,
  handleOpen,
  children,
  contentClassName,
  overlayClassName,
  refContent,
  showHandle = true,
  showCloseButton,
  title = 'Drawer',
  description = 'Drawer description',
}: CustomDrawerProps) => {
  const DescriptionRef = useRef<HTMLParagraphElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={handleOpen}>
      <DrawerOverlay
        className={cn('drawer-overlay z-50', overlayClassName)}
        onClick={() => handleOpen(false)}
      />
      <DrawerContent
        ref={refContent}
        className={cn(
          'max-h-[calc(100%-101px)] z-50 border-none shadow-drawer',
          contentClassName,
        )}
        showHandle={showHandle}
        onPointerDownOutside={(e) => {
          // Prevent closing when clicking on dropdown
          if ((e.target as HTMLElement).closest('[role="listbox"]')) {
            e.preventDefault();
          } else {
            handleOpen(false);
          }
        }}
      >
        <DrawerTitle className="sr-only">{title}</DrawerTitle>
        <DrawerDescription
          ref={DescriptionRef as React.RefObject<HTMLParagraphElement>}
          className="sr-only"
        >
          {description}
        </DrawerDescription>
        {showCloseButton && (
          <Button
            ref={closeButtonRef as React.RefObject<HTMLButtonElement>}
            variant={ButtonVariantsEnum.Ghost}
            id="close-button"
            name="close-button"
            className="absolute bg-white border border-neutral-400 rounded-md top-[12.5px] right-[15px] z-10 flex items-center justify-center rounded-es-lg max-w-8 h-8 p-1.5"
            onClick={() => handleOpen(!open)}
          >
            <i className="icon-close text-xl font-bold text-navy-blue-300 hover:text-rose-red-200" />
          </Button>
        )}
        {children}
      </DrawerContent>
    </Drawer>
  );
};
