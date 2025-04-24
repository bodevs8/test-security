import type { HotMatchType } from '@/types/game';
import { BaseSection } from '@/components/BaseSection';
import { SportHotMatchSwiper } from '@/components/SportHotMatchSwiper';
import { SPORT_GAMES_HOME } from '@/constant/sport';
import { RouterPathEnum } from '@/enums';
import HotMatchIcon from '@/public/images/sport/hot-match-icon.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  hotMatches: HotMatchType[];
  isMobile?: boolean;
};

const HotMatchSection = ({ hotMatches, isMobile }: Props) => {
  const hasHotMatches = hotMatches.length > 0;
  const t = useTranslations();

  return (
    <div className="mt-[60px]">
      <BaseSection
        title={t('Pages.SportsPage.explosive_sports')}
        iconName="captions"
        loadMoreHref={RouterPathEnum.Sports}
      />
      <div className="mt-5">
        {hasHotMatches && (
          <SportHotMatchSwiper
            hotMatches={hotMatches}
            slidesPerView="auto"
            loop
            className="pl-3 md:pl-0 md:overflow-hidden"
            containerClassName="-ml-2 lg:-ml-4"
            slideClassName="pl-2 lg:pl-4"
            isMobile={isMobile}
          />
        )}

        {!hasHotMatches && (
          <div className="bg-empty p-2 rounded-[12px] w-full h-full flex items-center justify-center">
            <div>
              <Image
                src={HotMatchIcon}
                alt="hot match icon"
                width={120}
                height={120}
                loading="lazy"
                className="object-cover"
              />
              <div className="text-neutral-200 text-[14px] font-medium leading-[21px] mt-4">
                {t('Common.empty.match')}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-5 gap-5">
        {SPORT_GAMES_HOME.map((item) => (
          <Link
            href={item.href}
            className="w-full h-full relative group overflow-hidden hover:scale-[1.02] transition-all duration-300"
            key={item.id}
            prefetch={false}
          >
            <Image
              src={item.img}
              alt={`${item.title} image`}
              width={638}
              height={216}
              className="w-full h-full group-hover:brightness-105 transition-all duration-300"
              loading="lazy"
            />
            <div className="absolute left-0 top-0 w-full h-full px-[3.54vw] py-[1.7vw] z-10">
              <Image
                src={item.logo}
                alt={`${item.title} logo`}
                width={70}
                height={70}
                className="size-[50px] xl:size-[70px] object-cover"
              />
              <div className="text-[24px] xl:text-[32px] font-extrabold italic leading-[140%] text-dark-700 mt-1">
                {item.title}
              </div>
              <div className="w-[57px] h-[1px] bg-primary-light-500 my-1" />
              <div className="text-base font-normal leading-[140%] text-dark-200 capitalize">
                {item.content}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HotMatchSection;
