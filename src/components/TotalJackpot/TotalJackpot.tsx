'use client';

import { AnimateNumber } from '@/components/AnimateNumber';
import { Button } from '@/components/ui/button';
import { ButtonSizeEnum, RouterPathEnum } from '@/enums';
import { useGameContext } from '@/hooks/contexts';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const TotalJackpot = () => {
  const t = useTranslations();
  const { totalJackpot } = useGameContext();

  return (
    <div className="w-full aspect-[458/258] md:aspect-[665/489] relative">
      <picture className="relative z-[1]">
        <source
          media="(min-width: 768px)"
          srcSet="/images/home/jackpot/jackpot-bg.webp"
        />
        <source srcSet="/images/home/jackpot/jackpot-bg-mb.webp" />
        <img
          src="/images/home/jackpot/jackpot-bg-mb.webp"
          className="aspect-[458/258] w-[117.3%] max-md:mx-[-8.5%] md:aspect-[665/489] md:w-full max-md:max-w-[unset] object-cover"
          alt="jackpot bg"
          loading="eager"
        />
      </picture>
      <div className="total-jackpot-value absolute z-[2] w-[59.83%] md:w-[61.5%] left-[20.9%] md:left-[18.94%] bottom-[30%] md:bottom-[19.19%] flex justify-center items-center gap-1 font-black text-[6.15vw] leading-[8.717vw] md:text-[35px] min-[1440px]:text-[45px] md:leading-[63px]">
        <AnimateNumber
          className="whitespace-nowrap"
          to={totalJackpot || 0}
          unit="D"
        />
      </div>
      <Link href={RouterPathEnum.Jackpot} aria-label="Play now">
        <Button
          id="play-now-button"
          name="play-now-button"
          size={ButtonSizeEnum.SM}
          className="max-lg:!hidden min-w-[155px] !w-[155px] h-[40px] uppercase !absolute left-[50%] -translate-x-[50%] bottom-[5%] min-[1440px]:bottom-[7.5%] z-[3] !font-bold !text-[16px]"
        >
          {t('Common.button.play_now')}
        </Button>
      </Link>
    </div>
  );
};
