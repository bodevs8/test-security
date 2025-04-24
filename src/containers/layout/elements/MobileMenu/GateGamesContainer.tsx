'use client';

import { RouterPathEnum } from '@/enums';
import { useUserStore } from '@/hooks/stores';

import { useLiveChat } from '@/hooks/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import MenuList from './MenuList';
import PlayerReward from './PlayerReward';

type Props = {
  setOpen: (open: boolean) => void;
};

const GateGamesContainer = ({ setOpen }: Props) => {
  const t = useTranslations();
  const { isLoggedIn } = useUserStore((state) => state);

  const { openLiveChat } = useLiveChat();

  return (
    <>
      <div className="p-3 pb-0 overflow-y-auto" aria-hidden={false}>
        <MenuList
          isLoggedIn={isLoggedIn}
          setOpenGateGames={() => setOpen(false)}
        />
        <div className="mt-6">
          <PlayerReward />
        </div>

        <div className="my-6">
          <div className="flex flex-col w-full">
            <Link
              href={RouterPathEnum.News}
              className="flex items-center justify-between gap-2 p-3 h-11 w-full"
            >
              <div className="text-[12px] leading-[140%] font-medium text-dark-700 uppercase">
                {t('Common.menu.news')}
              </div>
            </Link>
            <div className="w-full h-[1px] bg-primary-light-200 my-2"></div>
            <Link
              href="#"
              onClick={() => {
                openLiveChat();
              }}
              className="flex items-center justify-between gap-2 p-3 h-11 w-full"
            >
              <div className="text-[12px] leading-[140%] font-medium text-dark-700 uppercase">
                {t('Common.menu.support')}
              </div>
            </Link>
            <div className="w-full h-[1px] bg-primary-light-200 my-2"></div>
            <Link
              href={process.env.NEXT_PUBLIC_TELE_SUPPORT!}
              target="_blank"
              className="flex items-center justify-between gap-2 p-3 h-11 w-full"
            >
              <div className="text-[12px] leading-[140%] font-medium text-dark-700 uppercase">
                {t('Common.menu.telegram')}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GateGamesContainer;
