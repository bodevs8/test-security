import type { PromotionPackageType } from '@/types/promotion';
import { PromotionCard } from '@/components/PromotionCard';
import { Button } from '@/components/ui/button';
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  ModalIdEnum,
  PromotionPackageEnum,
  RouterPathEnum,
} from '@/enums';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type BannerProps = {
  data: PromotionPackageType;
};

const CashbackPackageBanner = ({ data }: BannerProps) => {
  const t = useTranslations();
  return (
    <div className="relative max-w-[576px] max-h-[230px] min-w-[400px] size-full">
      <Image
        src={data.img}
        width={576}
        height={230}
        alt="Cashback Banner"
        className="rounded-[8px] w-full aspect-[576/230]"
      />
      <div className="absolute top-0 left-0 size-full justify-center flex flex-col pl-[1.302vw] lg:pl-[25px] w-[14.063vw] lg:w-[270px] max-w-[270px]">
        <div className="title-bg text-white h-[40px] font-extrabold italic text-[1.25vw] lg:text-[24px] leading-[140%] uppercase w-full flex items-center justify-end pr-[0.625vw] lg:pr-[12px]">
          {t(data.titleKey)}
        </div>
        <div className="cashback-upto text-[1.25vw] lg:text-[24px] leading-[140%] uppercase w-full flex font-extrabold items-center text-center justify-center">
          {data.upto}
        </div>
      </div>
    </div>
  );
};

const CommissionPackageBanner = ({ data }: BannerProps) => {
  return (
    <PromotionCard
      promotion={data}
      options={{
        containerClassName: 'max-w-[576px] max-h-[230px]',
        bannerWidth: 576,
        bannerHeight: 230,
        imageClassName: 'rounded-lg',
        tagClassName: '!hidden',
        upToContainerClassName: '!h-[32px] !max-w-[236px]',
        upToClassName: '!text-[16px] leading-[140%]',
        titleClassName: '3xl:text-[32px] !mt-0 md:text-[24px]',
        contentClassName: '!justify-normal gap-4 !h-fit',
        containerContentClassName: 'flex items-center !py-0 !pl-[1.667vw]',
      }}
    />
  );
};

type PromotionDetailsProps = {
  data: PromotionPackageType;
  expTime: string;
  openModal?: (modalId: ModalIdEnum) => void;
};

export const PromotionDetails = ({
  data,
  expTime,
  openModal,
}: PromotionDetailsProps) => {
  const t = useTranslations('Pages.PromotionApplied');

  const Banner =
    data.id === PromotionPackageEnum.Cashback
      ? CashbackPackageBanner
      : CommissionPackageBanner;

  return (
    <div className="flex flex-row gap-4 mt-6">
      <Banner data={data} />
      <div className="xl:px-4 pb-4 px-[0.833vw] flex flex-col bg-primary-light-50 flex-grow rounded-[8px] pt-[1.875vw] 3xl:pt-[36px] justify-between">
        <div className="flex flex-col gap-[16px] xl:gap-[24px]">
          <div className="flex flex-col items-start gap-2 font-normal text-sm leading-[140%]">
            <p className="text-dark-200">{t('commission_package.package')}</p>
            <p className="text-dark-700 font-medium">{data?.name}</p>
          </div>
          <div className="flex flex-col items-start gap-2 font-normal text-sm leading-[140%]">
            <p className="text-dark-200">
              {t('commission_package.time_available')}
            </p>
            <p className="text-dark-700 font-medium">{expTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <Link
            prefetch={false}
            href={`${RouterPathEnum.Promotions}/${data?.slug}`}
            className="cursor-pointer max-lg:flex-1 basis-6/12 flex-grow"
          >
            <Button
              id="view-detail"
              name="view-detail"
              size={ButtonSizeEnum.LG}
              variant={ButtonVariantsEnum.Secondary}
              className="w-full md:!h-[32px] lg:!h-[40px]"
            >
              <p className="font-medium md:!text-xs lg:!text-base leading-[140%] text-dark-700">
                {t('commission_package.view_detail')}
              </p>
            </Button>
          </Link>
          {openModal && (
            <Button
              id="cancel-promotion"
              name="cancel-promotion"
              size={ButtonSizeEnum.LG}
              variant={ButtonVariantsEnum.Disabled}
              onClick={() => openModal(ModalIdEnum.CancelPromotion)}
              className="basis-6/12 flex-grow md:!h-[32px] lg:!h-[40px]"
            >
              <p className="font-medium md:!text-xs lg:!text-base leading-[140%] text-white">
                {t('commission_package.cancel')}
              </p>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
