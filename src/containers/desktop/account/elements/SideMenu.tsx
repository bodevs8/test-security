'use client';

import type { AccountMenuItem } from '@/types/app';
import type { UserData } from '@/types/auth';
import { ACCOUNT_SIDE_MENU } from '@/constant/menu';
import { BalanceAmount } from '@/containers/layout/elements/LoggedIn/BalanceAmount';
import { QueryKeyEnum } from '@/enums';
import { VipLevelEnum } from '@/enums/vip';
import { useRefresh } from '@/hooks/account';
import ProfileAvatar from '@/public/images/account/profile/avatar.webp';
import { getAccountProfile } from '@/services/client';
import { getIcon } from '@/utils/helpers';
import { useQuery } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import TagRenderer from './TagMenu';

type SideMenuProps = {
  onChangePage?: (id: string) => void;
  serverUser?: UserData;
};

export const SideMenu = ({ onChangePage, serverUser }: SideMenuProps) => {
  const t = useTranslations();
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
  const [hovered, setHovered] = useState<string | null>(null);
  const { userData, isLoggedIn } = useRefresh();

  const { data: vipProfile } = useQuery({
    queryKey: [QueryKeyEnum.VipProfile],
    queryFn: getAccountProfile,
    enabled: isLoggedIn,
  });

  const renderUser = userData || serverUser;

  useEffect(() => {
    const activeItem = ACCOUNT_SIDE_MENU.find(
      (item) => item.id === pathname || pathname.startsWith(item.id),
    );
    if (activeItem) {
      setActive(activeItem.id);
    }
  }, [pathname]);

  const vipLevel = useMemo(() => {
    return vipProfile?.data?.level || VipLevelEnum.Level0;
  }, [vipProfile]);

  const handleChangePage = (id: string) => {
    setActive(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onChangePage) {
      onChangePage(id);
    }
  };

  return (
    <div className="sidebar min-w-[240px] md:w-[240px] xl:w-[256px] relative bg-primary-light-0 rounded-[8px]">
      <div className="sidebar-container px-3 xl:px-4 py-5">
        <div className="flex items-center gap-[14px]">
          <Image
            src={ProfileAvatar}
            alt="user avatar"
            width={44}
            height={44}
            loading="lazy"
            className="!w-[44px] aspect-[44/44] object-cover"
          />
          <div className="overflow-hidden w-full">
            <div className="flex items-center gap-2 h-6">
              <div className="username text-dark-600 text-[12px] xl:text-[16px] leading-[24px] max-w-[104px] truncate overflow-hidden text-ellipsis font-medium">
                {renderUser?.fullname}
              </div>
              <Image
                src={`/images/account/overview/vip-${vipLevel}.webp`}
                alt={`VIP Level ${vipLevel}`}
                width={35}
                height={35}
                loading="lazy"
                className="!w-[35px] aspect-[35/35] object-cover hidden"
              />
            </div>

            <BalanceAmount
              balance={renderUser?.balance ?? 0}
              className="text-yellow-400 text-[14px] leading-[150%] h-5 font-bold"
            />
          </div>
        </div>
        <div className="box-border w-full h-[2px] bg-primary-light-100 my-4"></div>

        <div className="w-full flex flex-col gap-4 relative">
          {ACCOUNT_SIDE_MENU.map((item: AccountMenuItem) => (
            <Link
              prefetch={false}
              key={item.id}
              href={item.url}
              className={clsx(
                'w-full px-2 relative xl:px-3 2xl:px-4 flex items-center gap-2 xl:gap-3 2xl:gap-[20px] h-[60px] z-[1] !box-border group transition-all duration-300',
                {
                  'bg-primary-light-50 active rounded-[4px]':
                    active === item.id,
                },
              )}
              onClick={() => handleChangePage(item.id)}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={getIcon(item, active, hovered)}
                alt={`${item.icon} active`}
                width={24}
                height={24}
                loading="lazy"
                className="!w-[24px] aspect-[24/24] object-cover transition-all duration-300"
              />
              <span
                className={clsx(
                  'text-dark-200 transition-colors duration-500 text-[16px] leading-[140%] group-hover:text-green-500 capitalize whitespace-nowrap',
                  { '!text-green-500 font-bold': active === item.id },
                )}
              >
                {t(item.label)}
              </span>
              <div className="w-fit h-hit">
                <TagRenderer {...item} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
