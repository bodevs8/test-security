import type { ScheduleMatches } from '@/types/schedule';
import { Loading } from '@/components/Loading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import BgTriggerScheduleMb from '@/public/images/sport/bg-trigger-schedule-mb.webp';
import MaintainSport from '@/public/images/sport/maintain-sport.webp';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ScheduleItem from './ScheduleItem';

type Props = {
  scheduleMatches: ScheduleMatches[];
  isLoading: boolean;
};

const ScheduleContent = ({ scheduleMatches, isLoading }: Props) => {
  const t = useTranslations();
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    if (scheduleMatches.length > 0) {
      const newOpenItems = scheduleMatches.map((_, index) => `item-${index}`);
      setOpenItems(newOpenItems);
    }
  }, [scheduleMatches]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="h-[200px] bg-white flex items-center justify-center">
          <Loading className="!z-[101]" />
        </div>
      )}
      <div className="w-full mt-4">
        {!isLoading && scheduleMatches.length > 0 && (
          <Accordion
            type="multiple"
            className="w-full"
            value={openItems}
            onValueChange={setOpenItems}
          >
            {scheduleMatches.map((data, index) => (
              <AccordionItem
                key={`competition-${data.competition_info.id}-match-${index}`}
                value={`item-${index}`}
                className="relative mb-3"
              >
                <AccordionTrigger
                  className="relative text-dark-700 p-2 bg-transparent border-none"
                  ChevronDownIconClassName="size-4"
                >
                  <Image
                    src={BgTriggerScheduleMb}
                    alt="bg trigger schedule mb"
                    width={100}
                    height={100}
                    className="absolute top-0 left-0 w-full h-full"
                  />
                  <div className="flex items-center gap-[6px] z-10">
                    <Image
                      src={data.competition_info.logo}
                      alt={data.competition_info.name}
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px] z-10"
                    />
                    <div className="text-sm font-medium leading-[140%]">
                      {data.competition_info.name}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="w-full p-2 relative z-10 bg-primary-light-50">
                  {data.events.map((event, index) => (
                    <ScheduleItem key={index} event={event} />
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
        {!isLoading && scheduleMatches.length <= 0 && (
          <div className="w-full h-[366px] flex items-center justify-center bg-primary-light-50 rounded-[6px]">
            <div className="flex flex-col gap-4 items-center">
              <Image
                src={MaintainSport}
                alt="maintain-sport"
                width={120}
                height={120}
                className="w-[120px] h-[105px]"
              />
              <span className="text-dark-200 text-sm font-normal leading-[140%]">
                {t('Pages.SportsPage.categories.schedule.update_schedule')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleContent;
