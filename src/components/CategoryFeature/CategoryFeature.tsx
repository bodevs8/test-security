import type { CategoryFeatured } from '@/types/game';
import { Tag } from '@/components/Tag';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type CategoryFeatureProps = {
  item: CategoryFeatured;
  priority?: boolean;
  isMobile?: boolean;
  className?: string;
};

export const CategoryFeature = ({
  item,
  priority,
  isMobile,
  className,
}: CategoryFeatureProps) => {
  const t = useTranslations();

  return (
    <Link
      href={item.href}
      prefetch={false}
      className={`category-feature-item max-lg:rounded-[8px] lg:min-w-[330px] bg-category-item flex items-center overflow-hidden gap-[6px] md:gap-4 relative cursor-pointer pl-2 pr-4 pt-[12.54px] pb-[10.54px] lg:pl-[14px] lg:pr-[10px] lg:py-0 ${className}`}
    >
      <Image
        src="/images/home/categories/bg-radient.webp"
        alt="bg-radient"
        width={108}
        height={110}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        className="absolute top-[50%] translate-y-[-50%] sm:left-2 lg:left-[14px] object-cover !aspect-[50/50] !w-[50px] lg:!aspect-[108/110] lg:!w-[108px]"
      />
      <Image
        src={isMobile ? item.srcMobile : item.src}
        alt={item.title}
        width={108}
        height={110}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        className="relative z-1 object-cover !aspect-[50/50] !w-[50px] lg:!aspect-[108/110] lg:!w-[108px]"
      />
      <div className="md:pr-4 w-full overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="text-white-150 capitalize text-[14px] leading-5 lg:text-[18px] lg:leading-[21px] font-[600] whitespace-nowrap">
            {t(item.title)}
          </div>
          {item.label && (
            <Tag
              type={item.label}
              className="max-md:absolute max-md:top-0 max-md:right-0 max-md:!rounded-[0px] max-md:!rounded-bl-[8px] max-md:!rounded-tr-[8px] max-md:h-[14px] max-md:!text-[10px] max-md:!leading-[15px] max-md:!uppercase"
            />
          )}
        </div>
        <div className="block mt-[2px] md:mt-2 text-white-80 whitespace-nowrap lg:whitespace-pre-wrap text-[10px] leading-[15px] md:text-[12px] lg:text-[14px] lg:leading-[21px] overflow-hidden overflow-ellipsis line-clamp-1 lg:line-clamp-2">
          {t(item.content)}
        </div>
      </div>
      <div className="hidden lg:flex hover-effect bg-hover-gradient absolute top-0 right-0 h-full w-[47px] justify-center items-center">
        <i className="icon-arrow-right text-purple-100 text-[16px]" />
      </div>
    </Link>
  );
};
