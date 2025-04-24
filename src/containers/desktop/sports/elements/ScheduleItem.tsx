import type { Event } from '@/types/schedule';
import { ScheduleMatch, ScheduleMatchUpdate } from '@/components/ScheduleMatch';
import { Button } from '@/components/ui/button';
import { ButtonVariantsEnum, IframeLinkEnum } from '@/enums';
import { useGameContext } from '@/hooks/contexts';
import { useDevice } from '@/hooks/utils';
import IconTeam from '@/public/icons/team.svg';
import { formatSportEventTime } from '@/utils/date';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

const HALF_DAY = 43200;

type Props = {
  event: Event;
};

const ScheduleItem = ({ event }: Props) => {
  const t = useTranslations('Pages.SportsPage.categories.schedule');
  const { isTablet } = useDevice();
  const { openIframeGame } = useGameContext();

  const href = useMemo(
    () =>
      `${IframeLinkEnum.KSport}?leagueId=${event.odds?.li}&matchId=${event.odds?.ei}`,
    [event.odds?.li, event.odds?.ei],
  );

  const eventTimeUnix = useMemo(
    () => dayjs(event.sport_event.start_time).unix(),
    [event.sport_event.start_time],
  );
  const currentTimeUnix = useMemo(() => dayjs().unix(), []);

  const isUpdate = useMemo(
    () => !event.sport_event.start_time,
    [event.sport_event.start_time],
  );
  const isLive = false;
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

  const oddsData = useMemo(() => {
    return {
      handicap: {
        home: event?.odds?.m?.[0]?.o?.[0]?.oh?.ma || '-',
        point: event?.odds?.m?.[0]?.o?.[0]?.p || '-',
        away: event?.odds?.m?.[0]?.o?.[0]?.oa?.ma || '-',
      },
      overUnder: {
        home: event?.odds?.m?.[1]?.o?.[0]?.oh?.ma || '-',
        point: event?.odds?.m?.[1]?.o?.[0]?.p || '-',
        away: event?.odds?.m?.[1]?.o?.[0]?.oa?.ma || '-',
      },
      ft: {
        home: event?.odds?.m?.[2]?.o?.[0]?.oh?.de || '-',
        point: event?.odds?.m?.[2]?.o?.[0]?.oa?.de || '-',
        away: event?.odds?.m?.[2]?.o?.[0]?.od?.de || '-',
      },
    };
  }, [event?.odds]);

  const renderStatus = useMemo(() => {
    if (isUpdate) return <div>00h00</div>;

    if (isLive) {
      return (
        <div>
          <span className="py-1 px-2 text-white bg-red-300 rounded-tl-[4px] rounded-bl-[4px]">
            •LIVE
          </span>
          <span className="py-1 px-2 text-secondary-200 bg-neutral-500 rounded-tr-[4px] rounded-br-[4px]">
            43:59''
          </span>
        </div>
      );
    }

    if (isComingSoon) {
      return (
        <div className="text-orange-50 font-extrabold text-sm leading-[140%] italic uppercase">
          {t('coming_soon')}
        </div>
      );
    }

    return (
      <span className="text-dark-200 font-normal leading-[140%] text-xs">
        {formattedDates.hour}
      </span>
    );
  }, [isUpdate, isLive, isComingSoon, formattedDates.hour, t]);

  const renderMatchInfo = useMemo(() => {
    if (isUpdate) {
      return (
        <div className="flex items-center gap-4 max-w-[423px] w-full justify-center">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium leading-[21px] capitalize text-neutral-300">
              {t('schedule_button_update')}
            </span>
            <Image
              src={IconTeam}
              alt="icon team"
              width={24}
              height={24}
              className="size-6"
            />
          </div>
          <span className="text-base font-medium leading-6">VS</span>
          <div className="flex items-center gap-3">
            <Image
              src={IconTeam}
              alt="icon team"
              width={24}
              height={24}
              className="size-6"
            />
            <span className="text-sm font-medium leading-[21px] capitalize text-neutral-300">
              {t('schedule_button_update')}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="w-[212px] flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <Image
            src={event.sport_event.competitors[0]?.logo || IconTeam}
            alt={event.sport_event.competitors[0]?.name || 'icon default'}
            width={26}
            height={26}
            className="!object-contain size-6 flex-shrink-0"
          />
          <span className="text-sm font-normal leading-[140%] text-navy-blue-500 truncate max-w-[156px]">
            {event.sport_event.competitors[0]?.name}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src={event.sport_event.competitors[1]?.logo || IconTeam}
            alt={event.sport_event.competitors[1]?.name || 'icon default'}
            width={26}
            height={26}
            className="!object-contain size-6"
          />
          <span className="text-sm font-normal leading-[140%] text-navy-blue-500">
            {event.sport_event.competitors[1]?.name}
          </span>
        </div>
      </div>
    );
  }, [isUpdate, event.sport_event.competitors, t]);

  const renderScheduleMatches = useMemo(() => {
    if (isUpdate) return <ScheduleMatchUpdate />;

    return (
      <>
        <ScheduleMatch
          oddsUnder={oddsData.handicap.home}
          oddsPoint={oddsData.handicap.point}
          oddsOver={oddsData.handicap.away}
        />
        <ScheduleMatch
          oddsUnder={oddsData.overUnder.home}
          oddsPoint={oddsData.overUnder.point}
          oddsOver={oddsData.overUnder.away}
        />
        <ScheduleMatch
          oddsUnder={oddsData.ft.home}
          oddsPoint={oddsData.ft.point}
          oddsOver={oddsData.ft.away}
        />
      </>
    );
  }, [isUpdate, oddsData]);

  return (
    <div className="w-full bg-schedule-item-gradient py-2 px-4 rounded-md flex items-center relative mb-2 last:mb-0">
      <div className="flex items-center">
        <div className="flex flex-col gap-1 w-[120px] border-r border-neutral-400 mr-3">
          {renderStatus}
          <span className="text-dark-200 font-medium">
            {isUpdate && '00/00/0000'}
            {isComingSoon && (
              <div className="text-dark-200 flex items-center gap-1 text-xs font-normal leading-[140%]">
                <span className="font-normal">{formattedDates.hour}</span>
                <span className="font-medium text-dark-700">
                  {formattedDates.day}
                </span>
              </div>
            )}
            {!isUpdate && !isComingSoon && formattedDates.day}
          </span>
        </div>
        {renderMatchInfo}
      </div>

      <div className="flex items-center gap-5 w-full">
        <div className="flex items-center gap-5">{renderScheduleMatches}</div>
        <Link
          id="k-sport-link"
          href={isTablet ? '#' : href}
          target="_blank"
          prefetch={false}
          className="hover:opacity-80 ml-auto"
          onClick={(e) => {
            if (isTablet) {
              e.preventDefault();
              openIframeGame(href);
            }
          }}
        >
          <Button
            variant={ButtonVariantsEnum.Secondary}
            type="button"
            id="k-sport-link"
            name="k-sport-link"
            className="!w-[137px] text-base !capitalize leading-[140%] !h-[46px]"
          >
            {t('schedule_button')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ScheduleItem;
