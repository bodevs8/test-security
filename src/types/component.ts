import type { CarouselNavigationPositionEnum } from '@/enums';
import type { StaticImageData } from 'next/image';

export type BankOption = {
  value: string;
  label: string;
  provider?: string;
  isMaintain?: boolean;
  account_name?: string;
  account_number?: string;
  bank_status?: number;
  bank_txt?: string;
  is_disable?: boolean;
};

export type TransactionTabItem = {
  label: string;
  value: string;
  icon?: string | StaticImageData;
  iconImage?: string | StaticImageData;
  iconMaintain?: string | StaticImageData;
  iconHover?: string | StaticImageData;
  iconActive?: string | StaticImageData;
  customClass?: string;
  isMaintain?: boolean;
};

export type NavigationProps = {
  classNamePrev?: string;
  classNameNext?: string;
  className?: string;
  iconClassName?: string;
  position?: CarouselNavigationPositionEnum;
  hiddenNavigation?: boolean;
};

export type PaginationProps = {
  dynamicBullets?: boolean;
  className?: string;
  selectedDotClassName?: string;
  dotClassName?: string;
};

export type SectionTitleProps = {
  title: string;
  titleClassName?: string;
  iconName?: string;
  iconClassName?: string;
  hasShadow?: boolean;
  loadMoreHref?: string;
  className?: string;
  iconData?: StaticImageData;
};
