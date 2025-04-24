'use client';
import type { BottomMenuType } from '@/types/app';
import { GATE_GAME_PATHS } from '@/constant/app';
import {
  AccountLinkEnum,
  BottomMenuIdEnum,
  BottomMenuTypeEnum,
  ModalIdEnum,
  RouterPathEnum,
} from '@/enums';
import { useRefresh } from '@/hooks/account';
import { useModalStore } from '@/hooks/stores';
import { useLiveChat } from '@/hooks/utils';
import BottomMenuAccountActiveIcon from '@/public/images/bottom-menu/account-active.svg';
import BottomMenuAccountIcon from '@/public/images/bottom-menu/account.svg';
import BottomMenuCategoryActiveIcon from '@/public/images/bottom-menu/category-active.svg';
import BottomMenuCategoryIcon from '@/public/images/bottom-menu/category.svg';
import BottomMenuDepositIcon from '@/public/images/bottom-menu/deposit.webp';
import BottomMenuHomeActiveIcon from '@/public/images/bottom-menu/home-active.svg';
import BottomMenuHomeIcon from '@/public/images/bottom-menu/home.svg';
import BottomMenuLiveChatActiveIcon from '@/public/images/bottom-menu/livechat-active.svg';
import BottomMenuLiveChatIcon from '@/public/images/bottom-menu/livechat.svg';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import GateGames from './GateGames';

import '@/styles/components/bottom-menu.scss';

