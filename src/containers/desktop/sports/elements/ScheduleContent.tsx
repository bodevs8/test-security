'use client';

import type { ScheduleMatches } from '@/types/schedule';
import { Loading } from '@/components/Loading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import MaintenanceSport from '@/public/images/sport/maintain-sport.webp';
import { useTranslations } from 'next-intl';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ScheduleItem from './ScheduleItem';
import '@/styles/pages/sports/schedule-content.scss';

type Props = {
  scheduleMatches: ScheduleMatches[];
  isLoading: boolean;
};

const ScheduleContent = ({ scheduleMatches, isLoading }: Props) => {
  const t = useTranslations('Pages.SportsPage');

  const defaultOpenItems = scheduleMatches.map((_, index) => `item-${index}`);
  const [openItems, setOpenItems] = useState<string[]>(defaultOpenItems);

  useEffect(() => {
    setOpenItems(scheduleMatches.map((_, index) => `item-${index}`));
  }, [scheduleMatches]);

  return (
    <div className="relative flex-1 min-h-[660px] overflow-x-hidden">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full bottom-0 right-0 flex items-center justify-center bg-neutral-200">
          <Loading className="!z-40" />
        </div>
      )}
      {!isLoading && (
        <div className="rounded-[6px] text-dark-700 w-full overflow-x-auto custom-scrollbar">
          {scheduleMatches.length > 0 && (
            <Accordion
              type="multiple"
              className="w-full"
              defaultValue={defaultOpenItems}
              value={openItems}
              onValueChange={setOpenItems}
            >
              {scheduleMatches.map((data, index) => (
                <AccordionItem
                  key={data.competition_info.id}
                  value={`item-${index}`}
                  className="w-[1020px] mb-6"
                >
                  <AccordionTrigger
                    className="items-center bg-trigger-gradient-schedule py-2 rounded-bl-none rounded-br-none border-b border-neutral-400"
                    ChevronDownIconClassName="size-[13.33px]"
                  >
                    <div className="flex items-center flex-1 gap-3 w-[300px]">
                      <Image
                        src={data.competition_info.logo}
                        alt="test"
                        width={25}
                        height={25}
                        className="size-8 bg-white rounded-full"
                        loading="lazy"
                      />
                      <span className="text-base font-medium leading-[140%] capitalize text-dark-700 whitespace-nowrap">
                        {data.competition_info.name}
                      </span>
                    </div>

                    <div className="flex gap-5 text-sm font-normal leading-[140%] text-dark-200 mr-[218px]">
                      <span className="w-[116px] text-center">
                        {t('categories.schedule.odds_handicap')}
                      </span>
                      <span className="w-[116px] text-center">
                        {t('categories.schedule.odds_over_under')}
                      </span>
                      <span className="w-[116px] text-center">
                        {t('categories.schedule.odds_ft')}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="w-full p-3 rounded-b-lg border border-t-0 border-neutral-400 bg-primary-light-50">
                    {data.events.map((event, index) => (
                      <ScheduleItem key={index} event={event} />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          {scheduleMatches.length <= 0 && (
            <div className="w-full h-[660px] flex items-center justify-center bg-primary-light-50">
              <div className="flex flex-col gap-4 items-center">
                <Image
                  src={MaintenanceSport}
                  alt="maintain-sport"
                  width={120}
                  height={120}
                  className="w-[120px] h-[120px]"
                />
                <span className="text-[14px] font-medium leading-[19.6px] text-dark-200">
                  {t('categories.schedule.update_schedule')}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleContent;
