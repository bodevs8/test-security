import type { PromotionPackageType } from '@/types/promotion';
import { PromotionCard } from '@/components/PromotionCard';
import { RouterPathEnum } from '@/enums';
import AvailableIcon from '@/public/images/promotion/available-icon.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type AvailablePromotionProps = {
  promotions: PromotionPackageType[];
};

export const AvailablePromotion = ({ promotions }: AvailablePromotionProps) => {
  const t = useTranslations();
  return (
    <div className="mt-4 py-3 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center py-1 gap-1">
          <Image
            src={AvailableIcon}
            alt="Promotion Icon"
            width={18}
            height={18}
            className="mb-[2px] w-[4.615vw]"
          />
          <h2 className="uppercase text-green-500 font-bold text-[4.103vw] leading-[140%]">
            {t('Pages.Account.promotion_applied.available')}
          </h2>
        </div>
        <Link href={RouterPathEnum.Promotions}>
          <p className="text-highlight font-medium text-xs">
            {t('Pages.Account.promotion_applied.view_detail')}
          </p>
        </Link>
      </div>
      <div className="flex flex-col gap-[10px]">
        {promotions?.map((item, index) => (
          <div key={index}>
            <PromotionCard
              promotion={item}
              options={{
                containerClassName: 'w-full h-auto',
                bannerWidth: 366,
                bannerHeight: 153,
                imageClassName: 'rounded-[8px]',
                tagTextClassName: '!text-[10px] font-medium',
                tagClassName: '!hidden',
                titleClassName: '!text-[4.103vw]',
                upToClassName: '!text-[2.564vw]',
                upToContainerClassName: '!h-[5.128vw] !pl-3',
                containerContentClassName: '!p-[5.128vw]',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
