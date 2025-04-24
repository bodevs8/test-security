import type { ScheduleCompetition, ScheduleMatches } from '@/types/schedule';
import { EsportSection, TopSportSection } from '@/components/SportSection';
import ScheduleSection from './elements/ScheduleSection';
import VirtualSportSection from './elements/VirtualSportSection';

type Props = {
  scheduleCompetitions: ScheduleCompetition[];
  scheduleMatches: ScheduleMatches[];
};

const SportsContainerMobile = ({
  scheduleCompetitions,
  scheduleMatches,
}: Props) => {
  return (
    <div className="pt-6 pb-20 bg-white">
      <div className="x-container mx-auto flex flex-col gap-6">
        <TopSportSection />
        <EsportSection />
        <VirtualSportSection />
        <ScheduleSection
          scheduleCompetitions={scheduleCompetitions}
          initData={scheduleMatches}
        />
      </div>
    </div>
  );
};

export default SportsContainerMobile;
