import type { KeyboardEventHandler } from 'react';
import { ClipboardCopyTypeEnum } from '@/enums';
import clsx from 'clsx';
import { useState } from 'react';

type Props = {
  label: string;
  value: string;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
  useCopyIcon?: boolean;
  showSendIcon?: boolean;
  iconBefore?: string;
  textButton?: string;
  textButtonSuccess?: string;
  wrapperClassName?: string;
  containerClassName?: string;
  type?: ClipboardCopyTypeEnum;
  iconClassName?: string;
  parentClassName?: string;
};

export const ClipboardCopy = ({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
  iconBefore,
  useCopyIcon = true,
  showSendIcon = false,
  textButton,
  textButtonSuccess,
  wrapperClassName,
  containerClassName,
  type = ClipboardCopyTypeEnum.Default,
  iconClassName,
  parentClassName,
}: Props) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCopy();
    }
  };

  return (
    <div className={clsx('flex gap-1 flex-col', parentClassName)}>
      {label && (
        <span
          className={clsx(
            'text-dark-700 text-[14px] leading-[140%] whitespace-nowrap font-medium capitalize',
            labelClassName,
          )}
        >
          {label}
        </span>
      )}
      <div
        className={clsx(
          'flex items-center gap-2 justify-between border border-neutral-400 rounded-[4px] w-full h-10 px-4',
          'hover:border-green-500',
          type === ClipboardCopyTypeEnum.Input &&
            'bg-primary-light-0 h-10 px-4',
          containerClassName,
        )}
      >
        <div
          className={clsx(
            'flex justify-end gap-2 items-center w-full',
            type === ClipboardCopyTypeEnum.Input && '!w-fit',
            className,
          )}
        >
          <div
            className={clsx(
              'flex items-center gap-2 box-border w-full justify-end',
              wrapperClassName,
            )}
          >
            <div
              className={clsx(
                'flex items-center gap-2 w-full overflow-hidden text-ellipsis',
                type === ClipboardCopyTypeEnum.Input && 'font-medium',
                valueClassName,
              )}
            >
              {showSendIcon && (
                <i
                  className={clsx(
                    'text-[20px] text-primary-blue-400 mr-1',
                    iconBefore,
                  )}
                />
              )}
              <span
                className={clsx(
                  'text-dark-200 text-[14px] leading-[140%] whitespace-nowrap overflow-hidden text-ellipsis',
                  valueClassName,
                )}
              >
                {value}
              </span>
            </div>
            {copySuccess && useCopyIcon && (
              <i
                className={clsx(
                  'icon-success text-[20px] !text-green-500',
                  iconClassName,
                )}
              />
            )}
            {!copySuccess && useCopyIcon && (
              <i
                onKeyDown={handleKeyDown}
                onClick={() => handleCopy()}
                tabIndex={0}
                role="button"
                className={clsx(
                  'icon-copy text-[20px] text-green-500 cursor-pointer',
                  type === ClipboardCopyTypeEnum.Input &&
                    'text-gren-500 before:text-green-500',
                  iconClassName,
                )}
              />
            )}
            {!copySuccess && !useCopyIcon && (
              <button
                onClick={() => handleCopy()}
                className="text-green-500 font-medium text-xs md:text-[14px] leading-[140%] whitespace-nowrap cursor-pointer"
                type="button"
              >
                {textButton}
              </button>
            )}
            {copySuccess && !useCopyIcon && (
              <span className="text-green-500 text-xs md:text-[14px] leading-[140%] whitespace-nowrap">
                {textButtonSuccess}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
