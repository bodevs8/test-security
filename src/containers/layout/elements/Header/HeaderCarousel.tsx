'use client';

import type { StaticImageData } from 'next/image';
import { AnimateNumber } from '@/components/AnimateNumber';
import { EmblaCarousel } from '@/components/EmblaCarousel';
import { HERO_BANNER } from '@/constant/app';
import { RouterPathEnum } from '@/enums';
import { useJackpot } from '@/hooks/jackpot/use-jackpot';
import JackPot from '@/public/images/header/banner/bg-jackpot.webp';
import Coin from '@/public/images/header/banner/coin.webp';

import HeroBannerMb from '@/public/images/header/banner/hero-banner-mb.webp';
import HeroBanner from '@/public/images/header/banner/hero-banner.webp';
import HighlightLeft from '@/public/images/header/hight-light-left.webp';
import Highlight from '@/public/images/header/hight-light.webp';
import clsx from 'clsx';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import '@/styles/pages/home/banner.scss';

type HeaderCarouselProps = {
  isMobile?: boolean;
};

export const HeaderCarousel = (_props: HeaderCarouselProps) => {
  const pathname = usePathname();
  const { totalJackpot } = useJackpot();

  const isHideHeaderCarousel = useMemo(() => {
    return pathname !== RouterPathEnum.Home;
  }, [pathname]);

  if (isHideHeaderCarousel) return null;

  return (
    <div className="w-full lg:pt-5">
      <div className="x-container">
        <div className="relative w-full !p-0 block lg:flex items-center gap-5">
          <div
            className={clsx(
              'relative h-auto lg:min-h-[250px] w-full lg:w-[calc(100%-320px)] xspc:min-h-[unset] header-embla-banner',
            )}
          >
            <div className="relative z-1 w-full h-full">
              <EmblaCarousel
                id="header-carousel"
                className="h-full"
                plugins={[
                  Autoplay({
                    delay: 10000,
                  }),
                ]}
                pagination={{
                  className:
                    'pagination-banner absolute bottom-2.5 md:bottom-[40px] left-[23px] md:left-[58.5px] z-3 !mt-0',
                  dotClassName:
                    'h-[3px] md:!h-2.5 !w-2 md:!w-[18px] header-embla-dot bg-opacity-50',
                  selectedDotClassName: '!w-5 md:!w-[46px] !bg-primary-light-0',
                }}
                slideClassName="group/hero-banner pl-2"
                containerClassName="-ml-2"
              >
                {HERO_BANNER.map((item, index) => (
                  <div
                    className="relative x-container  !p-0 xspc:min-h-[unset] "
                    key={item.id}
                  >
                    <div className="banner-content absolute left-[23px] md:left-[58px] bottom-[28px] md:bottom-[65px]">
                      <div
                        className={clsx(
                          'text-[10px] sm:text-sm md:text-2xl text-primary-light-0 items-center leading-[140%] flex w-full justify-start font-medium italic ml-3 md:ml-7',
                          'opacity-0 translate-x-[100px] transition-all duration-500 delay-500',
                          'group-[.embla-slide-active]/hero-banner:opacity-100 group-[.embla-slide-active]/hero-banner:translate-x-0',
                        )}
                      >
                        <div className="relative w-max ">
                          <p
                            className={clsx(
                              'z-[5] relative pr-10 pt-0.5',
                              'opacity-0 translate-x-[100px] transition-all duration-500 delay-700',
                              'group-[.embla-slide-active]/hero-banner:opacity-100 group-[.embla-slide-active]/hero-banner:translate-x-0',
                            )}
                          >
                            {item!.title}
                          </p>
                          <Image
                            alt="highlight"
                            src={Highlight}
                            width={0}
                            height={44}
                            className="w-full h-full !object-fill absolute top-0 left-0 right-0 bottom-0 z-[4]"
                            priority={index === 0}
                            fetchPriority={index === 0 ? 'high' : 'low'}
                            loading={index === 0 ? 'eager' : 'lazy'}
                          />
                        </div>
                      </div>
                      <div
                        className={clsx(
                          'relative leader py-[2.5px] md:py-[7px]',
                          'opacity-0 translate-x-[100px] transition-all duration-500 delay-900',
                          'group-[.embla-slide-active]/hero-banner:opacity-100 group-[.embla-slide-active]/hero-banner:translate-x-0',
                        )}
                      >
                        <p
                          className={clsx(
                            'text-sm sm:text-xl md:text-4xl pl-2.5 md:pl-[25px] md:mt-2 z-[5] relative text-primary-light-0 md:text-right font-black md:leading-[140%] text-neutral italic uppercase whitespace-pre-wrap',
                          )}
                        >
                          {item!.subTitle}
                        </p>
                        <Image
                          alt="highlight left"
                          src={HighlightLeft}
                          width={0}
                          height={44}
                          className="w-full h-full !object-fill absolute top-0 left-0 right-0  bottom-0"
                          priority={index === 0}
                          fetchPriority={index === 0 ? 'high' : 'low'}
                          loading={index === 0 ? 'eager' : 'lazy'}
                        />
                      </div>
                      <div
                        key={`${item!.id}-content`}
                        className={clsx(
                          ' w-max z-[5] relative',
                          'opacity-0 translate-x-[100px] transition-all duration-500 delay-1100',
                          'group-[.embla-slide-active]/hero-banner:opacity-100 group-[.embla-slide-active]/hero-banner:translate-x-0',
                        )}
                      >
                        <p className="text-[18px] sm:text-2xl md:text-5xl italic font-extrabold text-neutral text-right leading-[140%] header-banner-text">
                          {item!.content}
                        </p>
                      </div>
                    </div>
                    <picture className="banner-background">
                      <source
                        media="(max-width: 640px)"
                        srcSet={(item.imageMb as StaticImageData).src}
                      />
                      <source
                        media="(max-width: 1023.5px)"
                        srcSet={(item.imageTablet as StaticImageData).src}
                      />
                      <source
                        media="(min-width: 1024px)"
                        srcSet={(item.image as StaticImageData).src}
                      />
                      <Image
                        src={item.image as StaticImageData}
                        className=" min-h-[131px] md:min-h-[328px] aspect-[450/131] h-full w-full md:aspect-[450/150] lg:aspect-[1920/376] object-cover lg:rounded-md"
                        alt={item.title}
                        fetchPriority={index === 0 ? 'high' : 'low'}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        width={450}
                        height={376}
                        priority={index === 0}
                      />
                    </picture>
                  </div>
                ))}
              </EmblaCarousel>
            </div>
          </div>
          <div className="header-jackpot relative w-[300px]">
            <div className="m-3 sm:m-4 lg:m-0">
              <picture className="min-h-[82px]">
                <source
                  media="(max-width: 1023.5px)"
                  srcSet={HeroBannerMb.src}
                />
                <source media="(min-width: 1024px)" srcSet={HeroBanner.src} />
                <Image
                  src={HeroBanner.src}
                  alt="hero baner"
                  width={300}
                  height={328}
                  priority
                  className="w-full h-full rounded-md lg:rounded-[8px] lg:aspect-[300/328]"
                />
              </picture>
            </div>
            <div className="absolute bottom-1/2 lg:bottom-[74px] right-[5px] mb:right-0 lg:left-1/2 -custom-translate-x-1/2">
              <p className="hero-banner-text text-center leading-[140%] w-max pr-2 lg:pr-0 font-extrabold uppercase text-[18px] md:text-[28px] italic">
                Nổ hủ lớn
              </p>
            </div>
            <div className="lobby-banner__jackpot bottom-1/3 translate-y-1/2 lg:translate-0 lg:bottom-[25px] absolute left-0 right-[44px] lg:right-0 flex items-center justify-end lg:justify-center">
              <div className="relative">
                <Image
                  src={JackPot}
                  alt="jackpot"
                  width="100"
                  height="100"
                  className="w-auto h-auto min-w-[151px] max-w-[151px] min-h-[27px] max-h-[35px] md:min-w-[234px] md:min-h-[44px] md:max-h-[50px]"
                />
                <div
                  className={clsx(
                    'flex absolute top-1/2 left-1/2 -custom-translate-center w-full justify-center items-center gap-1.5',
                    {
                      hidden: !totalJackpot,
                    },
                  )}
                >
                  <Image
                    width={20}
                    height={20}
                    alt="coin"
                    src={Coin}
                    className="md:size-5 lg:size-[18px] !object-contain"
                    loading="lazy"
                  />
                  <AnimateNumber
                    className="whitespace-nowrap text-gradient font-bold text-xs md:text-base"
                    to={totalJackpot || 0}
                    unit=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
