import type { BigWins } from '@/types/game';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useMemo } from 'react';
import RecentWinSwiper from './RecentWinSwiper';

type RecentWinsProps = {
  className?: string;
  bigWins: BigWins;
};

export const RecentWins = ({ className, bigWins }: RecentWinsProps) => {
  const t = useTranslations();
  const recentWins = useMemo(
    () => (bigWins.nearWin || []).sort((a, b) => b.winlost - a.winlost),
    [bigWins.nearWin],
  );
  return (
    <div className={clsx('w-full p-3 max-md:pr-0 lg:p-6', className)}>
      <div className="flex items-center gap-2">
        <Image
          src="/images/coin.webp"
          alt="recent win icon"
          width={24}
          height={24}
          loading="lazy"
          className="!w-[20px] md:!w-[24px]"
        />
        <span className="text-white font-[600] md:font-bold leading-6 text-[16px]">
          {t('Common.recent_wins.title')}
        </span>
      </div>
      <div className="mt-4">
        <RecentWinSwiper recentWins={recentWins} />
      </div>
    </div>
  );
};
