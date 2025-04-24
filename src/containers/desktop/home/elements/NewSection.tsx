import type { NewsItemType } from '@/types/news';
import { BaseSection } from '@/components/BaseSection';
import { NewsItem } from '@/components/News';
import { RouterPathEnum } from '@/enums';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

type Props = {
  posts: NewsItemType[];
};

const NewsSection = ({ posts }: Props) => {
  const t = useTranslations('Pages.HomePage.news');

  const news = useMemo(() => {
    return posts || [];
  }, [posts]);

  return (
    <div className="mt-10">
      <BaseSection
        title={t('title')}
        iconName="news"
        loadMoreHref={RouterPathEnum.News}
        contentClassName="mt-5"
      >
        <div className="grid grid-cols-4 gap-2 lg:gap-3 xl:gap-4 2xl:gap-5">
          {news.map((post) => (
            <NewsItem
              key={post.id}
              {...post}
              thumbnailClassName="!aspect-[309/180]"
              contentClassName="!py-[10px] !px-3"
              iconClassName="!text-[16px]"
              formatDateClassName="!text-[12px] !font-[400]"
              titleClassName="!text-[14px] !font-medium"
              priority={false}
            />
          ))}
        </div>
      </BaseSection>
    </div>
  );
};

export default NewsSection;
