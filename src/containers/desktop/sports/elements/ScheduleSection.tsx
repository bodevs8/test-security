'use client';

import type { TabType } from '@/types/menu';
import type { ScheduleCompetition, ScheduleMatches } from '@/types/schedule';
import { BaseSection } from '@/components/BaseSection';
import { Tabs } from '@/components/Tabs';
import { LIMIT_SEASONS } from '@/constant/app';
import { HashEnum, QueryKeyEnum } from '@/enums';
import { ScheduleFilterEnum, ScheduleTypeEnum } from '@/enums/schedule';
import { useHash } from '@/hooks/utils/use-hash';
import IconLeague from '@/public/images/sport/icon-league.webp';
import { getScheduleMatches } from '@/services/client/schedule-services';

import { getToday, getTomorrow } from '@/utils/date';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import ScheduleContent from './ScheduleContent';
import ScheduleSidebar from './ScheduleSidebar';

type Props = {
  scheduleCompetitions: ScheduleCompetition[];
  initData: ScheduleMatches[];
};

const ScheduleSection = ({ scheduleCompetitions, initData }: Props) => {
  const t = useTranslations('Pages.SportsPage');
  const { hash } = useHash();
  const ref = useRef<HTMLDivElement>(null);

  const SCHEDULESPORTS_SPORTS_FILTER: TabType[] = [
    { id: 1, title: t('categories.schedule.filter.comingSoon') },
    { id: 2, title: t('categories.schedule.filter.today') },
    { id: 3, title: t('categories.schedule.filter.tomorrow') },
    { id: 4, title: t('categories.schedule.filter.thisWeek') },
  ];

  const allOption = {
    logo: IconLeague,
    name: t('categories.schedule.filter.allTournaments'),
    order: -1,
    id: ScheduleFilterEnum.All,
    year: '',
    competition_id: ScheduleFilterEnum.All,
  };
  const updatedScheduleCompetitions = [allOption, ...scheduleCompetitions];

  const [valueFilter, setValueFilter] = useState<{
    filter: string;
    date?: string;
    seasons?: string;
    num_seasons?: number;
    odds?: boolean;
  }>({
    filter: ScheduleFilterEnum.All,
    num_seasons: LIMIT_SEASONS,
    odds: true,
  });

  const { data: scheduleMatches = initData, isFetching } = useQuery({
    queryKey: [QueryKeyEnum.ScheduleMatches, valueFilter],
    queryFn: () => getScheduleMatches(valueFilter),
    initialData: initData,
    staleTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const handleClickFilterSchedule = useCallback((value: number | string) => {
    const today = getToday();
    const tomorrow = getTomorrow();

    switch (value) {
      case ScheduleTypeEnum.All:
        setValueFilter((prev) => ({
          ...prev,
          filter: ScheduleFilterEnum.All,
          date: undefined,
        }));
        break;
      case ScheduleTypeEnum.Today:
        setValueFilter((prev) => ({
          ...prev,
          filter: ScheduleFilterEnum.Date,
          date: today,
        }));
        break;
      case ScheduleTypeEnum.Tomorrow:
        setValueFilter((prev) => ({
          ...prev,
          filter: ScheduleFilterEnum.Date,
          date: tomorrow,
        }));
        break;
      case ScheduleTypeEnum.Week:
        setValueFilter((prev) => ({
          ...prev,
          filter: ScheduleFilterEnum.Week,
          date: today,
        }));
        break;
      default:
        break;
    }
  }, []);

  const handleClickCompetition = (competitionId: string) => {
    setValueFilter((prev) => ({
      ...prev,
      seasons:
        competitionId === ScheduleFilterEnum.All ? undefined : competitionId,
      num_seasons:
        competitionId === ScheduleFilterEnum.All ? LIMIT_SEASONS : undefined,
    }));
  };

  useEffect(() => {
    if (hash === HashEnum.Odds) {
      const timeout = setTimeout(() => {
        const element = ref.current;
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.scrollY;
          const offset = 200;

          window.scrollTo({
            top: absoluteElementTop - offset,
            behavior: 'smooth',
          });
        }
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    }
    return () => {};
  }, [hash]);

  return (
    <div
      className="schedule-sports lg:relative lg:z-[1]"
      id={HashEnum.Odds}
      ref={ref}
    >
      <div className="flex items-center justify-between">
        <BaseSection
          title={t('categories.schedule.section_title')}
          iconName="calendar"
        />
        <div className="flex items-center gap-3">
          <Tabs
            items={SCHEDULESPORTS_SPORTS_FILTER}
            className="z-[1] relative mb-4 lg:mb-6 schedule-filter"
            onClick={handleClickFilterSchedule}
            tabClassName="!capitalize"
          />
        </div>
      </div>
      <div className="flex gap-6">
        <ScheduleSidebar
          scheduleCompetitions={
            updatedScheduleCompetitions as ScheduleCompetition[]
          }
          onClick={handleClickCompetition}
        />
        <ScheduleContent
          scheduleMatches={scheduleMatches}
          isLoading={isFetching}
        />
      </div>
    </div>
  );
};

export default ScheduleSection;
