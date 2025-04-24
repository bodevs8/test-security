'use client';

import type { HotMatchType } from '@/types/game';
import { DATE_FORMAT, TIME_FORMAT_HOUR } from '@/constant/constants';

import { IframeLinkEnum } from '@/enums';
import { useGameContext } from '@/hooks/contexts';
import { useDevice } from '@/hooks/utils';

import IconLeagueDefault from '@/public/icons/league-default.svg';
import IconVsSport from '@/public/icons/vs.svg';
import BgLeagueDefault from '@/public/images/sport/bg-schedule-item-mb.webp';
import FallbackImage from '@/public/images/sport/club-logo-default.webp';
import { formatDate } from '@/utils/date';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import '@/styles/components/hotmatch-item.scss';

type Props = {
  item: HotMatchType;
  className?: string;
  priority?: boolean;
};

export const HotMatchItem = ({ item, className, priority }: Props) => {
  const t = useTranslations('Pages.SportsPage.categories.schedule');
  const { openIframeGame } = useGameContext();
  const { isMobile, isTablet } = useDevice();
  const isMobileDisplayed = isTablet || isMobile;

  const href = useMemo(
    () =>
      `${IframeLinkEnum.KSport}?matchId=${item.match_id}&leagueId=${item.league_id}`,
    [item.match_id, item.league_id],
  );

  const dayFormat = useMemo(
    () => formatDate(item?.text_time, DATE_FORMAT),
    [item?.text_time],
  );

  const hourFormat = useMemo(
    () => formatDate(item?.text_time, TIME_FORMAT_HOUR),
    [item?.text_time],
  );

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement>,
    imageUrl: string,
  ) => {
    if (imageUrl && e.currentTarget) {
      const img = document.createElement('img');
      img.onload = () => {
        if (e.currentTarget && imageUrl) {
          e.currentTarget.src = imageUrl;
        }
      };
      img.src = imageUrl;
    }
  };

  return (
    <Link
      href={isMobileDisplayed ? '#' : href}
      prefetch={false}
      onClick={(e) => {
        if (isMobileDisplayed) {
          e.preventDefault();
          openIframeGame(href);
        }
      }}
      className={clsx(
        'relative overflow-hidden block bg-hotmatch-item rounded-[6px] border border-primary-light-200 p-4 pt-[5px]',
        className,
      )}
    >
      <div className="absolute left-0 top-0">
        <Image
          src={BgLeagueDefault.src}
          alt={`bg-${item?.league_name}`}
          width={243}
          height={28}
          className="w-full h-full object-cover"
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'low'}
        />
      </div>
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1">
          <Image
            src={IconLeagueDefault.src}
            alt={item?.league_name || ''}
            width={20}
            height={20}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'low'}
            className="size-5"
            onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
              if (item?.league_image) {
                handleImageLoad(e, item.league_image);
              }
            }}
          />
          <span className="text-dark-700 text-xs font-medium capitalize w-[195px] line-clamp-1">
            {item?.league_name}
          </span>
        </div>
        <div className="text-dark-200 font-normal text-xs flex items-center gap-1">
          <span className="font-medium">{dayFormat}</span>
          <span>{hourFormat}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 justify-center">
        <div className="flex items-center gap-2">
          <span className="text-dark-700 text-sm text-right font-medium leading-[140%] capitalize w-[120px] max-width-[120px] min-w-0">
            <div className="line-clamp-1 w-full text-left overflow-hidden text-ellipsis">
              {item?.teams?.[0]?.name}
            </div>
          </span>
          <Image
            src={item?.teams?.[0]?.flag_thumbnail || ''}
            alt={item?.teams?.[0]?.name || ''}
            width={34}
            height={34}
            className="size-[34px] !object-contain"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'low'}
            priority={priority}
          />
        </div>
        <Image
          src={IconVsSport.src}
          alt="vs"
          width={24}
          height={34}
          className="w-[24px] h-[34px] object-contain"
        />
        <div className="flex items-center gap-2">
          <Image
            src={item?.teams?.[1]?.flag_thumbnail || FallbackImage.src}
            alt={item?.teams?.[1]?.name || '  '}
            width={34}
            height={34}
            className="size-[34px] !object-contain"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'low'}
            priority={priority}
          />
          <span className="text-dark-700 text-sm text-left font-medium leading-[140%] capitalize w-[120px] max-width-[120px] min-w-0">
            <div className="line-clamp-1 w-full text-right overflow-hidden text-ellipsis">
              {item?.teams?.[1]?.name}
            </div>
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-[6px] mt-3">
        <div className="flex-1 flex flex-col gap-1">
          <div className="text-center text-xs font-normal leading-[140%] text-dark-200 capitalize">
            {t('odds_handicap')}
          </div>
          <div className="flex items-center bg-white border border-neutral-400 justify-between py-1 px-4 relative rounded-[6px] h-[25px]">
            <span
              className={clsx('text-xs font-medium leading-[140%]', {
                'text-error': Number(item?.hdp?.hTeam?.odds) < 0,
                'text-green-500': Number(item?.hdp?.hTeam?.odds) >= 0,
              })}
            >
              {item?.hdp?.hTeam?.odds ? item?.hdp?.hTeam?.odds : '-'}
            </span>
            <span className="text-dark-700 text-xs font-medium leading-[140%]">
              {item?.hdp?.hTeam?.rate ? item?.hdp?.hTeam?.rate : '-'}
            </span>
            <span
              className={clsx('text-xs font-medium leading-[140%]', {
                'text-error': Number(item?.hdp?.aTeam?.odds) < 0,
                'text-green-500': Number(item?.hdp?.aTeam?.odds) >= 0,
              })}
            >
              {item?.hdp?.aTeam?.odds ? item?.hdp?.aTeam?.odds : '-'}
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="text-center text-xs font-normal leading-[140%] text-dark-200 capitalize">
            {t('odds_over_under')}
          </div>
          <div className="flex items-center bg-white border border-neutral-400 justify-between py-1 px-4 relative rounded-[6px] h-[25px]">
            <span
              className={clsx('text-xs font-medium leading-[140%]', {
                'text-error': Number(item?.ou?.hTeam?.odds) < 0,
                'text-green-500': Number(item?.ou?.hTeam?.odds) >= 0,
              })}
            >
              {item?.ou?.hTeam?.odds ? item?.ou?.hTeam?.odds : '-'}
            </span>
            <span className="text-dark-700 text-xs font-medium leading-[140%]">
              {item?.ou?.hTeam?.rate ? item?.ou?.hTeam?.rate : '-'}
            </span>
            <span
              className={clsx('text-xs font-medium leading-[140%]', {
                'text-error': Number(item?.ou?.aTeam?.odds) < 0,
                'text-green-500': Number(item?.ou?.aTeam?.odds) >= 0,
              })}
            >
              {item?.ou?.aTeam?.odds ? item?.ou?.aTeam?.odds : '-'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
