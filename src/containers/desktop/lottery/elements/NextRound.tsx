'use client';

import { LODE_REGION_DATA } from '@/constant/lottery';
import { RouterPathEnum } from '@/enums';
import { useGameContext } from '@/hooks/contexts';
import { useDevice } from '@/hooks/utils/use-device';
import { getTimeRelease, randomBetNumber } from '@/utils/lottery';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Countdown } from './Countdown';

const NextRound = () => {
  const t = useTranslations('Pages.Lottery');
  const { isMobile, isTablet } = useDevice();
  const [playerCounts, setPlayerCounts] = useState<Record<string, number>>({});
  const { openIframeGame } = useGameContext();

  const router = useRouter();

  const handleOpenLink = () => {
    if (isMobile || isTablet) {
      openIframeGame(RouterPathEnum.LoDe3Mien);
      return;
    }
    router.push(RouterPathEnum.LoDe3Mien);
  };

  useEffect(() => {
    const counts = LODE_REGION_DATA.filter((el) => el.type === 1).reduce(
      (acc, el) => {
        acc[el.id] = Number(randomBetNumber(el.subtract));
        return acc;
      },
      {} as Record<string, number>,
    );

    setPlayerCounts(counts);
  }, []);

  return (
    <section className="flex gap-[3.08vw] xl:h-[560px] xl:w-[426px] md:gap-3 xl:gap-6 flex-col md:flex-row xl:flex-col">
      {LODE_REGION_DATA.filter((el) => el.type === 1).map((el) => {
        return (
          <div
            key={el.id}
            onClick={handleOpenLink}
            className={clsx(
              'next-round flex items-center gap-2 relative lg:cursor-pointer flex-1',
              el.class,
            )}
          >
            <Image
              src={`/images/lottery/next-round/${el.class}.webp`}
              alt="icon"
              width={392}
              height={162}
              className="md:inline-block object-contain h-[41.54vw] md:h-auto object-left w-full"
            />
            <div className="absolute left-[7.32vw] md:left-[1.25vw] xl:left-6 top-[7.32vw] md:top-[1.25vw] xl:top-7 flex flex-col justify-between">
              <div className="">
                <h3 className="text-[4.1vw] md:text-[2.08vw] xl:text-2xl font-extrabold italic skew-x-[5deg] uppercase mb-[2.05vw] md:mb-[0.63vw] xl:mb-2 leading-[7.18vw] md:leading-[2.19vw] xl:leading-7 -ml-0.5">
                  {t(el.name)}
                </h3>
                <p className="text-green-500 text-[3.08vw] md:text-[1.16vw] xl:text-xs leading-[2.64vw] md:leading-[1.72vw] xl:leading-[22px] mb-[7.18vw] md:mb-[2.5vw] xl:mb-7 font-normal">
                  {playerCounts[el.id] || 0} {t('next_round.player')}
                </p>
              </div>
              <div className="next-round__countdown">
                <Countdown
                  isNextRound
                  endTime={getTimeRelease(el.release_hour, true)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default NextRound;
