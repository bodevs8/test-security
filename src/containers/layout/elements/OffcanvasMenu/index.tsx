'use client';

import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import {
  HEADER_MENU_ITEMS,
  OFFCANVAS_BOTTOM_MENU,
  TOP_MENU_ITEMS,
} from '@/constant/app';
import {
  ButtonVariantsEnum,
  GameCategoryEnum,
  LogoSizeEnum,
  ModalIdEnum,
} from '@/enums';
import { useGameContext } from '@/hooks/contexts';
import { useModalStore, useUserStore } from '@/hooks/stores';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import cloneDeep from 'lodash/cloneDeep';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { menuVariants, overlayVariants } from './animations';
import { OffcanvasMenuItem } from './OffcanvasMenuItem';
import { OffcanvasUserProfile } from './OffcanvasUserProfile';

type OffcanvasMenuProps = {
  isOpen: boolean;
  toggleOffcanvas: () => void;
};

const OffcanvasMenu = ({ isOpen, toggleOffcanvas }: OffcanvasMenuProps) => {
  const pathname = usePathname();
  const { openIframeGame } = useGameContext();
  const [expandedMenuId, setExpandedMenuId] = useState<string | null>(null);
  const { isLoggedIn } = useUserStore((state) => state);
  const modalStore = useModalStore((state) => state);

  const filteredMenuItems = useMemo(() => {
    const items = cloneDeep(HEADER_MENU_ITEMS).filter(
      (item) => item.id !== GameCategoryEnum.Favorite && !item.hidden,
    );
    items.forEach((item) => {
      if (item.id !== 'sports') {
        item.children = [];
      } else {
        item.children = item.children?.map((child) => {
          child.onClick = () => {
            openIframeGame(child.to);
          };
          return child;
        });
      }
    });
    return items;
  }, [openIframeGame]);

  const handleMenuClick = () => {
    if (isOpen) {
      toggleOffcanvas();
    }
  };

  const handleLogout = () => {
    modalStore.openModal(ModalIdEnum.Logout);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  const topMenuItems = useMemo(() => {
    return TOP_MENU_ITEMS.sort((a, b) => a.order - b.order);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40"
          style={{ backgroundColor: 'rgba(15, 15, 15, 0.8)' }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          onClick={toggleOffcanvas}
        >
          <motion.div
            className="fixed top-0 left-0 z-50 h-full bg-neutral-700 w-78 flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-3 py-2 bg-neutral-800 h-[56px] flex-shrink-0">
              <Logo size={LogoSizeEnum.Small} />
              <button
                type="button"
                className="absolute top-4 right-4 flex items-center justify-between w-[30px] h-[30px]"
                onClick={toggleOffcanvas}
              >
                <span className="text-2xl text-white icon icon-close" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto scrollbar-hidden">
                <div className="p-4">
                  {isLoggedIn && (
                    <OffcanvasUserProfile toggleOffcanvas={toggleOffcanvas} />
                  )}

                  <div className="box-border w-full py-3 px-5">
                    <div className="linear-line mx-auto"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full side-menu-mobile mb-3 [&>*:last-child]:col-span-2">
                    {topMenuItems.map((item) => (
                      <Link
                        href={item.href}
                        key={item.key}
                        prefetch={false}
                        className={clsx(
                          'h-10 gap-2 px-4 py-1 rounded-[6px] w-full flex items-center !justify-start',
                          item.backgroundImage,
                          pathname === item.href && 'active',
                        )}
                        onClick={() => toggleOffcanvas()}
                      >
                        <Image
                          src={item.icon}
                          alt={`${item.title} icon`}
                          width={32}
                          height={32}
                          priority={false}
                          loading="lazy"
                          fetchPriority="low"
                        />
                        <div className="block whitespace-nowrap text-center text-base font-medium capitalize leading-normal text-white">
                          {item.title}
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* <Link
                    href={RouterPathEnum.Promotions}
                    prefetch={false}
                    className="block text-white mb-3"
                    onClick={toggleOffcanvas}
                  >
                    <Image
                      src="/images/promotions/vip-50-percent.webp"
                      width={312}
                      height={33}
                      className="!object-contain w-full rounded-lg"
                      alt="Vip Promotions"
                    />
                  </Link> */}

                  {filteredMenuItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl overflow-hidden mb-3"
                    >
                      <OffcanvasMenuItem
                        item={item}
                        isActive={pathname === item.to}
                        onClick={() => handleMenuClick()}
                        onToggleExpand={() =>
                          setExpandedMenuId(
                            expandedMenuId === item.id ? null : item.id,
                          )
                        }
                        isExpanded={expandedMenuId === item.id}
                        isHidden={item.showOnLoggedIn && !isLoggedIn}
                      />

                      {item.children && expandedMenuId === item.id && (
                        <div className="bg-neutral-500">
                          {item.children
                            .filter((child) => !child.hidden)
                            .map((child) => (
                              <OffcanvasMenuItem
                                key={child.id}
                                item={child}
                                isActive={pathname === child.to}
                                onClick={toggleOffcanvas}
                                isChild
                              />
                            ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="box-border w-full pb-3 px-5">
                    <div className="linear-line mx-auto"></div>
                  </div>

                  {OFFCANVAS_BOTTOM_MENU.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl overflow-hidden mb-3"
                    >
                      <OffcanvasMenuItem
                        item={item}
                        isActive={pathname === item.to}
                        onClick={toggleOffcanvas}
                      />
                    </div>
                  ))}

                  <div className="box-border w-full pb-3 px-5">
                    <div className="linear-line mx-auto"></div>
                  </div>

                  {isLoggedIn && (
                    <Button
                      type="button"
                      variant={ButtonVariantsEnum.Transparent}
                      onClick={handleLogout}
                      className="w-full h-[50px] flex items-center justify-center"
                      id="logout"
                      name="logout"
                    >
                      <span className="text-neutral-900 font-semibold uppercase leading-snug">
                        Đăng xuất
                      </span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OffcanvasMenu;
