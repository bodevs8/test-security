import {
  NewsCategoryDisplayEnum,
  NewsCategoryEnum,
  RouterPathEnum,
} from '@/enums';
import { fetchNewsData } from '@/utils/news';
import { NewsLayout } from './NewsLayout';

export const revalidate = 60;
export const dynamic = 'auto';

type Props = {
  searchParams: Promise<{ page?: string }>;
};

/**
 * News page component
 */
async function NewsPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const category = NewsCategoryEnum.News;
  const { newsData, hotNewsData, totalPages } = await fetchNewsData(
    currentPage,
    category,
  );
  // Breadcrumb items
  const breadcrumbItems = [
    {
      label: 'Trang chủ',
      href: RouterPathEnum.Home,
    },
    {
      label: NewsCategoryDisplayEnum.News,
      href: RouterPathEnum.News,
    },
  ];

  return (
    <NewsLayout
      breadcrumbItems={breadcrumbItems}
      newsData={newsData}
      hotNewsData={Array.isArray(hotNewsData) ? hotNewsData : []}
      currentPage={currentPage}
      category={category}
      totalPages={totalPages}
    />
  );
}

export default NewsPage;
