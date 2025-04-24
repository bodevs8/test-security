import type { DepositLinkEnum, PromotionPackageEnum, PromotionSectionItemTypeEnum, PromotionSlugEnum, PromotionTagEnum, PromotionTextButtonEnum } from '@/enums';

export type PromotionDetailType = {
  id: PromotionPackageEnum;
  slug: PromotionSlugEnum;
  title: string;
  titleMb?: string;
  subtitle: string;
  linkButton: DepositLinkEnum;
  bannerImage: string;
  bannerImageMb: string;
  content: {
    sections: Array<{
      type: PromotionSectionItemTypeEnum;
      title?: string;
      className?: string;
      data?: {
        tableHead: string[];
        tableBody: string[];
      };
      content?: string | string[];
      subContent?: string;
      key?: string;
      items?: Array<{
        type: PromotionSectionItemTypeEnum;
        content?: string | string[];
        subContent?: string;
        className?: string;
        title?: string;
        key?: string;
        data?: {
          tableHead: string[];
          tableBody: string[];
        };
      }>;
    }>;
  };
};

export type PromotionType = {
  id: PromotionPackageEnum;
  slug: PromotionSlugEnum;
  title: string;
  titleMb?: string;
  subtitle: string;
  textButton: PromotionTextButtonEnum;
  linkButton: DepositLinkEnum;
  bannerImage: string;
  bannerImageMb: string;
};

export type PromotionPackageType = {
  id: number;
  name: string;
  titleKey: string;
  titleMbKey: string;
  img: string;
  imgMb: string;
  upto: string;
  slug: string;
};

export type PromotionConfig = {
  buttonText: PromotionTextButtonEnum;
  currentTag: PromotionTagEnum;
  isDisabledButton: boolean;
};

export type BreadcrumbItemType = {
  label?: string;
  labelKey?: string;
  href: string;
};

