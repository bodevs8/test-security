import type { ScheduleCompetition, ScheduleMatches } from '@/types/schedule';
import { EsportSection, TopSportSection } from '@/components/SportSection';
import ScheduleSection from './elements/ScheduleSection';
import VirtualSportSection from './elements/VirtualSportSection';

type Props = {
  scheduleCompetitions: ScheduleCompetition[];
  scheduleMatches: ScheduleMatches[];
};

const SportsContainer = ({ scheduleCompetitions, scheduleMatches }: Props) => {
  return (
    <div className="bg-white py-10">
      <div className="x-container mx-auto relative flex flex-col gap-10">
        <div className="flex flex-col xspc:flex-row gap-6 justify-between">
          <TopSportSection />
          <EsportSection />
        </div>
        <VirtualSportSection />
        <ScheduleSection
          scheduleCompetitions={scheduleCompetitions}
          initData={scheduleMatches}
        />
      </div>
    </div>
  );
};

export default SportsContainer;
