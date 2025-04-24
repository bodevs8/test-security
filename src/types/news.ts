import type { NewsCategoryEnum } from '@/enums';

export type GetPostsParams = {
  limit: number;
  page: number;
  category: NewsCategoryEnum;
};

export type NewsItemType = {
  alias: string;
  thumbnail: string;
  title: string;
  description: string;
  content: string;
  title_mobile: string;
  description_mobile: string;
  content_mobile: string;
  meta_keywords: string;
  meta_description: string;
  lang: string;
  category_ids: number[];
  tags: string[];
  is_featured: boolean;
  views: number;
  type: string;
  status: string;
  branch: string;
  id: number;
  created_time: string;
  last_updated_time: string;
  img_banner: string;
  className?: string;
  thumbnailClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
  formatDateClassName?: string;
  titleClassName?: string;
  priority?: boolean;
};

export type ShareData = {
  title: string;
  thumbnail: string;
  description: string;
  url: string;
};

export type SocialShareProps = {
  shareData: ShareData;
  className?: string;
};

export type SocialNetwork = {
  shareUrl: string;
  title: string;
  iconImg: string;
};

export type NewsPaginationProps = {
  totalPages: number;
  currentPage: number;
  category: NewsCategoryEnum;
};

export type NewsLayoutProps = {
  breadcrumbItems: Array<{
    label: string;
    href: string;
  }>;
  newsData: NewsItemType[];
  hotNewsData: NewsItemType[];
  currentPage: number;
  category: NewsCategoryEnum;
  totalPages: number;
};
