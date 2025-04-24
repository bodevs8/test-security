'use client';

import type { SportItem } from '@/types/sport';
import { BaseSection } from '@/components/BaseSection';

import { Button } from '@/components/ui/button';
import { ESPORTS_GAMES } from '@/constant/sport';
import { ButtonVariantsEnum, ModalIdEnum } from '@/enums';
import { useGameContext } from '@/hooks/contexts';
import { useModalStore, useUserStore } from '@/hooks/stores';
import { useDevice } from '@/hooks/utils';
import BgShapeImage from '@/public/images/sport/bg-shape-esport.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export const EsportSection = () => {
  const t = useTranslations('Pages.SportsPage');
  const { openIframeGame } = useGameContext();
  const { user } = useUserStore((state) => state);
  const modalStore = useModalStore((state) => state);
  const { isMobile, isTablet } = useDevice();
  const isMobileDisplayed = isTablet || isMobile;

  const handleClickEsport = (e: React.MouseEvent, item: SportItem) => {
    if (item?.requireLogin && !user) {
      modalStore.openModal(ModalIdEnum.Login);
    }

    if (isMobileDisplayed) {
      e.preventDefault();
      openIframeGame(item.href);
    }
  };

  return (
    <div>
      <BaseSection title={t('top_level_esports')} iconName="game" />
      <div className="flex gap-3 mt-3 md:mt-5 justify-between sxpc:min-h-[400px] flex-row xspc:flex-col">
        {ESPORTS_GAMES.map((game: SportItem) => (
          <Link
            key={game.id}
            href={isMobileDisplayed ? '#' : game.href}
            className="relative rounded-[6px] overflow-hidden group"
            onClick={(e) => handleClickEsport(e, game)}
          >
            <Image
              src={isMobile ? game.imgMb : game.img}
              alt={game.title}
              width={316}
              height={192}
              className="w-full xspc:w-[316px] h-[123px] 2xsm:h-full xspc:h-[192px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 z-10 transition-all duration-300 group-hover:scale-200 group-hover:translate-x-[-80px]">
              <Image
                src={BgShapeImage}
                alt={game.title}
                width={214}
                height={78}
                className="w-full h-12 sm:h-16 md:h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 py-[7px] md:py-3 px-3 md:px-4 flex flex-col gap-1 z-10">
              <div className="transform transition-transform duration-300 group-hover:translate-y-[-2px]">
                <div className="text-white text-sm sm:text-base font-extrabold uppercase leading-[140%] italic sm:mb-1">
                  {game.title}
                </div>
                <div className="text-[10px] sm:text-sm font-normal leading-[140%] text-white opacity-70">
                  {game.content}
                </div>
                <div className="h-0 overflow-hidden transition-all duration-300 group-hover:h-[50px] group-hover:w-full">
                  <Button
                    id="esport-button"
                    name="esport-button"
                    variant={ButtonVariantsEnum.Default}
                    className="mt-2 !w-full"
                  >
                    {t('button_play')}
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
