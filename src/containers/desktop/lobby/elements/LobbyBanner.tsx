'use client';

import type { BigWins } from '@/types/game';
import { AnimateNumber } from '@/components/AnimateNumber';
import { EmblaCarousel } from '@/components/EmblaCarousel';
import { AUTO_PLAY_DELAY_SWIPER } from '@/constant/app';
import { useGameContext } from '@/hooks/contexts';
import { useJackpot } from '@/hooks/jackpot/use-jackpot';
import { formatNumberWithCommas } from '@/utils/format-currency';
import { providerIconMapping, providerNameMapping } from '@/utils/game';
import clsx from 'clsx';
import Autoplay from 'embla-carousel-autoplay';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useMemo } from 'react';
import '@/styles/pages/lobby/banner.scss';

type LobbyBannerPropsType = {
  bigWins: BigWins;
  isCasino?: boolean;
};
const MAIN_CREDIT_UNIT = process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT;

export default function LobbyBanner({
  bigWins,
  isCasino: casino,
}: LobbyBannerPropsType) {
  const gameContext = useGameContext();
  const { totalJackpot } = useJackpot();
  const t = useTranslations();
  const recentWins = useMemo(
    () => (bigWins.nearWin || []).sort((a, b) => b.winlost - a.winlost),
    [bigWins],
  );

  return (
    <section
      className={clsx('lobby-banner', {
        casino,
      })}
    >
      <div className="x-container">
        <div className="overflow-hidden relative md:h-[198px]">
          <div className="md:absolute md:top-0">
            <div className="relative md:w-[253px] shrink-0">
              <picture>
                <source
                  media="(max-width: 767.5px)"
                  srcSet={`/images/lobby/banner/${casino ? 'casino-jackpot-thumb-mb' : 'jackpot-thumb-mb'}.webp`}
                />
                <img
                  src={`/images/lobby/banner/${casino ? 'casino-jackpot-thumb' : 'jackpot-thumb'}.webp`}
                  className="!object-contain aspect-[390/153] md:aspect-[253/198] w-full"
                  alt="jackpot thumb"
                  loading="lazy"
                />
              </picture>
              <div className="lobby-banner__jackpot">
                <Image
                  width={20}
                  height={20}
                  alt="coin"
                  src="/images/lobby/banner/coin.webp"
                  className="md:pt-1 size-[3.85vw] md:size-5 !object-contain"
                />
                <AnimateNumber
                  className="whitespace-nowrap text-gradient font-svn"
                  to={totalJackpot || 0}
                  unit=""
                />
              </div>
            </div>
          </div>
          <div className="hidden md:block md:ml-[283px] mt-4 md:mt-[26px]">
            <EmblaCarousel
              id="recent-win-swiper"
              slideClassName="pr-2 md:pr-3"
              containerClassName="ml-3 md:-mx-3"
              dragFree
              plugins={[
                Autoplay({
                  delay: AUTO_PLAY_DELAY_SWIPER,
                }),
              ]}
            >
              {recentWins.map((game, index) => {
                return (
                  <div
                    key={`recent-game-${index}`}
                    className="recent-win-item"
                    onClick={() => gameContext.openGame(game)}
                  >
                    <div className="relative">
                      <div className="absolute w-full pt-0.5 px-0.5 md:px-3 h-2 2xl:h-3 md:h-5 flex justify-center items-center text-[10px] gap-[1px] md:gap-[2px] bg-gradient-to-b to-gray-900/0 from-gray-900/70 ">
                        <i
                          className={clsx(
                            `icon-provider-${providerIconMapping(game.partner_provider)}`,
                            'text-white text-xs md:!text-base lg:!text-base 2xl:!text-[18px] mb-0.5',
                          )}
                        />
                        <span
                          className={clsx(
                            'text-white uppercase font-bold text-[7px] leading-[9px] md:text-[8px] md:leading-[10px] lg:text-[10px] 2xl:!text-[10px] whitespace-nowrap',
                          )}
                        >
                          {providerNameMapping(game.partner_provider)}
                        </span>
                      </div>
                      <Image
                        src={game.image}
                        alt={game.name}
                        width={100}
                        height={134}
                        className="rounded-sm"
                      />
                    </div>
                    <div className="md:space-y-2">
                      <span className="recent-win-item__label">
                        {t('Common.label.win')}
                      </span>
                      <p className="hidden md:block md:text-base font-medium leading-[22px] truncate max-w-[97px] md:max-w-[123px]">
                        {game.name}
                      </p>
                      <p className="text-xs leading-[17px] truncate max-w-[123px]">
                        {game.username}
                      </p>
                      <p className="md:py-2 text-[10px] md:text-xs leading-[17px] text-money font-bold">
                        {formatNumberWithCommas(game.winlost, MAIN_CREDIT_UNIT)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </EmblaCarousel>
          </div>
        </div>
      </div>
    </section>
  );
}
