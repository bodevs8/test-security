import type { VirtualSportId } from '@/enums/sport';
import type { StaticImageData } from 'next/image';

export type SportItem = {
  id: string | VirtualSportId;
  href: string;
  img: StaticImageData | string;
  imgMb: StaticImageData | string;
  title: string;
  content?: string;
  shape?: StaticImageData | string;
  model?: StaticImageData | string;
  requireLogin?: boolean;
};
