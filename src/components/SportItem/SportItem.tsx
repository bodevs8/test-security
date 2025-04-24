'use client';
import type { IFrameLinkSports } from '@/types/game';
import { useGameContext } from '@/hooks/contexts';
import { useDevice } from '@/hooks/utils/use-device';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

type SportItemProps = IFrameLinkSports & {
  isMobile?: boolean;
  className?: string;
  providerNameClassName?: string;
};

export const SportItem = ({
  id,
  href,
  img,
  imgMobile,
  name,
  isMobile = false,
  className,
  providerNameClassName,
}: SportItemProps) => {
  const t = useTranslations('Pages.HomePage');
  const { openIframeGame } = useGameContext();
  const { isTablet } = useDevice();

  const providerName = useMemo(() => t(`sport.provider.${name}`), [t, name]);
  const bgHoverBg = useMemo(() => `/images/sport/tabs/${name}.webp`, [name]);
  const idProvider = useMemo(() => `${name}-${id}`, [name, id]);

  const isMobileDisplayed = isTablet || isMobile;

  return (
    <Link
      prefetch={false}
      className={clsx(
        'relative w-full aspect-[177/188] md:h-[327.53px] lg:h-[366px] md:aspect-[337/366] group cursor-pointer block rounded-[12px] overflow-hidden',
        className,
      )}
      href={isMobileDisplayed ? '#' : href}
      id={idProvider}
      onClick={() => {
        if (isMobileDisplayed) {
          openIframeGame(href);
        }
      }}
    >
      <Image
        src={isMobile ? imgMobile : img}
        alt={`provider-${name}`}
        width={337}
        height={366}
        className="aspect-[177/188] md:aspect-[337/366] object-cover"
      />
      <div className="transition-all absolute left-[1%] bottom-0 w-full aspect-[175/36] md:aspect-[341/70] opacity-0 group-hover:opacity-100">
        <Image
          src={bgHoverBg}
          alt={`provider-${name}`}
          width={341}
          height={70}
          className="aspect-[175/36] md:aspect-[341/70] w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center gap-2 absolute left-[2.3%] bottom-0 w-[97.98%] aspect-[341/70] transition-all">
        <div
          className={clsx(
            'text-white text-[12px] leading-[18px] md:text-[20px] md:mt-4 lg:mt-0 md:leading-[31px] font-bold lg:font-[600] uppercase',
            providerNameClassName,
          )}
        >
          {providerName}
        </div>
        <div className="hidden lg:block opacity-0 -translate-x-[100%] group-hover:opacity-100 group-hover:translate-x-0 transition-all">
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
  );
};
