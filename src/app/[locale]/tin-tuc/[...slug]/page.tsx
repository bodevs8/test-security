import type { Metadata } from 'next';
import { BaseBreadcrumb } from '@/components/BaseBreadcrumb';
import { CategoryTab, HotNewsSidebar, SocialShare } from '@/components/News';
import { CATEGORIES } from '@/constant/news';
import { NewsCategoryDisplayEnum, RouterPathEnum } from '@/enums';
import { getNewsDetail, getPostsMostView } from '@/services';
import { formatDate } from '@/utils/date';
import { isMobileDevice } from '@/utils/device';
import clsx from 'clsx';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Ensure params is fully resolved before destructuring
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  // Fetch news detail from API
  const newsItem = await getNewsDetail(slug);
  if (!newsItem) {
    notFound();
  }

  return {
    title: newsItem.title,
    description: newsItem.description,
    keywords: newsItem.meta_keywords || newsItem.title,
    openGraph: {
      title: newsItem.title,
      description: newsItem.description,
      images: [
        {
          url: newsItem.thumbnail,
          width: 800,
          height: 600,
          alt: newsItem.title,
        },
      ],
      type: 'article',
      publishedTime: newsItem.created_time,
      modifiedTime: newsItem.last_updated_time,
    },
  };
}

async function NewsDetailPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  // Run isMobileDevice and getNewsDetail in parallel
  const [isMobile, newsItem] = await Promise.all([
    isMobileDevice(),
    getNewsDetail(slug),
  ]);

  if (!newsItem) {
    return redirect(RouterPathEnum.NotFound);
  }

  // Fetch hot news for the sidebar only for non-mobile devices
  let hotNewsData: any[] = [];
  if (!isMobile) {
    const hotNews = await getPostsMostView();
    hotNewsData = Array.isArray(hotNews) ? hotNews : [];
  }

  // Breadcrumb items
  const breadcrumbItems = [
    {
      label: 'Trang chủ',
      href: RouterPathEnum.Home,
    },
    {
      label: NewsCategoryDisplayEnum.All,
      href: RouterPathEnum.News,
    },
  ];

  // Social share data
  const shareData = {
    title: newsItem.title,
    thumbnail: newsItem.thumbnail,
    description: newsItem.description,
    url: `${process.env.NEXT_PUBLIC_APP_URL || ''}/tin-tuc/${slug}`,
  };

  return (
    <div className="x-container">
      {isMobile && (
        <div className="grid grid-cols-2 gap-4 mb-6 w-full pt-3 lg:mt-0">
          {CATEGORIES.map((item, index) => (
            <CategoryTab
              isMobile
              key={item.href}
              href={item.href}
              isActive={index === 0}
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

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="lg:bg-white lg:rounded-lg lg:p-6">
            {/* Featured Image */}
            <div className="mb-6">
              <Image
                src={newsItem.thumbnail}
                alt={newsItem.title}
                width={800}
                height={450}
                className="w-full object-cover"
              />
            </div>

            <div className="flex items-center justify-start text-green-500 mb-2 gap-1">
              <span className="icon icon-clock text-lg" />
              <span className="text-sm leading-[16px]">
                {formatDate(newsItem.created_time)}
              </span>
            </div>

            {/* News Title */}
            <h2 className="text-base lg:text-2xl font-bold text-dark-700 mb-4">
              {newsItem.title}
            </h2>

            {/* News Description */}
            <div className="text-dark-700 text-xs lg:text-sm font-medium mb-6">
              {newsItem.description}
            </div>

            {/* News Content */}
            <div
              className="text-dark-700 text-xs lg:text-sm news-content"
              dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />

            <div className="h-[1px] border border-primary-light-100 my-6" />

            {/* Social Share */}
            <SocialShare shareData={shareData} className="mb-4" />
          </div>
        </div>

        {/* Sidebar */}
        {!isMobile && (
          <div className="w-full lg:w-[380px]">
            <HotNewsSidebar hotNews={hotNewsData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsDetailPage;
