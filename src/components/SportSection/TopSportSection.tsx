'use client';

import type { SportItem } from '@/types/sport';
import { BaseSection } from '@/components/BaseSection';
import { Button } from '@/components/ui/button';
import { SPORT_GAMES } from '@/constant/sport';
import { ButtonVariantsEnum } from '@/enums';
import { useGameContext } from '@/hooks/contexts';
import { useDevice } from '@/hooks/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/pages/sports/top-sport.scss';

export const TopSportSection = () => {
  const t = useTranslations('Pages.SportsPage');
  const { openIframeGame } = useGameContext();
  const { isMobile, isTablet } = useDevice();
  const isMobileDisplayed = isTablet || isMobile;

  return (
    <div className="xspc:max-w-[956px]">
      <BaseSection title={t('explosive_sports')} iconName="captions" />
      <div className="grid grid-cols-2 gap-3 md:flex md:justify-between xl:justify-start mt-3 md:mt-5">
        {SPORT_GAMES.map((game: SportItem) => (
          <Link
            href={isMobileDisplayed ? '#' : game.href}
            key={game.id}
            className="relative rounded-[6px] overflow-hidden group"
            onClick={() => {
              if (isMobileDisplayed) {
                openIframeGame(game.href);
              }
            }}
          >
            <Image
              src={isMobile ? game.imgMb : game.img}
              alt={game.title}
              width={230}
              height={400}
              className="max-w-full md:max-w-[230px] min-h-[257px] md:min-h-[400px] max-h-[400px] w-full h-full object-cover object-left-top group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute left-0 bottom-0 w-full pt-[7px] sm:pt-3 pb-[7px] sm:pb-3.5 px-3 md:px-4 flex flex-col gap-1 bg-item-sport-gradient">
              <div className="transform transition-transform duration-300 group-hover:translate-y-[-2px]">
                <div className="text-white text-base sm:text-lg lg:text-xl font-extrabold uppercase leading-[140%] italic mb-1">
                  {game.title}
                </div>
                <div className="text-sm font-normal leading-[140%] text-white opacity-70">
                  {game.content}
                </div>
                <div className="h-0 overflow-hidden transition-all duration-300 group-hover:h-[50px] group-hover:w-full">
                  <Button
                    id="top-sport-button"
                    name="top-sport-button"
                    variant={ButtonVariantsEnum.Default}
                    className="mt-2 !w-full"
                  >
                    {t('button_play')}
                  </Button>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 z-10 transition-opacity duration-300 group-hover:opacity-0">
              <Image
                src={game.shape ?? ''}
                alt={game.title}
                width={230}
                height={400}
                className="w-full h-48 2xsm:h-[64.1vw] md:h-full object-cover md:ml-10 lg:ml-0"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
