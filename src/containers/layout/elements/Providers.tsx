'use client';

import { EmblaCarousel } from '@/components/EmblaCarousel';
import { PROVIDERS_FILL_IMAGE } from '@/constant/images/provider';
import { GameProviderEnum } from '@/enums';
import clsx from 'clsx';
import AutoScroll from 'embla-carousel-auto-scroll';
import Image from 'next/image';
import Link from 'next/link';

type ProviderLink = {
  [key: string]: string | undefined;
};

export const Providers = () => {
  const PROVIDERS = Object.values(GameProviderEnum);

  const providerLink: ProviderLink = {
    go88: process.env.NEXT_PUBLIC_LINK_GO88,
  };

  return (
    <div className="x-container mx-auto">
      <div className="py-[14px] px-0 sm:px-[13px] lg:px-0 lg:py-4 2xl:pt-[40px] 2xl:pb-[60px] w-full">
        <EmblaCarousel
          id="bank-carousel"
          loop={true}
          dragFree={true}
          navigation={undefined}
          pagination={undefined}
          containerClassName=""
          contentClassName="gap-4 flex"
          plugins={[
            AutoScroll({
              speed: 1,
              stopOnInteraction: false,
            }),
          ]}
        >
          {PROVIDERS.map((provider, index) => (
            <Link
              key={index}
              prefetch={false}
              href={providerLink[provider as keyof ProviderLink] ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                'flex justify-center h-[68px] w-[129px] px-3 rounded-lg items-center border border-primary-light-400',
                {
                  '!cursor-default': provider !== GameProviderEnum.Go88,
                  '!cursor-pointer': provider === GameProviderEnum.Go88,
                },
              )}
              onClick={(e) => {
                if (!providerLink[provider as keyof ProviderLink]) {
                  e.preventDefault();
                }
              }}
            >
              <Image
                src={PROVIDERS_FILL_IMAGE[provider as GameProviderEnum]!}
                alt={provider}
                width="0"
                height="0"
                sizes="100vw"
                className="h-[32px] w-full !object-contain"
                loading="lazy"
              />
            </Link>
          ))}
        </EmblaCarousel>
      </div>
    </div>
  );
};
