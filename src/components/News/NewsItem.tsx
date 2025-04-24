import type { NewsItemType } from '@/types/news';
import { RouterPathEnum } from '@/enums';
import { formatDate } from '@/utils/date';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export const NewsItem = ({
  title,
  alias,
  thumbnail,
  created_time,
  className,
  thumbnailClassName,
  contentClassName,
  iconClassName,
  formatDateClassName,
  titleClassName,
  priority = true,
}: NewsItemType) => {
  return (
    <Link
      prefetch={false}
      href={`${RouterPathEnum.News}/${alias}`}
      className={clsx(
        'block bg-light-green-gradient-2 rounded-lg overflow-hidden w-full relative text-dark-200',
        'transition-all duration-300 hover:shadow-lg hover:scale-[1.02]',
        className,
      )}
    >
      <Image
        src={thumbnail}
        alt={title}
        width={447}
        height={222}
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
        className={clsx(
          'object-cover w-full aspect-[332/159] lg:aspect-[287/182] object-top transition-transform duration-300 hover:scale-105',
          thumbnailClassName,
        )}
      />
      <div className={clsx('gap-2 py-3 px-3.5', contentClassName)}>
        <div className="flex items-center justify-start text-dark-200 gap-1">
          <div
            className={clsx(
              'text-xs lg:text-sm leading-[16px] text-green-500 flex items-center',
              formatDateClassName,
            )}
          >
            <span className={clsx('icon-clock text-lg mr-1', iconClassName)} />
            {formatDate(created_time)}
          </div>
        </div>
        <div className="mt-1">
          <h3
            className={clsx(
              'text-xs lg:text-sm cursor-pointer overflow-hidden text-ellipsis line-clamp-2 max-lg:leading-5 font-medium text-dark-600 transition-colors duration-300 group-hover:text-green-600',
              titleClassName,
            )}
          >
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};