const BottomMenu = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const { openLiveChat } = useLiveChat();
  const [zIndex, setZIndex] = useState(50);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const modalStore = useModalStore((state) => state);
  const { isLoggedIn } = useRefresh();

  const isOpenGateGames = useMemo(() => {
    return modalStore.isOpen(ModalIdEnum.GateGames);
  }, [modalStore]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const BOTTOM_MENU_ITEMS: BottomMenuType[] = useMemo(
    () => [
      {
        id: BottomMenuIdEnum.Home,
        label: 'Common.menu.home',
        icon: BottomMenuHomeIcon,
        iconActive: BottomMenuHomeActiveIcon,
        href: RouterPathEnum.Home,
        type: BottomMenuTypeEnum.Link,
        onClick: () => {
          modalStore.closeModal(ModalIdEnum.GateGames);
          router.push(RouterPathEnum.Home);
        },
      },
      {
        id: BottomMenuIdEnum.GateGames,
        label: 'Common.menu.category',
        icon: BottomMenuCategoryIcon,
        iconActive: BottomMenuCategoryActiveIcon,
        type: BottomMenuTypeEnum.GateGames,
        activePaths: GATE_GAME_PATHS,
        onClick: () => {
          if (isOpenGateGames) {
            modalStore.closeModal(ModalIdEnum.GateGames);
          } else {
            modalStore.openModal(ModalIdEnum.GateGames);
          }
        },
      },
      {
        id: BottomMenuIdEnum.Deposit,
        label: 'Common.menu.deposit',
        icon: BottomMenuDepositIcon,
        iconActive: BottomMenuDepositIcon,
        href: AccountLinkEnum.Deposit,
        type: BottomMenuTypeEnum.Link,
        requireLogin: true,
        hideOnLogout: true,
        onClick: () => {
          if (isLoggedIn) {
            modalStore.closeModal(ModalIdEnum.GateGames);
            router.push(AccountLinkEnum.Deposit);
          } else {
            modalStore.openModal(ModalIdEnum.Login);
          }
        },
      },
      {
        id: BottomMenuIdEnum.Account,
        label: 'Common.menu.account',
        icon: BottomMenuAccountIcon,
        iconActive: BottomMenuAccountActiveIcon,
        href: AccountLinkEnum.Overview,
        type: BottomMenuTypeEnum.Link,
        requireLogin: true,
        activeWithUrl: [
          AccountLinkEnum.Withdraw,
          AccountLinkEnum.P2P,
          AccountLinkEnum.TransactionHistory,
          AccountLinkEnum.BetHistory,
          AccountLinkEnum.BankInfo,
          AccountLinkEnum.MyProfile,
          AccountLinkEnum.Password,
          AccountLinkEnum.PromotionApplied,
        ],
        onClick: () => {
          if (isLoggedIn) {
            modalStore.closeModal(ModalIdEnum.GateGames);
            router.push(AccountLinkEnum.Overview);
          } else {
            modalStore.openModal(ModalIdEnum.Login);
          }
        },
      },
      {
        id: BottomMenuIdEnum.LiveChat,
        label: 'Common.menu.livechat',
        icon: BottomMenuLiveChatIcon,
        iconActive: BottomMenuLiveChatActiveIcon,
        type: BottomMenuTypeEnum.LiveChat,
        onClick: () => {
          openLiveChat();
        },
      },
    ],
    [modalStore, router, openLiveChat, isLoggedIn],
  );

  const isHomeActive = (item: BottomMenuType) => {
    return (
      item.href === RouterPathEnum.Home && pathname === RouterPathEnum.Home
    );
  };

  const isPathActive = (item: BottomMenuType) => {
    return (
      item.href !== RouterPathEnum.Home &&
      item.href &&
      pathname.includes(item.href)
    );
  };

  const isGateGamesActive = (
    item: BottomMenuType,
    isOpenGateGames: boolean,
  ) => {
    return item.id === BottomMenuIdEnum.GateGames && isOpenGateGames;
  };

  const isActivePathMatch = (item: BottomMenuType) => {
    return (
      pathname !== RouterPathEnum.Home &&
      (item.activePaths?.some(
        (path) => pathname.startsWith(path) || pathname === path,
      ) ||
        (item?.activeWithUrl && item.activeWithUrl.includes(pathname)))
    );
  };

  useEffect(() => {
    if (isOpenGateGames) {
      modalStore.closeModal(ModalIdEnum.GateGames);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const timeout = useRef<NodeJS.Timeout | null>(null);
  const handleZIndexChange = useCallback(() => {
    if (isOpenGateGames) {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      setZIndex(102);
      return;
    }
    timeout.current = setTimeout(() => {
      setZIndex(50);
    }, 800);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [isOpenGateGames]);

  useEffect(() => {
    handleZIndexChange();
  }, [handleZIndexChange]);

  if (!isClient) return null;

  return (
    <>
      {createPortal(
        <div
          className={clsx(
            'fixed bottom-0 left-0 right-0 flex items-center justify-between bg-white bottom-menu-container px-3',
          )}
          style={{ zIndex }}
        >
          {BOTTOM_MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              className={clsx(
                'flex flex-col items-center justify-center w-1/5 h-[54px] group relative pb-2 pt-1',
                {
                  'active !border-green-400 !border-t-[2px] !font-bold':
                    !isOpenGateGames &&
                    (isHomeActive(item) ||
                      isPathActive(item) ||
                      isGateGamesActive(item, isOpenGateGames!) ||
                      isActivePathMatch(item)),
                  'active !border-green-400 !border-t-[2px]':
                    isOpenGateGames && item.id === BottomMenuIdEnum.GateGames,
                  '!border-[0px]': item.id === BottomMenuIdEnum.Deposit,
                },
              )}
            >
              {item.type === BottomMenuTypeEnum.Link ? (
                <div
                  className={clsx(
                    'flex flex-col items-center w-full h-full justify-center',
                  )}
                  onClick={item.onClick}
                >
                  {item.id === BottomMenuIdEnum.Deposit && (
                    <>
                      <div className="bottom-menu-deposit absolute -top-2.5">
                        <Image
                          src={item.icon}
                          alt={`${t(item.label)} icon`}
                          width={42}
                          height={42}
                          className="!w-[42px] !h-[42px]"
                          priority
                          loading="eager"
                          fetchPriority="high"
                        />
                      </div>
                      <div className="opacity-0 h-[24px]"></div>
                    </>
                  )}
                  {item.id !== BottomMenuIdEnum.Deposit && (
                    <>
                      <Image
                        src={item.iconActive || item.icon}
                        alt={`${t(item.label)} icon`}
                        width={24}
                        height={24}
                        className="group-[.active]:block hidden"
                        priority
                        loading="eager"
                        fetchPriority="high"
                      />
                      <Image
                        src={item.icon}
                        alt={t(item.label)}
                        width={24}
                        height={24}
                        className="group-[.active]:hidden"
                        priority
                        loading="eager"
                        fetchPriority="high"
                      />
                    </>
                  )}
                  <span
                    className={clsx(
                      'text-xs mt-1 capitalize whitespace-nowrap text-primary-dark-200 text-[10px] font-[400] leading-[140%]',
                      'group-[.active]:text-green-500 group-[.active]:font-bold',
                    )}
                  >
                    {t(item.label)}
                  </span>
                </div>
              ) : (
                <div
                  className={clsx(
                    'flex flex-col items-center justify-between group',
                    {
                      'active !border-primary-blue-400':
                        isActivePathMatch(item) ||
                        (isOpenGateGames &&
                          item.type === BottomMenuTypeEnum.GateGames),
                    },
                  )}
                  onClick={item.onClick}
                >
                  <Image
                    src={
                      isActivePathMatch(item) ||
                      (isOpenGateGames &&
                        item.type === BottomMenuTypeEnum.GateGames)
                        ? item.iconActive || item.icon
                        : item.icon
                    }
                    alt={item.label}
                    width={24}
                    height={24}
                    priority
                    loading="eager"
                    fetchPriority="high"
                  />
                  <span
                    className={clsx(
                      'text-xs mt-1 capitalize whitespace-nowrap text-primary-dark-200 text-[10px] font-[400] leading-[140%]',
                      'group-[.active]:text-green-500 group-[.active]:font-bold',
                    )}
                  >
                    {t(item.label)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>,
        document.body,
      )}
      <GateGames drawerClassName="!z-[100] !rounded-0 !px-0 after:!hidden !pb-0" />
    </>
  );
};

export default BottomMenu;
