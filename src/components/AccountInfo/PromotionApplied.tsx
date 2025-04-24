import type { PromotionPackageType } from '@/types/promotion';
import { PromotionCard } from '@/components/PromotionCard';
import { PROMOTION_PACKAGE } from '@/constant/promotion';
import { RouterPathEnum } from '@/enums/app';
import { ButtonVariantsEnum } from '@/enums/button';
import { PromotionPackageEnum } from '@/enums/promotion';
import { usePromotion } from '@/hooks/account';
import { useCashbackInfo } from '@/hooks/useQueries';
import { formatNumberWithCommas } from '@/utils/format-currency';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { CashbackBanner } from './CashbackBanner';

export const PromotionApplied = () => {
  const t = useTranslations('Pages.AccountInfo.PromotionApplied');
  const {
    userPromotion,
    todayPromotionAmount,
    currentRound,
    currentBet,
    targetBet,
    depositAmount,
    promotionProgress,
  } = usePromotion();
  const { data: cashbackInfo } = useCashbackInfo();

  const MAIN_CREDIT_UNIT = process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT;

  const renderComissionPackage = (hideTag?: boolean) => {
    const item =
      PROMOTION_PACKAGE.find(
        (item) => item.id === PromotionPackageEnum.Welcome,
      ) || ({} as PromotionPackageType);
    return (
      <PromotionCard
        promotion={item}
        userPackageId={userPromotion?.package_id}
        options={{
          imageClassName: 'aspect-[388/160]',
          containerClassName: clsx(
            'h-[160px] aspect-[388/160] hover:!scale-[1] !cursor-default',
          ),
          bannerWidth: 272,
          bannerHeight: 114,
          tagTextClassName: 'text-dark-700 !text-[10px] font-bold',
          tagClassName: hideTag ? '!hidden' : '',
          titleClassName: 'text-dark-700',
          upToClassName: '',
          upToContainerClassName: '!pl-0 mt-4',
        }}
      />
    );
  };

  const renderListPromotion = () => {
    return (
      <div className="flex flex-col gap-3">
        {renderComissionPackage()}
        <CashbackBanner hideTag={false} />
        <Link
          prefetch={false}
          href={RouterPathEnum.Promotions}
          className="cursor-pointer mt-3"
        >
          <Button
            id="join-promotion-button"
            type="button"
            name="join-promotion-button"
            className="flex gap-3 ml-1 items-center w-full"
            variant={ButtonVariantsEnum.Secondary}
          >
            <p className="text-sm font-medium text-dark-700 capitalize">
              {t('join_promotion')}
            </p>
          </Button>
        </Link>
      </div>
    );
  };

  const renderComissionView = () => {
    return (
      <>
        {renderComissionPackage()}
        <div className="flex gap-4 mt-4">
          <div className="progress-circle relative w-fit">
            <div className="relative">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_i_2685_2974)">
                  <path
                    d="M120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60ZM15 60C15 84.8528 35.1472 105 60 105C84.8528 105 105 84.8528 105 60C105 35.1472 84.8528 15 60 15C35.1472 15 15 35.1472 15 60Z"
                    fill="#F5F5F7"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_i_2685_2974"
                    x="0"
                    y="0"
                    width="120"
                    height="124"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect1_innerShadow_2685_2974"
                    />
                  </filter>
                </defs>
              </svg>
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="circular-progress absolute top-0 left-0 w-full h-full"
              >
                <circle className="fg"></circle>
              </svg>
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
              <p className="text-orange-50 text-[24px] font-bold">
                {currentRound}
              </p>
              <p className="text-xs font-medium text-[#9ba4bf]">
                /{userPromotion?.multiplier} vòng
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 grow-1">
            <div className="flex gap-3 px-4 bg-primary-light-50 grow-1 items-center rounded-[8px]">
              <div>
                <i className="icon-promotion-package text-[28px] text-dark-200"></i>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <p className="text-dark-700 font-medium">
                  {t('deposit_amount')}
                </p>
                <p className="text-green-500 font-bold">{depositAmount}</p>
              </div>
            </div>
            <div className="flex gap-3 px-4 bg-primary-light-50 grow-1 items-center rounded-[8px]">
              <div>
                <i className="icon-promotion-package text-[28px] text-dark-200"></i>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <p className="text-dark-700 font-medium">
                  {t('promotion_amount')}
                </p>
                <p className="text-green-500 font-bold">
                  {todayPromotionAmount}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 mb-6 rounded-[8px] bg-primary-light-50 w-full border border-green-200 py-3 text-center">
          <p className="text-dark-700 font-medium text-sm">
            {t('total_bet')}{' '}
            <span className="text-green-500 font-bold">{currentBet}</span> /{' '}
            {targetBet}
          </p>
        </div>
        <Link
          prefetch={false}
          href={RouterPathEnum.Promotions}
          className="cursor-pointer"
        >
          <Button
            id="vip-conditions-card-button"
            type="button"
            name="vip-conditions-card-button"
            className="flex gap-3 ml-1 items-center w-full"
            variant={ButtonVariantsEnum.Secondary}
          >
            <p className="text-sm font-medium text-dark-700 capitalize">
              {t('view_detail')}
            </p>
          </Button>
        </Link>
      </>
    );
  };

  const renderCashbackView = () => {
    return (
      <>
        <CashbackBanner hideTag={true} />
        <div className="flex gap-4 mt-4">
          <div className="flex gap-3 px-3 py-2 bg-primary-light-50 grow-1 items-center rounded-[8px] flex-1/2">
            <div>
              <i className="icon-deposit-amount text-[28px] text-dark-200"></i>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <p className="text-dark-700 font-medium">{t('total_bet')}</p>
              <p className="text-green-500 font-bold">
                {formatNumberWithCommas(
                  cashbackInfo?.todayBet ?? 0,
                  MAIN_CREDIT_UNIT,
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-3 px-3 py-2 bg-primary-light-50 grow-1 items-center rounded-[8px] flex-1/2">
            <div>
              <i className="icon-cashback-rate text-[28px] text-dark-200"></i>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <p className="text-dark-700 font-medium">{t('today_cashback')}</p>
              <p className="text-green-500 font-bold">
                {formatNumberWithCommas(
                  cashbackInfo?.todayCommission ?? 0,
                  MAIN_CREDIT_UNIT,
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3 mb-6 rounded-[8px] bg-primary-light-50 w-full p-3 text-center flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="flex items-center justify-center">
              <i className="icon-promotion-package text-[28px] text-dark-200"></i>
            </div>
            <p className="text-dark-700 font-medium text-sm">
              {t('today_cashback')}
            </p>
          </div>
          <p className="text-green-500 font-bold">
            {formatNumberWithCommas(
              cashbackInfo?.totalCommission ?? 0,
              MAIN_CREDIT_UNIT,
            )}
          </p>
        </div>
        <Link
          prefetch={false}
          href={RouterPathEnum.Promotions}
          className="cursor-pointer"
        >
          <Button
            id="vip-conditions-card-button"
            type="button"
            name="vip-conditions-card-button"
            className="flex gap-3 ml-1 items-center w-full"
            variant={ButtonVariantsEnum.Secondary}
          >
            <p className="text-sm font-medium text-dark-700 capitalize">
              {t('view_detail')}
            </p>
          </Button>
        </Link>
      </>
    );
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const el = document.querySelector('.circular-progress');
      if (el) {
        (el as HTMLElement).style.setProperty(
          '--progress',
          `${promotionProgress}`,
        );
      }
    }, 3000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white rounded-[12px] p-4">
      <p className="text-dark-700 uppercase font-bold text-base mb-4">
        {t('title')}
      </p>
      {!userPromotion?.package_id && renderListPromotion()}
      {userPromotion?.package_id === PromotionPackageEnum.Welcome &&
        renderComissionView()}
      {userPromotion?.package_id === PromotionPackageEnum.Cashback &&
        renderCashbackView()}
    </div>
  );
};
