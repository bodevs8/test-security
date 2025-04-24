import type { PromotionDetailType } from '@/types/promotion';
import { PromotionTag } from '@/components/Tag';
import { Button } from '@/components/ui/button';
import { ButtonVariantsEnum, PromotionTextButtonEnum } from '@/enums';
import { getUserPromotionLabel } from '@/utils/promotion';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  promotion: PromotionDetailType;
  userPackageId?: number | boolean;
  onClick?: () => void;
  linkUrl: string;
};

export const PromotionBanner = ({
  promotion,
  userPackageId,
  linkUrl,
  onClick,
}: Props) => {
  const t = useTranslations('Pages.Promotion');

  const { buttonText, currentTag, isDisabledButton } = getUserPromotionLabel(
    promotion.id,
    userPackageId,
  );

  const isHideButton = buttonText === PromotionTextButtonEnum.NotAvailable;

  return (
    <div className="relative">
      <Image
        src={promotion.bannerImage}
        alt={promotion.title}
        width={965}
        height={264}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center pl-[3.177vw]">
        <div className="flex flex-col justify-between gap-[1.25vw] 3xl:gap-[24px]">
          <div className="flex flex-col gap-[0.667vw] xl:gap-2">
            <PromotionTag tagKey={currentTag} />
            <h2 className="text-dark-700 text-[14px] lg:text-[24px] leading-[140%] font-extrabold uppercase italic whitespace-pre-wrap">
              {promotion.title}
            </h2>
            <div className="upto h-[16px] lg:h-[24px] xl:h-[27px] flex items-center pl-4 max-w-[160px] lg:max-w-[210px]">
              <p className="text-[10px] leading-[140%] lg:text-[12px] xl:text-base font-normal text-dark-700">
                {promotion.subtitle}
              </p>
            </div>
          </div>
          {!isHideButton && (
            <Link prefetch={false} href={linkUrl} onClick={onClick}>
              <Button
                id="deposit-button-top"
                name="deposit-button-top"
                variant={ButtonVariantsEnum.Secondary}
                className="w-full transition-all duration-300 hover:scale-105 text-[1.367vw] max-w-[11.719vw] h-[3.125vw] leading-[140%] xl:text-base xl:max-w-[206px] xl:h-[40px] "
                disabled={isDisabledButton}
              >
                {t(buttonText)}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
