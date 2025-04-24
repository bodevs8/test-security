'use client';

import { BaseSection } from '@/components/BaseSection';
import { VIRTUAL_SPORTS_GAMES } from '@/constant/game';
import { useGameContext } from '@/hooks/contexts';
import { useDevice } from '@/hooks/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export const VirtualSportsMobile = () => {
  const t = useTranslations('Pages.SportsPage');
  const { isMobile, isTablet } = useDevice();
  const { openIframeGame } = useGameContext();

  const isDisplayedMobile = isTablet || isMobile;

  return (
    <div className="w-full">
      <BaseSection
        iconName="virtual-sport"
        title={t('categories.virtualSports.title')}
      >
        <div className="w-full grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {VIRTUAL_SPORTS_GAMES.map((sport) => (
            <Link
              key={sport.id}
              href={isDisplayedMobile ? '#' : sport.href}
              prefetch={false}
              className="relative w-full lg:aspect-[300/404] group cursor-pointer block overflow-hidden"
              onClick={(e) => {
                if (isDisplayedMobile) {
                  e.preventDefault();
                  openIframeGame(sport.href);
                }
              }}
            >
              <Image
                src={isDisplayedMobile ? sport.imageMobileSrc : sport.imageSrc}
                alt={sport.imageAlt}
                width={300}
                height={404}
                className="w-full lg:w-[300px]aspect-[177/238] lg:aspect-[300/404] object-cover"
              />
              <div className="transition-all absolute left-[2.3%] bottom-0 w-[97.98%] aspect-[175/36] lg:aspect-[283/70] opacity-0 group-hover:opacity-100">
                <Image
                  src={sport.tabImageSrc}
                  alt={sport.tabImageAlt}
                  width={283}
                  height={70}
                  className="aspect-[175/36] lg:aspect-[283/70] w-full object-left"
                />
              </div>
              <div className="flex items-center justify-center gap-2 absolute left-[2.3%] bottom-0 w-full lg:w-[97.98%] aspect-[175/36] lg:aspect-[283/70] transition-all">
                <div className="text-white text-[12px] leading-[18px] lg:text-[20px] lg:leading-[31px] font-bold lg:font-semibold uppercase ml-0 md:ml-10 lg:ml-[50px]">
                  {sport.label}
                </div>
                <div className="hidden md:block opacity-0 -translate-x-[100%] group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="arrow right"
                    width={25}
                    height={25}
                    className="aspect-[25/25] object-cover !w-[25px]"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </BaseSection>
    </div>
  );
};
