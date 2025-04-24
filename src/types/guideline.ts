import type { SectionItemTypeEnum } from '@/enums';
import type { StaticImageData } from 'next/image';

// Define content types
export type ContentItem = string;
export type ArrayContentItem = string[];
export type ImageItem = {
  url: string | StaticImageData;
  caption?: string;
};

// Define section with discriminated union
export type SectionItem =
  | {
      type: SectionItemTypeEnum.CONTENT;
      key: string;
      value: string;
      className?: string;
    }
  | { type: SectionItemTypeEnum.STEP; key: string; value: string }
  | { type: SectionItemTypeEnum.IMAGE; key: string; value: ImageItem }
  | { type: SectionItemTypeEnum.LIST; key: string; value: string[] }
  | { type: SectionItemTypeEnum.LINK; key: string; value: string }
  | {
      type: SectionItemTypeEnum.NOTELIST;
      key: string;
      title?: string;
      value: string[];
    };

export type GuidelineSection = {
  title?: string;
  sub_title?: string;
  items: SectionItem[];
};

export type GuidelineContent = {
  key: string;
  'category-title': string;
  'page-title': string;
  section?: GuidelineSection;
  section1?: GuidelineSection;
  section2?: GuidelineSection;
  section3?: GuidelineSection;
  section4?: GuidelineSection;
  section5?: GuidelineSection;
  section6?: GuidelineSection;
  section7?: GuidelineSection;
  section8?: GuidelineSection;
  section9?: GuidelineSection;
  section10?: GuidelineSection;
  section11?: GuidelineSection;
  section12?: GuidelineSection;
  section13?: GuidelineSection;
  section14?: GuidelineSection;
  section15?: GuidelineSection;
};
