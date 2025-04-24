'use client';

import type { ScheduleCompetition, ScheduleMatches } from '@/types/schedule';
import { BaseMultiSelect } from '@/components/BaseMultiSelect';
import { BaseSection } from '@/components/BaseSection';
import { LIMIT_SEASONS } from '@/constant/app';
import { SCHEDULESPORTS_SPORTS_FILTER } from '@/constant/schedule';
import { HashEnum, QueryKeyEnum } from '@/enums';
import { ScheduleFilterEnum, ScheduleTypeEnum } from '@/enums/schedule';
import { useHash } from '@/hooks/utils/use-hash';
import IconLeagueMobile from '@/public/images/sport/icon-league-mb.webp';
import { getScheduleMatches } from '@/services/client/schedule-services';
import { getToday, getTomorrow } from '@/utils/date';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ScheduleContent from './ScheduleContent';

type Props = {
  scheduleCompetitions: ScheduleCompetition[];
  initData: ScheduleMatches[];
};

const ScheduleSection = ({ scheduleCompetitions, initData }: Props) => {
  const t = useTranslations();
  const { hash } = useHash();
  const ref = useRef<HTMLDivElement>(null);

  const [selectedFilter, setSelectedFilter] = useState<ScheduleTypeEnum>(
    ScheduleTypeEnum.All,
  );

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

  const updatedScheduleCompetitions = useMemo(() => {
    const allOption = {
      logo: IconLeagueMobile.src,
      name: t('Pages.SportsPage.categories.schedule.filter.allTournaments'),
      order: -1,
      id: ScheduleFilterEnum.All,
      year: '',
      competition_id: ScheduleFilterEnum.All,
    };
    return [allOption, ...scheduleCompetitions];
  }, [t, scheduleCompetitions]);

  const { data: scheduleMatches = initData, isFetching } = useQuery({
    queryKey: [QueryKeyEnum.ScheduleMatches, valueFilter],
    queryFn: () => getScheduleMatches(valueFilter),
    initialData: initData,
    staleTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const typeDateFilter = useMemo(() => {
    return SCHEDULESPORTS_SPORTS_FILTER.map((item) => ({
      label: t(item.label),
      value: item.value,
    }));
  }, [t]);

  const typeOptions = useMemo(() => {
    return updatedScheduleCompetitions.map((item) => ({
      label: item.name,
      value: item.id,
      icon: item.logo,
    }));
  }, [updatedScheduleCompetitions]);

  const handleChangeCompetition = useCallback((competitionId: string) => {
    setValueFilter((prev) => ({
      ...prev,
      seasons:
        competitionId === ScheduleFilterEnum.All ? undefined : competitionId,
      num_seasons:
        competitionId === ScheduleFilterEnum.All ? LIMIT_SEASONS : undefined,
    }));
  }, []);

  const handleChangeFilter = useCallback((filter: ScheduleTypeEnum) => {
    setSelectedFilter(filter);
    const today = getToday();
    const tomorrow = getTomorrow();

    switch (filter) {
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

  const defaultDateOption =
    typeDateFilter.find((item) => item.value === selectedFilter) ||
    typeDateFilter[0];

  const defaultSeasonOption =
    (valueFilter.seasons &&
      typeOptions.find((item) => item.value === valueFilter.seasons)) ||
    typeOptions.find((item) => item.value === ScheduleFilterEnum.All) ||
    typeOptions[0];

  useEffect(() => {
    if (hash === HashEnum.Odds) {
      const timeout = setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    }
    return () => {};
  }, [hash]);

  return (
    <div id={HashEnum.Odds} ref={ref} className="pt-2">
      <BaseSection
        title={t('Pages.SportsPage.categories.schedule.section_title')}
        iconName="calendar"
      />

      <div className="flex items-center gap-4 mt-3">
        <div className="flex-1">
          <BaseMultiSelect
            options={typeDateFilter}
            multiOption={false}
            onChange={(value) => handleChangeFilter(Number(value[0]))}
            className="text-navy-blue-500"
            placeholder={t(
              'Pages.SportsPage.categories.schedule.filter.select_date',
            )}
            optionWrapperClassName="!max-h-[390px]"
            defaultOption={defaultDateOption}
            initialValues={[selectedFilter]}
            isIconCheck
          />
        </div>
        <div className="flex-1">
          <BaseMultiSelect
            options={typeOptions}
            multiOption={false}
            isImageUrlIcon
            onChange={(value) => handleChangeCompetition(String(value[0]))}
            className="text-black"
            placeholder={t(
              'Pages.SportsPage.categories.schedule.filter.select_tournament',
            )}
            optionWrapperClassName="!max-h-[460px] md:!max-h-[200px]"
            defaultOption={defaultSeasonOption}
            initialValues={
              (valueFilter.seasons && [valueFilter.seasons]) || [
                valueFilter.filter,
              ]
            }
            isIconCheck
          />
        </div>
      </div>
      <ScheduleContent
        scheduleMatches={scheduleMatches}
        isLoading={isFetching}
      />
    </div>
  );
};

export default ScheduleSection;
