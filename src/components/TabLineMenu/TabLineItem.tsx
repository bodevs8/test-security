import type { CategoryTypeEnum } from '@/enums';
import type { TabType } from '@/types/menu';
import { BrandingTag } from '@/components/Tag/BrandingTag';
import { TabVariantEnum } from '@/enums';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

type TabLineItemProps = TabType & {
  onClick: (id: string | number | any) => void;
  className?: string;
  active?: boolean;
  href?: string;
  isFillContainer?: boolean;
  imageClassName?: string;
  titleClassName?: string;
  variant?: TabVariantEnum;
  tag?: CategoryTypeEnum;
  tagClassName?: string;
  disabled?: boolean;
  isMobile?: boolean;
};

export const TabLineItem = ({
  id,
  title,
  onClick,
  href,
  className = '',
  active,
  isFillContainer,
  iconPathActive,
  iconPath,
  imageClassName = '',
  titleClassName = '',
  variant,
  tag,
  tagClassName = '',
  disabled = false,
  isMobile = false,
}: TabLineItemProps) => {
  const tabRef = useRef<HTMLDivElement | HTMLAnchorElement | null | undefined>(
    null,
  );
  useEffect(() => {
    if (active && !isFillContainer && tabRef.current) {
      tabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [active, isFillContainer]);

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement>,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick(id);
    }
  };

  return (
    <>
      {href && (
        <Link
          prefetch={false}
          key={id}
          href={disabled ? '#' : href!}
          className={clsx(
            'w-fit tab-line-item flex gap-2 justify-center items-center h-11 text-[14px] font-bold leading-[140%] box-border min-w-fit relative group',
            {
              'hover:bg-gradient-neutral-1': !disabled && !active,
              'active !bg-cta-primary-accent rounded-[4px]':
                !disabled && active && !isMobile,
              'active !border-b-[1.5px] border-green-500 !bg-[linear-gradient(0deg,rgba(0,255,62,0.1)_0%,rgba(0,255,62,0)_70.66%)] !bg-no-repeat !rounded-none':
                !disabled && active && isMobile,
              'flex-1': isFillContainer,
              gradient: variant === TabVariantEnum.Gradient,
              'disabled !cursor-not-allowed !pointer-events-all': disabled,
            },
            className,
          )}
          ref={tabRef as React.Ref<HTMLAnchorElement>}
          onClick={() => !disabled && onClick(id)}
        >
          {active && iconPathActive && (
            <Image
              src={iconPathActive}
              alt={iconPathActive.toString() ?? 'icon'}
              width={20}
              height={20}
              loading="lazy"
              className={clsx(
                '!w-[20px] aspect-[20/20] object-cover',
                imageClassName,
              )}
            />
          )}
          {!active && iconPath && (
            <Image
              src={iconPath}
              alt={iconPath.toString() ?? 'icon'}
              width={20}
              height={20}
              loading="lazy"
              className={clsx(
                '!w-[20px] aspect-[20/20] object-cover',
                imageClassName,
              )}
            />
          )}
          <span
            className={clsx(
              'whitespace-nowrap text-dark-200 text-[14px] font-bold leading-[140%] group-hover:text-green-500 relative uppercase',
              {
                'group-[.active]:text-white': !isMobile,
                'group-[.active]:!text-green-500': isMobile,
              },
              'group-[.disabled]:!text-disabled',
              titleClassName,
            )}
          >
            {title}
          </span>
          {tag && (
            <>
              <BrandingTag
                type={tag}
                className={clsx(
                  'absolute right-1 hidden md:block',
                  disabled ? 'top-0' : 'top-[2px]',
                  tagClassName,
                )}
                roundedFull
              />
            </>
          )}
        </Link>
      )}
      {!href && (
        <div
          onClick={() => onClick(id)}
          onKeyDown={handleKeyPress}
          role="button"
          tabIndex={0}
          ref={tabRef as React.Ref<HTMLDivElement>}
          className={clsx(
            'tab-line-item flex justify-center items-center h-11 text-[14px] font-bold leading-[140%] relative group-hover:text-green-500 uppercase',
            className,
            { active, 'flex-1': isFillContainer },
          )}
        >
          {title}
          {tag && (
            <BrandingTag
              type={tag}
              className={clsx('absolute top-[2px] right-1', tagClassName)}
              roundedFull
            />
          )}
        </div>
      )}
    </>
  );
};
