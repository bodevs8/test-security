'use client';

import type { SportItem } from '@/types/sport';
import { BaseSection } from '@/components/BaseSection';
import { VIRTUAL_SPORTS } from '@/constant/sport';
import { ModalIdEnum } from '@/enums';
import { useGameContext } from '@/hooks/contexts';
import { useModalStore, useUserStore } from '@/hooks/stores';
import BgShapeImage from '@/public/images/sport/bg-shape-virtual.webp';
import { handleClickBannerSport } from '@/utils/sport';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const VirtualSportSection = () => {
  const t = useTranslations('Pages.SportsPage');
  const { openIframeGame } = useGameContext();
  const { user } = useUserStore((state) => state);
  const modalStore = useModalStore((state) => state);

  const handleClickVirtualSport = (e: React.MouseEvent, item: SportItem) => {
    e.preventDefault();
    if (item?.requireLogin && !user) {
      modalStore.openModal(ModalIdEnum.Login);
      return;
    }

    handleClickBannerSport(user, item, modalStore, null, true, openIframeGame);
  };

  return (
    <div>
      <BaseSection title={t('virtual_sports')} iconName="horse" />
      <div className="mt-3 grid grid-cols-2 gap-3">
        {VIRTUAL_SPORTS.map((item: SportItem) => (
          <Link
            key={item.id}
            href="#"
            className="relative"
            onClick={(e) => handleClickVirtualSport(e, item)}
          >
            <Image
              src={item.imgMb}
              alt={item.title}
              width={230}
              height={400}
              className="w-full h-full"
            />
            <div className="absolute left-0 bottom-0">
              <Image
                src={BgShapeImage}
                alt={`${item.title} shape`}
                width={230}
                height={400}
                className="w-[134px] h-[48px]"
              />
            </div>
            <div className="absolute left-0 bottom-0 py-[7px] px-3 flex flex-col">
              <div className="text-white text-sm font-bold uppercase leading-[140%] italic">
                {item.title}
              </div>
              <div className="text-white text-[10px] font-normal leading-[140%]">
                {item.content}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VirtualSportSection;
