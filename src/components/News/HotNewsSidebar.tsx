import type { NewsItemType } from '@/types/news';
import { RouterPathEnum } from '@/enums';
import { formatDate } from '@/utils/date';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type HotNewsSidebarProps = {
  hotNews: NewsItemType[];
};

export const HotNewsSidebar = ({ hotNews }: HotNewsSidebarProps) => {
  const t = useTranslations('Pages.NewsPage');

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="font-bold text-dark-700 uppercase mb-4 border-b border-primary-light-500 pb-4">
        {t('hot_news')}
      </h2>

      <div className="space-y-3">
        {hotNews.length > 0 &&
          hotNews.map((news) => (
            <Link
              prefetch={false}
              key={news.id}
              href={`${RouterPathEnum.News}/${news.alias}`}
              className="flex gap-2 group p-2 rounded-lg bg-primary-light-50"
            >
              <div className="flex-shrink-0">
                <Image
                  src={news.thumbnail}
                  alt={news.title}
                  width={127}
                  height={80}
                  className="rounded-lg object-cover w-[127px] h-[80px]"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-dark-600 group-hover:text-green-500 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-xs text-green-500 mt-1 flex items-center">
                  <span className="icon-clock text-lg mr-1" />
                  {formatDate(news.created_time)}
                </p>
              </div>
            </Link>
          ))}

        {hotNews.length === 0 && (
          <div className="text-dark-200 text-sm">{t('empty')}</div>
        )}
      </div>
    </div>
  );
};
