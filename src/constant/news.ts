import {
  NewsCategoryDisplayEnum,
  NewsCategoryEnum,
  RouterPathEnum,
} from '@/enums';

// Default items per page
export const DESKTOP_ITEMS_PER_PAGE = 12;
export const MOBILE_ITEMS_PER_PAGE = 4;

// Define the categories array
export const CATEGORIES = [
  {
    href: RouterPathEnum.News,
    category: NewsCategoryEnum.News,
    label: NewsCategoryDisplayEnum.News,
    icon: 'icon-news',
    iconActive: '',
  },
  {
    href: RouterPathEnum.Event,
    category: NewsCategoryEnum.Events,
    label: NewsCategoryDisplayEnum.Events,
    icon: 'icon-event',
    iconActive: '',
  },
];
