import type { StaticImageData } from 'next/image';
import { BrandingTag } from '@/components/Tag/BrandingTag';
import { Button } from '@/components/ui/button';
import {
  ButtonVariantsEnum,
  CategoryTypeEnum,
  PhoneCardStatusEnum,
  SizeEnum,
} from '@/enums';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

type ProviderCardProps = {
  provider: {
    key: string;
    status: number;
    icon: StaticImageData | string;
    iconActive: StaticImageData | string;
    iconInactive?: StaticImageData | string;
  };
  selectedProvider: string | null;
  handleProviderSelect: (key: string) => void;
  isMobile?: boolean;
};

export function ProviderCard({
  provider,
  selectedProvider,
  handleProviderSelect,
  isMobile = false,
}: ProviderCardProps) {
  const isInactive = provider.status === PhoneCardStatusEnum.InActive;
  const isSelected = selectedProvider === provider.key;

  const handleClick = () => {
    if (!isInactive && !isSelected) {
      handleProviderSelect(provider.key);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  return (
    <Button
      id={provider.key}
      name={provider.key}
      type="button"
      key={provider.key}
      className={clsx(
        'relative flex-1 flex items-center justify-center !outline-none h-10 !p-0 cursor-pointer !bg-primary-light-50',
        {
          'group hover:!bg-yellow-neon !border-0': !isSelected && !isInactive,
          '!border-[1.5px] !border-green-500': isSelected,
          'pointer-events-all cursor-not-allowed !bg-disabled': isInactive,
        },
      )}
      variant={ButtonVariantsEnum.Secondary}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {isInactive && (
        <BrandingTag
          type={CategoryTypeEnum.Maintain}
          size={SizeEnum.Small}
          className="absolute top-0 right-[17px]"
        />
      )}

      {provider.status === PhoneCardStatusEnum.Active && (
        <input
          type="radio"
          name="to_telcom_code"
          id={`provider-${provider.key}`}
          value={provider.key}
          className="hidden"
        />
      )}

      <label
        htmlFor={`provider-${provider.key}`}
        className={clsx(
          'flex items-center gap-2 cursor-pointer',
          isInactive && '!cursor-not-allowed !pointer-events-all',
        )}
      >
        {isInactive && (
          <Image
            src={provider.iconInactive ?? ''}
            alt={provider.key}
            width={70}
            height={17}
            className={clsx(
              'h-[24px] w-auto',
              isMobile && '!object-contain !w-[57px]',
            )}
          />
        )}
        {!isInactive && (
          <Image
            src={provider.iconActive}
            alt={provider.key}
            width={70}
            height={17}
            className={clsx(
              'h-[24px] w-auto',
              isMobile && '!object-contain !w-[57px]',
            )}
          />
        )}
      </label>
    </Button>
  );
}
