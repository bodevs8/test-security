'use client';

import type { TopMenuItem } from '@/types/menu';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HeaderMenuLinkProps = {
  isMobile?: boolean;
  items?: TopMenuItem[];
};

export const HeaderMenuLink = ({ isMobile, items }: HeaderMenuLinkProps) => {
  const pathname = usePathname();

  return (
    <>
      {items?.map((item) => (
        <Link
          href={item.href}
          key={item.key}
          prefetch={false}
          className={clsx(
            'h-[26px] items-center gap-2 w-auto w-[120px] group relative',
            pathname === item.href ? item.activeClass : item.backgroundImage,
          )}
        >
          <Image
            src={item.backgroundImage}
            alt={`${item.title} bg`}
            width={120}
            height={26}
            priority={!isMobile}
            loading={!isMobile ? 'eager' : 'lazy'}
            fetchPriority={!isMobile ? 'high' : 'low'}
          />
          <div
            className={clsx(
              'hidden xl:flex whitespace-nowrap text-center text-xs font-medium capitalize leading-normal absolute top-0 left-0 w-full h-full lg:items-center lg:justify-center text-dark-700',
              item.titleClass,
            )}
          >
            {item.title}
          </div>
          <Image
            src={item.icon}
            alt={`${item.title} icon`}
            width={36}
            height={36}
            priority={!isMobile}
            loading={!isMobile ? 'eager' : 'lazy'}
            fetchPriority={!isMobile ? 'high' : 'low'}
            className="absolute bottom-[-2px] right-[-18px]"
          />
        </Link>
      ))}
    </>
  );
};
