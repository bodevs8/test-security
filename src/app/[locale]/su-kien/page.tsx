import {
  NewsCategoryDisplayEnum,
  NewsCategoryEnum,
  RouterPathEnum,
} from '@/enums';
import { fetchNewsData } from '@/utils/news';
import { NewsLayout } from '../tin-tuc/NewsLayout';

export const revalidate = 60;
export const dynamic = 'auto';

type Props = {
  searchParams: Promise<{ page?: string }>;
};

/**
 * Events page component
 */
async function EventsPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const category = NewsCategoryEnum.Events;

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
      label: NewsCategoryDisplayEnum.Events,
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

export default EventsPage;
