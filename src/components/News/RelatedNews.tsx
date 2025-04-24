import type { NewsItemType } from '@/types/news';
import { BaseSectionTitle } from '@/components/BaseSectionTitle';
import { RouterPathEnum } from '@/enums';
import { formatDate } from '@/utils/date';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type RelatedNewsProps = {
  news: NewsItemType[];
  currentNewsId: number;
};

export const RelatedNews = ({ news, currentNewsId }: RelatedNewsProps) => {
  const t = useTranslations('Pages.NewsPage');

  // Filter out the current news and get up to 4 related news
  const relatedNews = news
    .filter((item) => item.id !== currentNewsId)
    .slice(0, 4);

  if (relatedNews.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <BaseSectionTitle
        title={t('related_news')}
        iconName="news"
        className="mb-6"
      />
      <div className="relative">
        <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
          {relatedNews.map((item, index) => (
            <Link
              prefetch={false}
              key={item.id}
              href={`${RouterPathEnum.News}/${item.alias}`}
              className={clsx(
                'flex-none w-[80%] snap-start bg-neutral-400 rounded-lg overflow-hidden relative text-dark-200',
                index !== relatedNews.length - 1 ? 'mr-4' : '',
                'md:w-full md:mr-0',
              )}
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={322}
                height={159}
                className="object-cover w-full aspect-[322/159]"
              />
              <div className="p-3">
                <div className="flex items-center justify-start text-dark-200 mb-2">
                  <div className="text-sm leading-[16px]">
                    {formatDate(item.created_time)}
                  </div>
                </div>
                <h3 className="text-base font-medium text-white hover:text-primary-100 line-clamp-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-dark-200 line-clamp-1">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
