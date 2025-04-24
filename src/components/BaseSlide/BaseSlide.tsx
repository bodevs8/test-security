'use client';

import type { ReactNode } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type BaseSlideProps = {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  slideClassName?: string;
};

export const BaseSlide = ({
  isOpen,
  onClose,
  title,
  children,
  slideClassName,
}: BaseSlideProps) => {
  const [mounted, setMounted] = useState(false);

  const handleClose = () => {
    onClose?.();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="base-side-modal fixed inset-0 z-52 bg-primary-light-0"
        >
          {/* Modal */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full bg-teriary-light-300"
          >
            <div className="fixed inset-0 z-[51]">
              <div
                className={clsx(
                  'fixed top-0 right-0 h-full w-full bg-secondary-light-200 transform transition-transform duration-300 ease-in-out',
                  {
                    'translate-x-0': isOpen,
                    'translate-x-full': !isOpen,
                  },
                  slideClassName,
                )}
              >
                <div className="flex justify-center items-center h-[50px] px-[36px] relative bg-primary-light-0 text-center base-side-header border-b border-primary-light-200">
                  <button
                    onClick={handleClose}
                    type="button"
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-fit bg-transparent h-[24px] border border-primary-light-200 rounded-[4px]"
                  >
                    <i className="icon-arrow-left text-[16px] !text-icon-quinary before:!text-icon-quinary p-1" />
                  </button>
                  {title && (
                    <h2 className="uppercase text-[16px] font-bold text-center block text-dark-700 ">
                      {title}
                    </h2>
                  )}
                </div>

                <div className="h-[calc(100%-50px)] overflow-y-auto">
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
