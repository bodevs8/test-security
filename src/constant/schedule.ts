import { ScheduleTypeEnum } from '@/enums/schedule';

export const SCHEDULESPORTS_SPORTS_FILTER = [
  {
    id: 1,
    label: 'Pages.SportsPage.categories.schedule.filter.comingSoon',
    value: ScheduleTypeEnum.All,
  },
  {
    id: 2,
    label: 'Pages.SportsPage.categories.schedule.filter.today',
    value: ScheduleTypeEnum.Today,
  },
  {
    id: 3,
    label: 'Pages.SportsPage.categories.schedule.filter.tomorrow',
    value: ScheduleTypeEnum.Tomorrow,
  },
  {
    id: 4,
    label: 'Pages.SportsPage.categories.schedule.filter.thisWeek',
    value: ScheduleTypeEnum.Week,
  },
];
