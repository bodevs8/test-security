import type { MenuItem } from '@/types/menu';
import { Tag } from '@/components/Tag';
import { Button } from '@/components/ui/button';
import { SizeEnum } from '@/enums';
import { useGameContext } from '@/hooks/contexts';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '@radix-ui/react-navigation-menu';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const MenuItemContent = ({
  item,
  priority,
  isActive,
  title,
}: {
  item: MenuItem;
  priority?: boolean;
  title: string;
  isActive?: boolean;
}) => {
  return (
    <div
      className={clsx(
        'header-menu-item__content flex items-center gap-1.5 font-bold px-3 pt-3 pb-2 lg:text-[0.885vw] 2xl:text-sm lg:px-[0.6vw] 2xl:px-3 lg:py-[0.833vw] 2xl:pt-3 2xl:pb-2 h-[40px] text-white hover:text-primary-200 relative capitalize whitespace-nowrap',
        { active: isActive },
      )}
    >
      <Image
        width={16}
        height={16}
        src={item.icon}
        alt={`${title} icon`}
        fetchPriority={priority ? 'high' : 'low'}
        loading={priority ? 'eager' : 'lazy'}
        className="size-5 lg:size-[1.242vw] 2xl:size-5 aspect-square !object-contain"
      />
      {title}
      {item.tagType && (
        <Tag
          className="absolute top-0 right-1 !h-[14px] !text-[10px] md:!text-[8px] 2xl:!text-[10px] !font-bold"
          type={item.tagType}
          size={SizeEnum.Small}
          showIcon={false}
        />
      )}
    </div>
  );
};

export const HeaderMenuItem = ({
  item,
  index = 10,
  isMobile,
  isIpad,
  isActive,
  isHidden,
}: {
  item: MenuItem;
  index?: number;
  isMobile?: boolean;
  isIpad?: boolean;
  isActive?: boolean;
  isHidden?: boolean;
}) => {
  const t = useTranslations();
  const gameContext = useGameContext();
  const pathname = usePathname();
  const active = pathname === item.to || pathname.startsWith(item.to);

  const router = useRouter();
  const priority = isIpad ? index <= 8 : !isMobile || index <= 2;

  const itemActive = (
    <div className="menu-active absolute top-0 left-3 -right-3 lg:left-0 lg:right-0 bottom-0 sub-item-active border-b-2 border-solid border-primary-light-200" />
  );

  if (item.children) {
    return (
      <NavigationMenuItem key={item.id} className="header-menu-item relative">
        <NavigationMenuTrigger className="capitalize">
          <Link href={item.to} prefetch={false}>
            <MenuItemContent
              item={item}
              title={t(item.label)}
              priority={priority}
              isActive={isActive}
            />
          </Link>
          {active && itemActive}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="min-w-screen pt-[2.5vw] 3xl:pt-12 pb-[2.083vw] 3xl:pb-10 flex justify-center gap-[1.25vw] 3xl:gap-6">
            {item.children.map((child) => (
              <Link
                key={child.id}
                href={child.to}
                prefetch={false}
                onClick={(e) => {
                  e.preventDefault();
                  if (child.gameQuery) {
                    gameContext.openGame(child.gameQuery);
                    return;
                  }
                  router.push(child.to);
                }}
                className="sub-menu__item-link relative"
              >
                <Image
                  src={child.iconWhite}
                  alt={`${child.label} white`}
                  width={185}
                  height={236}
                  className="h-[15vw] 3xl:h-[236px] aspect-[185/236] w-auto !object-contain"
                  loading="lazy"
                />
                <div
                  className={clsx(
                    'flex items-center gap-1 absolute w-fit whitespace-nowrap pl-[0.417vw] 3xl:pl-2 text-[1.25vw] 3xl:text-2xl bottom-[10px] right-1/2 transform translate-x-1/2 text-white font-bold uppercase',
                    child.customClass,
                    {
                      '!bottom-[0.833vw] 3xl:!bottom-2.5':
                        !child.icon && !child.iconActive,
                    },
                  )}
                >
                  {child.icon && !child.iconActive && (
                    <i className={clsx(child.icon)} />
                  )}
                  {child.iconActive && (
                    <Image
                      src={child.iconActive}
                      alt={`${child.label} active`}
                      width={24}
                      height={24}
                      loading="lazy"
                      className="w-auto h-[1.25vw] 3xl:h-6"
                    />
                  )}
                  <span className="text-[0.729vw] 3xl:text-sm whitespace-nowrap font-bold">
                    {t(child.label)}
                  </span>
                </div>
              </Link>
            ))}
            {item.submenuExtraInfo && (
              <Link
                href={item.to}
                prefetch={false}
                className="relative sub-menu__item-link"
              >
                <Image
                  src={item.submenuExtraInfo.image}
                  alt={item.id}
                  width={186}
                  height={228}
                  loading="lazy"
                  className="h-[15vw] 3xl:h-[228px] aspect-[186/228] w-auto !object-contain"
                />
                <div className="absolute bottom-[1.927vw] right-1/2 transform translate-x-1/2 flex flex-col items-center">
                  <div className="extra-info__number flex items-center justify-center rounded-full size-[2.5vw] 3xl:size-12 text-primary-200 text-[1.25vw] 3xl:text-2xl font-bold">
                    {item.submenuExtraInfo.total}
                  </div>
                  <Button
                    id={item.id}
                    name={item.label}
                    className="h-[1.667vw] 3xl:h-8 text-[0.729vw] 3xl:text-sm w-[5.625vw] 3xl:w-[108px] mt-[1.823vw] 3xl:mt-[35px]"
                  >
                    {t('Common.label.load_more')}
                  </Button>
                </div>
              </Link>
            )}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  if (isHidden) {
    return null;
  }

  return (
    <li className="header-menu-item relative">
      <Link key={item.id} href={item.to}>
        <MenuItemContent
          item={item}
          isActive={isActive}
          title={t(item.label)}
        />
      </Link>
      {active && itemActive}
    </li>
  );
};
