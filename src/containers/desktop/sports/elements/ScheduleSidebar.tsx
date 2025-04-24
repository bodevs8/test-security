import type { ScheduleCompetition } from '@/types/schedule';
import { ScheduleFilterEnum } from '@/enums/schedule';
import ActiveScheduleSidebar from '@/public/images/sport/bg-active-schedule-sidebar.webp';
import clsx from 'clsx';
import Image from 'next/image';
import { useMemo, useState } from 'react';

const MENU_ITEM_HEIGHT = 60;

type Props = {
  scheduleCompetitions: ScheduleCompetition[];
  onClick: (competitionId: string) => void;
};

const ScheduleSidebar = ({ scheduleCompetitions, onClick }: Props) => {
  const [activeId, setActiveId] = useState<string>(ScheduleFilterEnum.All);
  const [_hoveredId, setHoveredId] = useState<string | null>(null);

  const handleClick = (competitionId: string) => {
    setActiveId(competitionId);
    onClick(competitionId);
  };

  const positionY = useMemo(() => {
    const activeIndex = scheduleCompetitions.findIndex(
      (item) => item.id === activeId,
    );

    return activeIndex >= 0 ? activeIndex * MENU_ITEM_HEIGHT : 0;
  }, [activeId, scheduleCompetitions]);

  return (
    <div className="bg-primary-light-50 flex flex-col relative z-20 max-h-[660px] min-w-[252px] w-[252px] rounded-[6px] overflow-hidden">
      <div
        className="absolute left-0 w-full h-[60px] active transition-transform duration-500"
        style={{ transform: `translateY(${positionY}px)` }}
      >
        <Image
          src={ActiveScheduleSidebar}
          alt="cup"
          width={252}
          height={60}
          className="w-full h-full object-cover"
        />
      </div>
      {scheduleCompetitions.map((competition) => (
        <div
          key={competition.id}
          className={clsx(
            'flex items-center gap-4 py-4 px-6 cursor-pointer transition-all duration-300 relative z-20 h-[60px]',
            {
              'text-white': activeId === competition.id,
            },
          )}
          onClick={() => handleClick(competition.id)}
          onMouseEnter={() => setHoveredId(competition.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Image
            src={competition.logo}
            alt="cup"
            width={24}
            height={24}
            className={clsx('rounded-full size-6 !object-contain', {
              'bg-black': competition.id === ScheduleFilterEnum.All,
              'bg-white': competition.id !== ScheduleFilterEnum.All,
            })}
          />
          <span
            className={clsx(
              'capitalize text-base font-normal leading-[140%] transition-colors duration-300 line-clamp-1',
              {
                'text-white': activeId === competition.id,
                'text-dark-700': activeId !== competition.id,
              },
            )}
          >
            {competition.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ScheduleSidebar;
