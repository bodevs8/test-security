import { PromotionOther } from '@/components/PromotionOther/PromotionOther';
import { EmblaCarouselOrientationEnum } from '@/enums';
import AvailableIcon from '@/public/images/promotion/available-icon.webp';
import { useTranslations } from 'next-intl';

export const PackageList = () => {
  const t = useTranslations('Pages.PromotionApplied');

  return (
    <PromotionOther
      promotionClassName=""
      imageClassName="rounded-lg"
      containerClassName="!h-[134px] -ml-2"
      slideClassName="max-h-[134px] max-w-[306px]"
      orientation={EmblaCarouselOrientationEnum.Horizontal}
      labelOpts={{
        containerClassName: '!hidden',
      }}
      upToOpts={{
        labelClassName: '!text-[9px] leading-[140%]',
        containerClassName: '!h-[19px] !max-w-[132px]',
      }}
      titleSectionClassName="py-1"
      sectionTitle={{
        iconData: AvailableIcon,
        title: t('commission_package.package_available'),
        iconClassName: 'w-[1.354vw] 3xl:w-[26px]',
        titleClassName:
          'uppercase text-green-500 font-bold text-[1.25vw] leading-[140%] 3xl:text-[24px]',
      }}
      bannerOpts={{
        width: 306,
        height: 134,
      }}
      cardOpts={{
        contentClassName: '!pl-[24px]',
        titleClassName: '!text-[16px] !mt-0',
      }}
    />
  );
};
