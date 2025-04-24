import { PromotionOther } from '@/components/PromotionOther/PromotionOther';
import { Button } from '@/components/ui/button';
import {
  ButtonVariantsEnum,
  EmblaCarouselOrientationEnum,
  RouterPathEnum,
} from '@/enums';
import EmptyPackageBanner from '@/public/images/promotion-applied/empty-pg-banner.webp';
import AvailableIcon from '@/public/images/promotion/available-icon.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export const EmptyPackage = () => {
  const t = useTranslations('Pages.PromotionApplied.empty_banner');

  return (
    <div className="empty-package-container">
      <div className="relative rounded-[8px]">
        <Image
          src={EmptyPackageBanner}
          alt="promotion-banner"
          className="w-full aspect-[936/220] rounded-[8px] "
          width={936}
          height={220}
        />
        <div className="absolute top-0 left-0 size-full flex flex-col justify-center pl-[3.177vw] 3xl:pl-[60px]">
          <div className="w-[12.917vw] max-w-[248px]">
            <div className="w-full title-bg text-white h-[2.083vw] max-h-[40px] font-extrabold italic text-[0.833vw] 3xl:text-[16px] leading-[140%] uppercase flex items-center justify-start">
              {t('title')}
            </div>
            <div className="w-full sub-title-bg h-[2.604vw] max-h-[50px] text-white font-extrabold italic text-[1.25vw] 3xl:text-[24px] leading-[140%] uppercase flex items-center pl-[1.042vw] 3xl:pl-[20px] justify-start">
              {t('sub_title')}
            </div>
            <Link prefetch={false} href={RouterPathEnum.Promotions}>
              <Button
                id="promotion-applied-detail"
                type="button"
                name="promotion-applied-detail"
                className="w-[9.479vw] h-[2.083vw] rounded-[4px] max-w-[182px] max-h-[40px] mt-[2.188vw] 3xl:mt-[42px]"
                variant={ButtonVariantsEnum.Secondary}
              >
                <p className="text-[0.833vw] 3xl:text-base leading-[100%] font-medium">
                  {t('btn_detail')}
                </p>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-6">
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
            title: t('available'),
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
      </div>
    </div>
  );
};
