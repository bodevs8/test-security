'use client';

import { Loading } from '@/components/Loading';
import ConfirmModal from '@/components/Modals/ConfirmModal';
import { PromotionNote } from '@/components/PromotionApplied/PromotionNote';
import { PromotionCard } from '@/components/PromotionCard';
import { Button } from '@/components/ui/button';
import { PROMOTION_PACKAGE } from '@/constant/promotion';
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  ModalIdEnum,
  PromotionPackageEnum,
  RouterPathEnum,
} from '@/enums';
import { usePromotion } from '@/hooks/account';
import { useModalStore } from '@/hooks/stores';
import PromotionCancelIcon from '@/public/images/promotion-applied/promotion-cancel-icon.webp';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { AvailablePromotion } from './AvailablePromotion';

type InfoRowProps = {
  label: string;
  value: string | number;
  valueClassName?: string;
};

const InfoRow = ({
  label,
  value,
  valueClassName = 'text-dark-700 font-medium',
}: InfoRowProps) => (
  <div className="flex justify-between">
    <p className="text-dark-200 font-normal">{label}</p>
    <p className={valueClassName}>{value}</p>
  </div>
);

type ProgressBarProps = {
  current: number;
  total: number;
  progress: number;
  t: (key: string) => string;
};

const ProgressBar = ({ current, total, progress, t }: ProgressBarProps) => (
  <div className="flex flex-col items-start">
    <div className="flex items-center w-full justify-between">
      <p className="text-dark-200 font-normal">0</p>
      <p className="text-dark-200 font-normal">
        {t('Pages.Account.promotion_applied.package.round')}: {current} /{' '}
        <span className="text-dark-700">{total}</span>
      </p>
      <p className="text-dark-200 font-normal">{total}</p>
    </div>
    <div className="mt-2 bg-[#070E1A4D] w-full h-[8px] rounded-[20px]">
      <div
        className="bg-money h-full rounded-[20px]"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

type BetInfoProps = {
  currentBet: string;
  targetBet: string;
  t: (key: string) => string;
};

const BetInfo = ({ currentBet, targetBet, t }: BetInfoProps) => (
  <div className="flex flex-col items-start gap-2 mt-4 w-full justify-between">
    <p className="text-dark-700 font-normal">
      {t('Pages.Account.promotion_applied.package.current_bet')}:{' '}
      <span className="text-highlight font-bold">{currentBet}</span>
    </p>
    <p className="text-dark-700 font-normal">
      {t('Pages.Account.promotion_applied.package.target_bet')}:{' '}
      <span className="text-highlight font-bold">{targetBet}</span>
    </p>
  </div>
);

export const CommissionPackage = () => {
  const t = useTranslations('Pages.PromotionApplied');
  const {
    isPending,
    userPromotion,
    todayPromotionAmount,
    currentRound,
    currentBet,
    targetBet,
    expTime,
    depositAmount,
    promotionProgress,
    handleCancelPromotion,
  } = usePromotion();

  const { openModal, closeModal } = useModalStore((state) => state);

  const welcomePackage = PROMOTION_PACKAGE.find(
    (item) => item.id === PromotionPackageEnum.Welcome,
  );

  if (!welcomePackage) return null;

  const availablePackages = PROMOTION_PACKAGE;

  return (
    <div className="promotion-applied-container">
      {isPending && <Loading />}
      <div className="flex flex-col gap-4">
        <PromotionCard
          promotion={welcomePackage}
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

        <div className="flex flex-col gap-4 font-normal text-[3.077vw] leading-[140%] bg-primary-light-50 p-[2.564vw] rounded-[8px]">
          <InfoRow
            label={t('commission_package.package')}
            value={welcomePackage.name}
          />
          <InfoRow
            label={t('commission_package.time_available')}
            value={expTime}
          />
        </div>

        <div className="flex flex-col gap-4 font-normal text-[3.077vw] leading-[140%] bg-primary-light-50 p-[2.564vw] rounded-[8px]">
          <div className="flex flex-col gap-4 border-b border-primary-light-200 pb-4">
            <InfoRow
              label={t('commission_package.deposit_amount')}
              value={depositAmount}
              valueClassName="text-success font-bold"
            />
            <InfoRow
              label={t('commission_package.bonus')}
              value={todayPromotionAmount}
              valueClassName="text-success font-bold"
            />
          </div>

          <ProgressBar
            current={currentRound}
            total={userPromotion?.multiplier || 0}
            progress={promotionProgress}
            t={t}
          />

          <BetInfo currentBet={currentBet} targetBet={targetBet} t={t} />

          <div className="mt-4 w-full">
            <PromotionNote />
          </div>

          <div className="grid grid-cols-2 gap-2 justify-center">
            <Link
              prefetch={false}
              href={`${RouterPathEnum.Promotions}/${welcomePackage.slug}`}
              className="cursor-pointer max-lg:flex-1 basis-6/12 flex-grow"
            >
              <Button
                id="view-detail"
                name="view-detail"
                size={ButtonSizeEnum.LG}
                variant={ButtonVariantsEnum.Secondary}
                className="w-full"
              >
                <p className="font-medium text-base leading-[140%]">
                  {t('commission_package.view_detail')}
                </p>
              </Button>
            </Link>
            <Button
              id="cancel-promotion"
              name="cancel-promotion"
              size={ButtonSizeEnum.LG}
              variant={ButtonVariantsEnum.Disabled}
              onClick={() => openModal(ModalIdEnum.CancelPromotion)}
              className="basis-6/12"
            >
              <p className="font-medium text-base leading-[140%]">
                {t('commission_package.cancel')}
              </p>
            </Button>
          </div>
        </div>
        <AvailablePromotion promotions={availablePackages} />
      </div>
      <ConfirmModal
        modalId={ModalIdEnum.CancelPromotion}
        className="modal-cancel-promotion"
        descriptionClassName="text-center whitespace-pre-line"
        imageSrc={PromotionCancelIcon}
        title={t('cancel_promotion.title')}
        description={t('cancel_promotion.description')}
        confirmText={t('cancel_promotion.confirm')}
        cancelText={t('cancel_promotion.skip')}
        onConfirm={handleCancelPromotion}
        onCancel={() => closeModal(ModalIdEnum.CancelPromotion)}
        cancelBtnVariant={ButtonVariantsEnum.Secondary}
        confirmBtnVariant={ButtonVariantsEnum.Disabled}
      />
    </div>
  );
};
