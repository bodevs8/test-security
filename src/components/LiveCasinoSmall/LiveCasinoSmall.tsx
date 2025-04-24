import type { LiveCasinoSmallThumb } from '@/types/game';
import type { StaticImageData } from 'next/image';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

const LiveCasinoSmall = (props: LiveCasinoSmallThumb) => {
  const { img, imgMb, provider } = props;

  return (
    <Link
      href={props.href}
      className="relative overflow-hidden cursor-pointer group rounded-[6px] md:rounded-[8px]"
    >
      <picture>
        <source
          media="(max-width: 767.5px)"
          srcSet={(imgMb as StaticImageData)!.src}
        />
        <source
          media="(min-width: 768px)"
          srcSet={(img as StaticImageData)!.src}
        />
        <img
          src={(img as StaticImageData)!.src}
          className={clsx(
            'w-full h-full object-cover rounded-[6px] md:rounded-[8px]',
            'group-hover:scale-105 group-hover:brightness-105 transition-all duration-300',
          )}
          alt={provider}
        />
      </picture>
      <div
        className={clsx(
          'absolute bottom-2 w-full flex justify-center items-center',
          'group-hover:bottom-2.5 transition-all duration-300',
        )}
      >
        <Image
          src={`/icons/provider/${provider}.svg`}
          alt={provider}
          width={100}
          height={42}
          className="md:h-[42px] w-auto"
          loading="lazy"
          fetchPriority="low"
        />
      </div>
    </Link>
  );
};

export default LiveCasinoSmall;
