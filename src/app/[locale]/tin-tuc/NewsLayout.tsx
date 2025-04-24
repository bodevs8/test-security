import type { NewsLayoutProps } from '@/types/news';
import { BaseBreadcrumb } from '@/components/BaseBreadcrumb';
import { CategoryTab, HotNewsSidebar, NewsList } from '@/components/News';
import { CATEGORIES } from '@/constant/news';
import { isMobileDevice } from '@/utils/device';
import clsx from 'clsx';

/**
 * Shared layout for news-related pages
 */
export async function NewsLayout({
  breadcrumbItems,
  newsData,
  hotNewsData,
  currentPage,
  category,
  totalPages,
}: NewsLayoutProps) {
  const isMobile = await isMobileDevice();

  return (
    <div className="pb-6 lg:pb-8">
      <div className="x-container">
        {isMobile && (
          <div className="grid grid-cols-2 gap-4 mb-6 w-full bg-white pt-3 lg:pt-0">
            {CATEGORIES.map((item) => (
              <CategoryTab
                isMobile
                key={item.href}
                href={item.href}
                isActive={item.category === category}
                label={item.label}
                icon={item.icon}
              />
            ))}
          </div>
        )}
        {/* Breadcrumb */}
        <div className={clsx('px-0 lg:px-3', !isMobile && 'pt-6')}>
          <BaseBreadcrumb items={breadcrumbItems} className="mb-6" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 px-0 lg:px-3">
          {/* Main content */}
          <div className="flex-1">
            <NewsList
              newsData={newsData}
              currentPage={currentPage}
              category={category}
              totalPages={totalPages}
              isMobile={isMobile}
              categories={CATEGORIES}
            />
          </div>

          {/* Sidebar - only show on non-mobile devices */}
          {!isMobile && (
            <div className="w-full lg:w-[320px] xl:w-[396px]">
              <HotNewsSidebar hotNews={hotNewsData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
