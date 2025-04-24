import type {
  CasinoLinkEnum,
  CategoryTypeEnum,
  IframeLinkEnum,
  RouterPathEnum,
} from '@/enums';
import type { StaticImageData } from 'next/dist/shared/lib/get-img-props';
import type { TypeGameItem } from './game';

export type HeaderMenuItem = {
  id: string;
  label: string;
  icon: string;
  iconActive: string;
  isHot?: boolean;
  isNew?: boolean;
  to: RouterPathEnum;
};

export type TopMenuItem = {
  key: string;
  href: string;
  title: string;
  icon: StaticImageData;
  backgroundImage: StaticImageData;
  order: number;
  titleClass?: string;
  activeClass?: string;
};

export type FooterMenuChild = {
  name: string;
  url: string;
  isOpenNewTab?: boolean;
};

export type FooterMenuItem = {
  name: string;
  url?: string;
  isDirectUrl?: boolean;
  children: FooterMenuChild[];
};

export type FooterContactItem = {
  id: string;
  title?: string;
  icon: string;
  link?: string;
  newTab: boolean;
};

export type TabType = {
  id: string | number;
  title: string;
  href?: string;
  iconPath?: string | StaticImageData;
  iconPathActive?: string | StaticImageData;
  iconPathActiveMobile?: string | StaticImageData;
  onClick?: (id: string | number) => void;
  tag?: CategoryTypeEnum;
  disabled?: boolean;
};

export type MenuItem = {
  id: string;
  to: string;
  icon: string | StaticImageData;
  iconWhite: string | StaticImageData;
  iconActive: string | StaticImageData;
  iconGateGame?: string | StaticImageData;
  label: string;
  tagType?: CategoryTypeEnum;
  isNewTab?: boolean;
  hidden?: boolean;
  customClass?: string;
  children?: (MenuItem & {
    gameQuery?: TypeGameItem;
  })[];
  isExternal?: boolean;
  onClick?: () => void;
  submenuExtraInfo?: {
    image: string;
    total: string;
  };
  showOnLoggedIn?: boolean;
  activeRoutes?: Array<RouterPathEnum | IframeLinkEnum | CasinoLinkEnum>;
  hiddenOnGateGames?: boolean;
  hiddenOnHeader?: boolean;
};

export type GuidelineMenuItem = {
  id: string;
  title: string;
  isDirectUrl?: boolean;
};

export type GuidelineMenuCategory = {
  id: string;
  title: string;
  items: GuidelineMenuItem[];
};

export type GateGamesMenuItem = {
  href: RouterPathEnum;
  icon: StaticImageData | string;
  alt: string;
  label: string;
  isComing?: boolean;
};
