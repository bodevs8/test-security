import type { NewsItemType } from '@/types/news';
import { BaseEmpty } from '@/components/BaseEmpty';
import { CategoryTab } from '@/components/News';
import { NewsItem } from '@/components/News/NewsItem';
import { NewsPagination } from '@/components/Pagination/NewsPagination';
import { NewsCategoryEnum } from '@/enums';
import { useTranslations } from 'next-intl';

type NewsListProps = {
  newsData: NewsItemType[];
  currentPage: number;
  category?: string;
  baseUrl?: string;
  totalPages: number;
  isMobile: boolean;
  categories: {
    href: string;
    category: NewsCategoryEnum;
    label: string;
    icon: string;
    iconActive: string;
  }[];
};

export const NewsList = ({
  newsData,
  currentPage,
  category = NewsCategoryEnum.News,
  totalPages,
  isMobile,
  categories,
}: NewsListProps) => {
  const t = useTranslations('Pages.NewsPage');
  return (
    <div className="space-y-6">
      {!isMobile && (
        <div className="flex items-center gap-4 mb-6">
          {categories.map((item) => (
            <CategoryTab
              key={item.href}
              href={item.href}
              isActive={item.category === category}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </div>
      )}

      {/* Regular News Grid */}
      {newsData.length !== 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {newsData.map((item) => (
            <NewsItem key={item.id} {...item} />
          ))}
        </div>
      )}

      {newsData.length === 0 && (
        <BaseEmpty
          iconEmpty="default"
          titleEmpty={t('empty')}
          emptyClassName="h-fit lg:h-full py-10 lg:py-25"
          imageSize={120}
        />
      )}
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center">
          <NewsPagination
            totalPages={totalPages}
            currentPage={currentPage}
            category={category as NewsCategoryEnum}
          />
        </div>
      )}
    </div>
  );
};
