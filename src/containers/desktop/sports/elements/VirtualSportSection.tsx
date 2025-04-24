'use client';

import type { SportItem } from '@/types/sport';
import { BaseSection } from '@/components/BaseSection';
import { Button } from '@/components/ui/button';
import { VIRTUAL_SPORTS } from '@/constant/sport';
import { ModalIdEnum } from '@/enums';
import { VirtualSportId } from '@/enums/sport';
import { useModalStore, useUserStore } from '@/hooks/stores';
import CupImage from '@/public/images/sport/cup.webp';
import { handleClickBannerSport } from '@/utils/sport';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const VirtualSportSection = () => {
  const { user } = useUserStore((state) => state);
  const modalStore = useModalStore((state) => state);
  const router = useRouter();

  const t = useTranslations('Pages.SportsPage');

  const handleClickVirtualSport = (e: React.MouseEvent, item: SportItem) => {
    e.preventDefault();
    if (item?.requireLogin && !user) {
      modalStore.openModal(ModalIdEnum.Login);
      return;
    }

    handleClickBannerSport(user, item, modalStore, router, false);
  };

  return (
    <div>
      <BaseSection title={t('virtual_sports')} iconName="horse" />
      <div className="grid grid-cols-2 lg:flex lg:justify-between lg:flex-wrap gap-3 relative mt-5">
        {VIRTUAL_SPORTS.map((item: SportItem) => (
          <Link
            href="#"
            key={item.id}
            className="relative max-w-[459px] max-h-[203px] overflow-hidden group"
            onClick={(e) => handleClickVirtualSport(e, item)}
          >
            <Image
              src={item.img}
              alt={`${item.title} virtual sport game`}
              width={459}
              height={203}
              className="lg:max-w-[459px] lg:max-h-[203px] w-full h-full"
            />
            <div
              className={clsx('absolute bottom-0 z-10', {
                'right-5':
                  item.id === VirtualSportId.Saba ||
                  item.id === VirtualSportId.Ksport,
                'left-5':
                  item.id === VirtualSportId.Inplay ||
                  item.id === VirtualSportId.Pragmatic,
              })}
            >
              <Image
                src={item.model ?? ''}
                alt={`${item.title} game model`}
                width={278}
                height={203}
                className="max-w-[230px] max-h-auto lg:max-w-[278px] lg:max-h-[203px] w-full h-full"
              />
            </div>
            <div
              className={clsx(
                'absolute bottom-0 group-hover:scale-150 transition-all duration-300',
                {
                  'left-0 group-hover:h-[100px]':
                    item.id === VirtualSportId.Saba ||
                    item.id === VirtualSportId.Ksport,
                  'right-0 group-hover:h-[100px]':
                    item.id === VirtualSportId.Inplay ||
                    item.id === VirtualSportId.Pragmatic,
                },
              )}
            >
              <Image
                src={item.shape ?? ''}
                alt={`${item.title} shape decoration`}
                width={278}
                height={203}
                className="w-full h-full"
              />
            </div>
            <div
              className={clsx(
                'absolute bottom-0 py-3 px-4 flex flex-col gap-1 z-10 max-w-[214px] w-full',
                {
                  'left-0 text-left':
                    item.id === VirtualSportId.Saba ||
                    item.id === VirtualSportId.Ksport,
                  'right-0 text-right':
                    item.id === VirtualSportId.Inplay ||
                    item.id === VirtualSportId.Pragmatic,
                },
              )}
            >
              <div className="text-white text-xl font-extrabold uppercase leading-[140%] italic">
                {item.title}
              </div>
              <div className="text-sm font-normal leading-[140%] text-white opacity-70">
                {item.content}
              </div>
              <div
                className={clsx(
                  'h-0 overflow-hidden transition-all duration-300 group-hover:h-[50px] group-hover:w-full flex',
                  {
                    'justify-start':
                      item.id === VirtualSportId.Saba ||
                      item.id === VirtualSportId.Ksport,
                    'justify-end':
                      item.id === VirtualSportId.Inplay ||
                      item.id === VirtualSportId.Pragmatic,
                  },
                )}
              >
                <Button
                  id={`button-virtual-sport-${item.id}`}
                  name={item.title}
                  className="mt-2 text-white font-bold"
                >
                  {t('button_play')}
                </Button>
              </div>
            </div>
          </Link>
        ))}
        <div className="absolute w-full bottom-0 flex items-center justify-center">
          <Image
            src={CupImage}
            alt="Trophy decoration"
            width={314}
            height={428}
            className="hidden xspc:block xspc:w-[314px] xspc:h-[428px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default VirtualSportSection;
