import { BaseBreadcrumb } from '@/components/BaseBreadcrumb';
import { PromotionCard } from '@/components/PromotionCard';
import {
  PROMOTION_BREADCRUMB_ITEMS,
  PROMOTION_PACKAGE,
} from '@/constant/promotion';
import { RouterPathEnum } from '@/enums';
import PromotionIcon from '@/public/images/promotion/promotion-icon.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  userPackageId?: number | boolean;
};

export const PromotionContainerDesktop = ({ userPackageId }: Props) => {
  const t = useTranslations();

  return (
    <div className="x-container !pt-5 !pb-[60px]">
      <BaseBreadcrumb
        items={PROMOTION_BREADCRUMB_ITEMS}
        className="max-[1025px]:py-[7px]"
      />
      <div className="mt-6">
        <div className="flex items-center gap-2 h-[42px]">
          <Image
            src={PromotionIcon}
            alt="Promotion Icon"
            width={26}
            height={26}
            className="mb-[2px]"
          />
          <h2 className="uppercase text-green-500 font-bold text-2xl leading-[34px]">
            {t('Pages.Promotion.title')}
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-5 xl:gap-5">
          {PROMOTION_PACKAGE.map((promotion, index) => (
            <Link
              key={index}
              href={`${RouterPathEnum.Promotions}/${promotion.slug}`}
              prefetch={false}
            >
              <PromotionCard
                key={index}
                promotion={promotion}
                userPackageId={userPackageId}
                options={{
                  containerClassName: 'w-[419px]',
                  bannerWidth: 419,
                  bannerHeight: 175,
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
