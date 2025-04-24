import { ResponsiveView } from '@/components/ResponsiveView';
import { LIMIT_SEASONS } from '@/constant/app';
import SportsContainer from '@/containers/desktop/sports/SportContainer';
import SportsContainerMobile from '@/containers/mobile/sports/SportsContainerMobile';
import { ScheduleFilterEnum } from '@/enums/schedule';
import { getScheduleCompetitions, getScheduleMatches } from '@/services';

export const revalidate = 60;
export const dynamic = 'auto';

async function SportsPage() {
  const [scheduleCompetitions, scheduleMatches] = await Promise.all([
    getScheduleCompetitions(),
    getScheduleMatches({
      filter: ScheduleFilterEnum.All,
      num_seasons: LIMIT_SEASONS,
      odds: true,
    }),
  ]);

  return (
    <ResponsiveView
      mobile={
        <SportsContainerMobile
          scheduleCompetitions={scheduleCompetitions}
          scheduleMatches={scheduleMatches}
        />
      }
      desktop={
        <SportsContainer
          scheduleCompetitions={scheduleCompetitions}
          scheduleMatches={scheduleMatches}
        />
      }
    />
  );
}

export default SportsPage;
