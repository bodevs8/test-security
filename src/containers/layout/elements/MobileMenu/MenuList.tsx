import { BrandingTag } from '@/components/Tag/BrandingTag';
import { HEADER_MENU_ITEMS } from '@/constant/app';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

type MenuListProps = {
  isLoggedIn: boolean;
  setOpenGateGames?: () => void;
};

const MenuList = ({ isLoggedIn, setOpenGateGames }: MenuListProps) => {
  const t = useTranslations();
  const menuItems = useMemo(() => {
    return HEADER_MENU_ITEMS.filter((item) => !item.hiddenOnGateGames);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-y-4">
      {menuItems.map((item) => {
        if (item.showOnLoggedIn && !isLoggedIn) return null;

        return (
          <Link
            key={item.id}
            href={item.to}
            onClick={() => setOpenGateGames?.()}
            className="w-full flex items-center justify-center relative !h-[61px]"
          >
            <div className="flex items-center justify-center flex-col gap-1">
              <Image
                src={item.iconGateGame || item.icon}
                alt={t(item.label)}
                width={24}
                height={24}
                className="!size-[24px]"
              />
              <div className="text-[12px] font-medium text-primary-blue-400 leading-[140%] capitalize">
                {t(item.label)}
              </div>
            </div>
            {item.tagType && (
              <BrandingTag
                className="absolute top-[1px] right-[3px] !w-[26px] !h-[13px] !text-[8px] !py-0 !px-0 text-center"
                type={item.tagType}
                showIcon={false}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default MenuList;
