import type { Event } from '@/types/schedule';
import { Button } from '@/components/ui/button';
import { ButtonVariantsEnum, IframeLinkEnum } from '@/enums';
import { useGameContext } from '@/hooks/contexts';
import VsSport from '@/public/images/sport/vs-sport.webp';
import {
  formatSportEventTime,
  getCurrentUnixTimestamp,
  getUnixTimestamp,
} from '@/utils/date';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

type Props = {
  event: Event;
};

const HALF_DAY = 43200;

// Component để hiển thị odds
const OddsDisplay = ({
  title,
  home,
  point,
  away,
  homeValue,
  awayValue,
}: {
  title: string;
  home: string;
  point: string;
  away: string;
  homeValue: number;
  awayValue: number;
}) => (
  <div className="flex-1 flex flex-col gap-1">
    <h5 className="text-center text-[10px] font-normal leading-[140%] text-dark-200 capitalize">
      {title}
    </h5>
    <div className="flex items-center bg-white rounded-3xl justify-between py-1 px-2 relative">
      <span
        className={clsx('text-xs font-medium leading-[140%]', {
          'text-error shape-red-bottom-left': homeValue < 0,
          'text-green-500 shape-green-top-left': homeValue >= 0,
        })}
      >
        {home}
      </span>
      <span className="text-dark-700 text-xs font-medium leading-[140%]">
        {point}
      </span>
      <span
        className={clsx('text-xs font-medium leading-[140%]', {
          'text-error shape-red-bottom-right': awayValue < 0,
          'text-green-500 shape-green-top-right': awayValue >= 0,
        })}
      >
        {away}
      </span>
    </div>
  </div>
);

const ScheduleItemMobile = ({ event }: Props) => {
  const t = useTranslations('Pages.SportsPage.categories.schedule');
  const { openIframeGame } = useGameContext();

  const eventTimeUnix = useMemo(
    () => getUnixTimestamp(event.sport_event.start_time),
    [event.sport_event.start_time],
  );

  const currentTimeUnix = useMemo(() => getCurrentUnixTimestamp(), []);

  const isComingSoon = useMemo(() => {
    return (
      eventTimeUnix - currentTimeUnix > 0 &&
      eventTimeUnix - currentTimeUnix <= HALF_DAY
    );
  }, [eventTimeUnix, currentTimeUnix]);

  const formattedDates = useMemo(
    () => formatSportEventTime(event.sport_event.start_time),
    [event.sport_event.start_time],
  );

  const href = useMemo(
    () =>
      `${IframeLinkEnum.KSport}?leagueId=${event.odds?.li}&matchId=${event.odds?.ei}`,
    [event.odds?.li, event.odds?.ei],
  );

  // Tối ưu hóa cách truy cập dữ liệu odds
  const oddsData = useMemo(() => {
    return {
      handicap: {
        home: event?.odds?.m?.[0]?.o?.[0]?.oh?.ma || '-',
        point: event?.odds?.m?.[0]?.o?.[0]?.p || '-',
        away: event?.odds?.m?.[0]?.o?.[0]?.oa?.ma || '-',
        homeValue: Number(event?.odds?.m?.[0]?.o?.[0]?.oh?.ma),
        awayValue: Number(event?.odds?.m?.[0]?.o?.[0]?.oa?.ma),
      },
      overUnder: {
        home: event?.odds?.m?.[1]?.o?.[0]?.oh?.ma || '-',
        point: event?.odds?.m?.[1]?.o?.[0]?.p || '-',
        away: event?.odds?.m?.[1]?.o?.[0]?.oa?.ma || '-',
        homeValue: Number(event?.odds?.m?.[1]?.o?.[0]?.oh?.ma),
        awayValue: Number(event?.odds?.m?.[1]?.o?.[0]?.oa?.ma),
      },
      ft: {
        home: event?.odds?.m?.[2]?.o?.[0]?.oh?.de || '-',
        point: event?.odds?.m?.[2]?.o?.[0]?.oa?.de || '-',
        away: event?.odds?.m?.[2]?.o?.[0]?.od?.de || '-',
        homeValue: Number(event?.odds?.m?.[2]?.o?.[0]?.oh?.de),
        awayValue: Number(event?.odds?.m?.[2]?.o?.[0]?.oa?.de),
      },
    };
  }, [event?.odds]);

  return (
    <div className="bg-schedule-item-mb rounded-md p-3 pt-2">
      <div className="flex items-center justify-end">
        {isComingSoon && (
          <div className="text-orange-50 text-[10px] uppercase font-extrabold italic ml-1 mr-auto">
            {t('coming_soon')}
          </div>
        )}
        <div className="flex text-xs font-normal leading-[140%] gap-1">
          <span className="text-dark-200">{formattedDates.hour}</span>
          <span className="text-dark-700">{formattedDates.day}</span>
        </div>
      </div>

      <div className="flex items-center justify-center mt-[7px] mb-2.5">
        <div className="flex items-center gap-1">
          <Image
            src={event.sport_event.competitors[0]?.logo || ''}
            alt={event.sport_event.competitors[0]?.name || ''}
            width={34}
            height={34}
            className="!object-contain size-[34px]"
          />
          <span className="text-sm font-medium leading-[140%] text-dark-700 w-[88px] truncate">
            {event.sport_event.competitors[0]?.name}
          </span>
        </div>
        <Image
          src={VsSport}
          alt="vs"
          width={60}
          height={34}
          className="w-[60px] h-[34px] !object-contain mx-1"
        />
        <div className="flex items-center gap-1">
          <Image
            src={event.sport_event.competitors[1]?.logo || ''}
            alt={event.sport_event.competitors[1]?.name || ''}
            width={34}
            height={34}
            className="!object-contain size-[34px]"
          />
          <span className="text-sm font-medium leading-[140%] text-dark-700 w-[88px] truncate">
            {event.sport_event.competitors[1]?.name}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-[6px]">
        <OddsDisplay title={t('odds_handicap')} {...oddsData.handicap} />
        <OddsDisplay title={t('odds_over_under')} {...oddsData.overUnder} />
        <OddsDisplay title={t('odds_ft')} {...oddsData.ft} />
      </div>
      <Link
        className="mt-2.5 w-full block"
        href="#"
        prefetch={false}
        onClick={(e) => {
          e.preventDefault();
          openIframeGame(href);
        }}
      >
        <Button
          id="schedule_button"
          name="schedule_button"
          className="w-full !h-10"
          variant={ButtonVariantsEnum.Secondary}
        >
          {t('schedule_button')}
        </Button>
      </Link>
    </div>
  );
};

export default ScheduleItemMobile;
