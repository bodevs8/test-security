'use client';

import type { PromotionPackageType } from '@/types/promotion';
import { useTrackingPromotion } from '@/hooks/tracking';
import { useDevice } from '@/hooks/utils';
import { getUserPromotionLabel } from '@/utils/promotion';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { PromotionTag } from '../Tag';

import '@/styles/pages/promotion/card.scss';

type Props = {
  promotion: PromotionPackageType;
  userPackageId?: number | boolean;
  options?: {
    bannerWidth: number;
    bannerHeight: number;
    containerClassName?: string;
    containerContentClassName?: string;
    imageClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    tagClassName?: string;
    tagTextClassName?: string;
    upToClassName?: string;
    upToContainerClassName?: string;
    contentClassName?: string;
  };
};

export const PromotionCard = ({ promotion, userPackageId, options }: Props) => {
  const t = useTranslations('');

  const { trackPromotionClicked } = useTrackingPromotion();
  const { isMobile } = useDevice();

  const handleClick = () => {
    trackPromotionClicked({
      promotionId: promotion.slug,
      promotionName: promotion.name,
    });
  };

  const { currentTag } = getUserPromotionLabel(promotion.id, userPackageId);

  const bannerImage = isMobile ? promotion.imgMb : promotion.img;
  const title = isMobile ? t(promotion.titleMbKey) : t(promotion.titleKey);

  return (
    <div
      className={clsx(
        'relative w-full transition-all duration-300 hover:scale-[1.02] cursor-pointer',
        options?.containerClassName,
      )}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={promotion.name}
    >
      <Image
        src={bannerImage}
        alt={promotion.name}
        className={clsx('w-full h-full rounded-[6px]', options?.imageClassName)}
        width={options?.bannerWidth}
        height={options?.bannerHeight}
      />
      <div
        className={clsx(
          'absolute top-0 left-0 w-full h-full p-2 lg:px-5 lg:py-4 xl:py-[28px]',
          options?.containerContentClassName,
        )}
      >
        <div
          className={clsx(
            'flex flex-col justify-between items-start h-full',
            options?.contentClassName,
          )}
        >
          <div>
            <PromotionTag
              tagKey={currentTag}
              className={options?.tagClassName}
              tagTextClassName={options?.tagTextClassName}
            />
            <p
              className={clsx(
                'font-extrabold text-[1.563vw] xl:text-base leading-[140%] uppercase text-left text-dark-700 italic whitespace-pre-line mt-2',
                options?.titleClassName,
              )}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
          <div
            className={clsx(
              'upto h-[2.441vw] xl:h-[25px] flex items-center pl-4 2xl:w-full max-w-[175px]',
              options?.upToContainerClassName,
            )}
          >
            <p
              className={clsx(
                'text-[10px] xl:text-xs font-medium text-dark-700',
                options?.upToClassName,
              )}
            >
              {promotion.upto}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
