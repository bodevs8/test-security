'use client';

import type { DepositTabItem } from '@/types/deposit';
import { BrandingTag } from '@/components/Tag/BrandingTag';
import { SizeEnum } from '@/enums';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type TransactionMenuMobileProps = {
  menu: DepositTabItem[];
};

export function TransactionMenuMobile({ menu }: TransactionMenuMobileProps) {
  const pathname = usePathname();

  return (
    <div className="w-full space-y-3">
      {menu.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          prefetch={false}
          className={clsx(
            'w-full flex items-center h-[100px] px-4 gap-4 deposit-menu-item-mb bg-primary-light-0 rounded-[6px] backdrop-blur-[20px]',
            {
              'outline-[2px] outline-yellow-500 !bg-yellow-neon':
                item.href === pathname,
              'pointer-events-none cursor-not-allowed disabled !bg-disabled-30-light-200':
                item.disabled,
            },
          )}
        >
          <Image
            src={item.disabled ? item.iconMaintain : item.icon}
            alt={item.id}
            width={80}
            height={80}
            className={clsx('w-[80px] h-[80px]')}
          />
          <div className="flex flex-col gap-[6px]">
            <div className="flex items-center gap-[6px]">
              <div
                className={clsx(
                  'text-dark-700 text-[16px] font-bold leading-[140%] uppercase',
                  {
                    '!text-dark-200': item.disabled,
                  },
                )}
              >
                {item.title}
              </div>
              {item.tag && (
                <BrandingTag type={item.tag} size={SizeEnum.Large} />
              )}
            </div>
            <div className="text-dark-200 text-[14px] leading-[140%]">
              {item.subTitle}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
