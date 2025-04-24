import type { PromotionPackageType } from '@/types/promotion';
import { BaseSection } from '@/components/BaseSection';
import { PromotionCard } from '@/components/PromotionCard';
import { PROMOTION_PACKAGE } from '@/constant/promotion';
import { PromotionSlugEnum, RouterPathEnum } from '@/enums';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

type Props = {
  userPackageId?: number | boolean;
};

const PromotionSection = ({ userPackageId }: Props) => {
  const t = useTranslations();

  const SLUG_FILTER = [
    PromotionSlugEnum.CashbackSportBonus,
    PromotionSlugEnum.WelcomeBonus,
    PromotionSlugEnum.CashbackSlotsBonus,
  ];

  const promotionPackages = useMemo(
    () =>
      PROMOTION_PACKAGE.filter((item) =>
        SLUG_FILTER.includes(item.slug as PromotionSlugEnum),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div className="mt-10">
      <BaseSection
        title={t('Pages.HomePage.promotion.title')}
        iconName="promotion"
        loadMoreHref={RouterPathEnum.Promotions}
        contentClassName="mt-5"
      >
        <div className="grid grid-cols-3 gap-2 lg:gap-3 xl:gap-4 2xl:gap-5">
          {promotionPackages.map(
            (item: PromotionPackageType, index: number) => (
              <PromotionCard
                key={index}
                promotion={item}
                userPackageId={userPackageId}
                options={{
                  containerClassName: 'w-full',
                  bannerWidth: 419,
                  bannerHeight: 175,
                }}
              />
            ),
          )}
        </div>
      </BaseSection>
    </div>
  );
};

export default PromotionSection;
