import { Button } from '@/components/ui/button';
import { ButtonVariantsEnum } from '@/enums';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

type TopDrawerProps = {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  overlayClassName?: string;
  isShowButtonClose?: boolean;
  isShowTopDrawerIcon?: boolean;
};

export const TopDrawer = ({
  open,
  children,
  onClose,
  className,
  overlayClassName,
  isShowButtonClose = true,
  isShowTopDrawerIcon = false,
}: TopDrawerProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={clsx('fixed inset-0 z-20 bg-black/30', overlayClassName)}
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={clsx(
              'fixed inset-x-0 top-0 z-[20] flex max-h-[90vh] flex-col overflow-auto bg-primary-light-0 border-muted p-8 border-2',
              className,
            )}
          >
            {isShowTopDrawerIcon && (
              <div className="flex items-center justify-center w-[74px] h-[4px] rounded-[69px] bg-primary-dark-200 absolute top-2 -custom-translate-x-1/2 left-1/2"></div>
            )}
            {isShowButtonClose && (
              <Button
                variant={ButtonVariantsEnum.Ghost}
                id="close-button"
                name="close-button"
                className="absolute bg-secondary-subpage top-0 right-0 z-10 flex items-center justify-center rounded-es-lg max-w-6 h-6 p-1.5"
                onClick={onClose}
              >
                <i className="icon-close text-sm text-[15px] text-icon-secondary" />
              </Button>
            )}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
