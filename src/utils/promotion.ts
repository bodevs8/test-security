import type { PromotionConfig, PromotionDetailType } from '@/types/promotion';
import { PromotionPackageEnum, PromotionTagEnum, PromotionTextButtonEnum } from '@/enums';

export const getUserPromotionLabel = (packageId: number, userPackageId?: number | boolean): PromotionConfig => {
  if (!userPackageId) {
    return {
      buttonText: PromotionTextButtonEnum.JoinNow,
      currentTag: PromotionTagEnum.Available,
      isDisabledButton: false,
    };
  }

  if (userPackageId === PromotionPackageEnum.Cashback && packageId === PromotionPackageEnum.Welcome) {
    return {
      buttonText: PromotionTextButtonEnum.NotAvailable,
      currentTag: PromotionTagEnum.NotAvailable,
      isDisabledButton: false,
    };
  }

  if (packageId === userPackageId) {
    return {
      buttonText: PromotionTextButtonEnum.Deposit,
      currentTag: PromotionTagEnum.Applying,
      isDisabledButton: userPackageId === PromotionPackageEnum.Welcome,
    };
  }

  return {
    buttonText: PromotionTextButtonEnum.JoinNow,
    currentTag: PromotionTagEnum.Available,
    isDisabledButton: false,
  };
};

export const getDepositLinkByPromotion = (promotion: PromotionDetailType, isLoggedIn: boolean) => {
  if (!isLoggedIn) {
    return `#`;
  }
  return `${promotion?.linkButton}${promotion?.linkButton?.includes('?') ? '&' : '?'}packageId=${promotion?.id}`;
};
