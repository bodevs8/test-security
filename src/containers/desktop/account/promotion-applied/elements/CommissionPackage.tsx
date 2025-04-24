'use client';

import { Loading } from '@/components/Loading';
import ConfirmModal from '@/components/Modals/ConfirmModal';
import { PromotionNote } from '@/components/PromotionApplied/PromotionNote';
import { PROMOTION_PACKAGE } from '@/constant/promotion';
import { ButtonVariantsEnum, ModalIdEnum, PromotionPackageEnum } from '@/enums';
import { usePromotion } from '@/hooks/account';
import { useModalStore } from '@/hooks/stores';
import PromotionCancelIcon from '@/public/images/promotion-applied/promotion-cancel-icon.webp';
import { useTranslations } from 'next-intl';
import { PackageList } from './PackageList';
import { PromotionDetails } from './PromotionDetails';
import { PromotionHeader } from './PromotionHeader';

const ProgressTracker = ({
  currentRound,
  userPromotion,
  promotionProgress,
  currentBet,
  targetBet,
}: {
  currentRound: number;
  userPromotion: any;
  promotionProgress: number;
  currentBet: string;
  targetBet: string;
}) => {
  const t = useTranslations('Pages.PromotionApplied');

  return (
    <div className="flex flex-col items-start w-[24.479vw] max-w-[470px]">
      <div className="flex items-center w-full justify-between text-dark-200 font-medium text-sm leading-[140%]">
        <p>0</p>
        <p className="font-bold">
          {t('commission_package.round')} {currentRound} /{' '}
          <span className="text-dark-700">
            {userPromotion?.multiplier ?? 0}
          </span>
        </p>
        <p>{userPromotion?.multiplier ?? 0}</p>
      </div>
      <div className="mt-2 bg-[#070E1A4D] w-full h-[8px] rounded-[20px]">
        <div
          className="bg-money h-full w-full rounded-[20px]"
          style={{ width: `${promotionProgress}%` }}
        ></div>
      </div>
      <div className="flex items-center mt-6 w-full justify-between font-normal text-sm leading-[140%]">
        <p className="text-dark-700">
          {t('commission_package.current_bet')}
          <span className="font-medium text-highlight">{currentBet}</span>
        </p>
        <p className="text-dark-700">
          {t('commission_package.target_bet')}
          <span className="font-medium text-highlight">{targetBet}</span>
        </p>
      </div>
    </div>
  );
};

const PromotionStats = ({
  depositAmount,
  todayPromotionAmount,
}: {
  depositAmount: string;
  todayPromotionAmount: string;
}) => {
  const t = useTranslations('Pages.PromotionApplied');

  return (
    <div className="flex items-center gap-4 flex-grow max-w-[394px] text-sm leading-[140%] text-dark-200 font-medium">
      <div className="cashback-item flex flex-col items-center justify-center gap-1 flex-grow text-center h-[68px] w-[174px] rounded-[8px] bg-white">
        <p>{t('commission_package.deposit_amount')}</p>
        <p className="font-bold text-success">{depositAmount}</p>
      </div>
      <div className="cashback-item flex flex-col items-center justify-center gap-1 flex-grow text-center h-[68px] w-[174px] rounded-[8px] bg-white">
        <p>{t('commission_package.bonus')}</p>
        <p className="font-bold text-success">{todayPromotionAmount}</p>
      </div>
    </div>
  );
};

const CancelPromotionModal = ({
  modalId,
  handleCancelPromotion,
  closeModal,
}: {
  modalId: ModalIdEnum;
  handleCancelPromotion: () => void;
  closeModal: (modalId: ModalIdEnum) => void;
}) => {
  const t = useTranslations('Pages.PromotionApplied');

  return (
    <ConfirmModal
      modalId={modalId}
      className="modal-cancel-promotion"
      descriptionClassName="text-center whitespace-pre-line"
      imageSrc={PromotionCancelIcon}
      title={t('cancel_promotion.title')}
      description={t('cancel_promotion.description')}
      confirmText={t('cancel_promotion.confirm')}
      cancelText={t('cancel_promotion.skip')}
      onConfirm={handleCancelPromotion}
      onCancel={() => closeModal(modalId)}
      cancelBtnVariant={ButtonVariantsEnum.Secondary}
      confirmBtnVariant={ButtonVariantsEnum.Disabled}
    />
  );
};

export const CommissionPackage = () => {
  const t = useTranslations();
  const {
    isPending,
    userPromotion,
    todayPromotionAmount,
    currentRound,
    currentBet,
    targetBet,
    expTime,
    depositAmount,
    handleCancelPromotion,
    promotionProgress,
  } = usePromotion();
  const { openModal, closeModal } = useModalStore((state) => state);

  const commissionPackage = PROMOTION_PACKAGE.find(
    (item) => item.id === PromotionPackageEnum.Welcome,
  );
  if (!commissionPackage) return null;

  return (
    <div>
      {isPending && <Loading />}
      <PromotionHeader title={t('Pages.PromotionApplied.title')} />

      <PromotionDetails
        data={{
          ...commissionPackage,
          name: t(commissionPackage.titleKey),
        }}
        expTime={expTime}
        openModal={openModal}
      />

      <div className="bg-primary-light-50 px-4 py-6 flex justify-between items-center gap-4 my-6 rounded-[8px]">
        <ProgressTracker
          currentRound={currentRound}
          userPromotion={userPromotion}
          promotionProgress={promotionProgress}
          currentBet={currentBet}
          targetBet={targetBet}
        />
        <PromotionStats
          depositAmount={depositAmount}
          todayPromotionAmount={todayPromotionAmount}
        />
      </div>

      <div className="mt-4 w-full">
        <PromotionNote />
      </div>

      <div className="mt-6">
        <PackageList />
      </div>

      <CancelPromotionModal
        modalId={ModalIdEnum.CancelPromotion}
        handleCancelPromotion={handleCancelPromotion}
        closeModal={closeModal}
      />
    </div>
  );
};
