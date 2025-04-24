import type { SectionTitleProps } from '@/types/component';
import { EmblaCarousel } from '@/components/EmblaCarousel';
import { PromotionCard } from '@/components/PromotionCard';
import { PROMOTION_PACKAGE } from '@/constant/promotion';
import { EmblaCarouselOrientationEnum, RouterPathEnum } from '@/enums';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type StyleProps = {
  promotionClassName?: string;
  imageClassName?: string;
  containerClassName?: string;
  slideClassName?: string;
  titleSectionClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
};

type OptionProps = {
  bannerOpts?: {
    width: number;
    height: number;
  };
  upToOpts?: {
    labelClassName?: string;
    containerClassName?: string;
  };
  labelOpts?: {
    className?: string;
    containerClassName?: string;
  };
  cardOpts?: {
    contentClassName?: string;
    titleClassName?: string;
  };
};

type Props = StyleProps &
  OptionProps & {
    slug?: string;
    userPackageId?: number | boolean;
    orientation?: EmblaCarouselOrientationEnum;
    sectionTitle?: SectionTitleProps;
  };

const defaultBannerWidth = 272;
const defaultBannerHeight = 114;

export const PromotionOther = ({
  slug,
  userPackageId,
  orientation,
  sectionTitle,

  promotionClassName,
  imageClassName,
  containerClassName,
  slideClassName,
  titleSectionClassName,
  titleClassName,
  contentClassName,

  bannerOpts,
  upToOpts,
  labelOpts,
  cardOpts,
}: Props) => {
  const t = useTranslations();
  const listPromotion = PROMOTION_PACKAGE.filter((item) => item.slug !== slug);
  const isVertical = orientation === EmblaCarouselOrientationEnum.Vertical;

  return (
    <EmblaCarousel
      id="promotion-other"
      className="overflow-hidden"
      containerClassName="-mt-4"
      slideClassName={clsx('w-full mt-3 !pt-0', slideClassName)}
      opts={{
        dragFree: true,
        containScroll: 'keepSnaps',
        axis: 'y',
      }}
      navigation={
        isVertical
          ? undefined
          : {
              classNameNext: 'promotion-next-btn',
              classNamePrev: 'promotion-prev-btn',
            }
      }
      sectionTitle={{
        ...sectionTitle,
        title: sectionTitle?.title || t('Pages.Promotion.other_promotion'),
        className: sectionTitle?.className || 'text-dark-700',
        titleSectionClassName,
        titleClassName,
      }}
      contentClassName={isVertical ? '!mt-0' : contentClassName}
      orientation={orientation}
    >
      {listPromotion.map((item, index) => (
        <Link
          key={index}
          href={`${RouterPathEnum.Promotions}/${item.slug}`}
          prefetch={false}
          className={clsx(
            'cursor-pointer text-dark-700 block w-full rounded-lg overflow-hidden bg-white',
            promotionClassName,
          )}
        >
          <PromotionCard
            promotion={item}
            userPackageId={userPackageId}
            options={{
              containerClassName: clsx('h-[160px]', containerClassName),
              bannerWidth: bannerOpts?.width || defaultBannerWidth,
              bannerHeight: bannerOpts?.height || defaultBannerHeight,
              imageClassName,
              tagTextClassName:
                labelOpts?.className || '!text-[8px] leading-[10px]',
              tagClassName: labelOpts?.containerClassName || '!h-[13px]',
              titleClassName: cardOpts?.titleClassName || '!text-[14px]',
              upToClassName:
                upToOpts?.labelClassName ||
                '!text-[8px] leading-[140%] font-normal',
              upToContainerClassName: upToOpts?.containerClassName || '!h-4',
              containerContentClassName:
                cardOpts?.contentClassName || '!px-3 !py-[14px]',
            }}
          />
        </Link>
      ))}
    </EmblaCarousel>
  );
};
