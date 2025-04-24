import type {
  AccountLinkEnum,
  BottomMenuIdEnum,
  BottomMenuTypeEnum,
  CategoryTypeEnum,
  DepositLinkEnum,
  TextAlignEnum,
  WithdrawLinkEnum,
} from '@/enums';
import type { StaticImageData } from 'next/image';
import type { UserData } from './auth';
import type { IndexDepositType } from './deposit';

export type HeroBannerItem = {
  id: number;
  image: string | StaticImageData;
  imageMb: string | StaticImageData;
  imageTablet: string | StaticImageData;
  backgroundImage?: string | StaticImageData;
  backgroundImageMobile?: string | StaticImageData;
  title: string;
  subTitle: string;
  upto_desc?: string;
  content: string;
  href: string;
};

export type AccountMenuItem = {
  id: AccountLinkEnum;
  label: string;
  url: AccountLinkEnum;
  icon: string | StaticImageData;
  iconActive?: string | StaticImageData;
  iconActiveMobile?: string | StaticImageData;
  iconHover?: string | StaticImageData;
  tag?: CategoryTypeEnum;
};

export type OptionType = {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  icon?: string;
  iconImage?: string;
  iconActiveImage?: string;
};

export type TypeTextAlign = 'left' | 'right' | 'center';

export type ColumnTable = {
  id: string;
  title: string;
  renderCell?: (row: any, column: ColumnTable, colIndex: number) => any;
  renderHeader?: () => React.ReactNode;
  textAlign?: TextAlignEnum | undefined;
  isCurrency?: boolean;
  theadClassName?: string;
  tdClassName?: string;
};

export type BaseTableProps = {
  columns: ColumnTable[];
  data: any[];
  totalPages: number;
  currentPage: number;
  className?: string;
  paginationClassName?: string;
  iconEmpty?: StaticImageData | string;
  emptyClassName?: string;
  titleEmpty?: string;
  tableClassName?: string;
  theadClassName?: string;
  tdClassName?: string;
  containerClassName?: string;
  onPageChange?: (page: number) => void;
  isVertical?: boolean;
};

export type DepositMenuItem = {
  id: string;
  label: string;
  url: DepositLinkEnum | WithdrawLinkEnum;
  tag?: CategoryTypeEnum;
  icon: string | StaticImageData;
  iconMaintain: string | StaticImageData;
};

export type AccountContainerType = {
  indexDeposit: IndexDepositType | null;
  children: React.ReactNode;
};

export type DeviceInfo = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isOldPhone: boolean;
  isSafari: boolean;
  isIpad: boolean;
  os: string;
  browser: string;
  deviceType: string;
  userAgentStr: string;
};

export type LotteryResultParam = {
  city: number;
  date: string;
};

export type LotteryResult = {
  result: {
    [key: string]: string;
  };
};

export type RadioOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type ImageMapping = Record<string, StaticImageData | string>;

export type MiniGameProps = {
  user?: UserData;
  isMobile?: boolean;
};

export type BottomMenuType = {
  id: BottomMenuIdEnum;
  label: string;
  icon: StaticImageData;
  iconActive?: StaticImageData;
  href?: string;
  type: BottomMenuTypeEnum;
  requireLogin?: boolean;
  activePaths?: string[];
  activeWithUrl?: string[];
  onClick: () => void;
  hideOnLogin?: boolean;
  hideOnLogout?: boolean;
};
