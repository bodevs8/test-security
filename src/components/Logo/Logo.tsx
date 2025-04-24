import type { StaticImageData } from 'next/image';
import { LogoSizeEnum, RouterPathEnum } from '@/enums';
import LogoSrc from '@/public/logo.svg';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  size?: LogoSizeEnum;
  logoClassName?: string;
  priority?: boolean;
  logoSrc?: string | StaticImageData;
  linkClassName?: string;
};

const sizeMap = {
  [LogoSizeEnum.XSmall]: { width: 106, height: 20 },
  [LogoSizeEnum.Small]: { width: 136, height: 26 },
  [LogoSizeEnum.Regular]: { width: 158, height: 48 },
  [LogoSizeEnum.Medium]: { width: 122, height: 36 },
  [LogoSizeEnum.Large]: { width: 267, height: 81 },
};

export const Logo = ({
  size = LogoSizeEnum.Medium,
  logoClassName,
  priority = true,
  logoSrc,
  linkClassName,
}: LogoProps) => {
  const { width, height } = sizeMap[size];

  return (
    <Link
      prefetch={false}
      className={clsx('flex items-center', linkClassName)}
      href={RouterPathEnum.Home}
    >
      <Image
        className={clsx('block object-contain', logoClassName)}
        src={logoSrc || LogoSrc}
        width={width}
        height={height}
        alt="Logo"
        priority={priority}
      />
    </Link>
  );
};
