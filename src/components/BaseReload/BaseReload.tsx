'use client';

import type { KeyboardEventHandler } from 'react';
import clsx from 'clsx';

type Props = {
  onClick?: () => void;
  title?: string;
  isLoading?: boolean;
  className?: string;
  iconClassName?: string;
};

export const BaseReload = ({
  onClick,
  title,
  isLoading,
  className,
  iconClassName,
}: Props) => {
  const handleRefresh = () => {
    onClick?.();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRefresh();
    }
  };

  return (
    <div
      className={clsx(
        'flex items-center gap-1 py-[5px] px-[6px] bg-green-500 group rounded-[8px] cursor-pointer',
        {
          'rounded-full': !title,
        },
        className,
      )}
      onClick={handleRefresh}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    >
      <i
        className={clsx(
          'icon-reload text-[24px] !text-white before:!text-white',
          iconClassName,
          {
            spinner: isLoading,
          },
        )}
      />
      {title && (
        <span className="text-white font-medium text-[14px] leading-5 whitespace-nowrap group-hover:text-primary-100">
          {title}
        </span>
      )}
    </div>
  );
};
