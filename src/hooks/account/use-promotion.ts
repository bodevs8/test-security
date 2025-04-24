'use client';
import type { ApiResponseError } from '@/types/service';
import { DATE_FORMAT } from '@/constant/date';
import { ResponseStatusEnum } from '@/enums';
import { useUserPromotion } from '@/hooks/useQueries';
import { cancelPromotion } from '@/services/client';
import { formatDate } from '@/utils/date';
import { formatNumberWithCommas } from '@/utils/format-currency';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { useRefresh } from './use-refresh';

export const usePromotion = () => {
  const t = useTranslations();
  const { refetchUser } = useRefresh();
  const { data: userPromotion, isPending } = useUserPromotion();
  const MAIN_CREDIT_UNIT = process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT;

  const cancelUserPromotion = async () => {
    try {
      const data = await cancelPromotion();
      if (data.status === ResponseStatusEnum.Ok) {
        await refetchUser();
      }
      return data;
    } catch (ex) {
      return {
        status: (ex as ApiResponseError).status,
        message: (ex as ApiResponseError)?.message || t('Common.message.error'),
      };
    }
  };

  const expTime = useMemo(() => {
    const startDate = formatDate(
      userPromotion?.created_time || '',
      DATE_FORMAT.SORT_DATE,
    );
    const endDate = formatDate(
      userPromotion?.end_time || '',
      DATE_FORMAT.SORT_DATE,
    );
    return `${startDate} - ${endDate}`;
  }, [userPromotion]);

  const currentRound = useMemo(() => {
    const turnover = userPromotion?.turnover ?? 0;
    const rolling = userPromotion?.rolling ?? 0;
    const multiplier = userPromotion?.multiplier ?? 1;
    const oneRoundAmount = rolling / (multiplier === 0 ? 1 : multiplier);
    return Math.floor(turnover / (oneRoundAmount === 0 ? 1 : oneRoundAmount));
  }, [userPromotion]);

  const currentBet = useMemo(() => {
    return formatNumberWithCommas(
      (userPromotion?.turnover ?? 0) / 1000,
      MAIN_CREDIT_UNIT,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPromotion]);

  const targetBet = useMemo(() => {
    return formatNumberWithCommas(
      (userPromotion?.rolling ?? 0) / 1000,
      MAIN_CREDIT_UNIT,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPromotion]);

  const depositAmount = useMemo(() => {
    return formatNumberWithCommas(
      userPromotion?.deposit_amount ?? 0,
      MAIN_CREDIT_UNIT,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPromotion]);

  const todayPromotionAmount = useMemo(() => {
    return formatNumberWithCommas(
      userPromotion?.promotion_amount ?? 0,
      MAIN_CREDIT_UNIT,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPromotion]);

  const promotionProgress = useMemo(() => {
    return ((currentRound ?? 0) / (userPromotion?.multiplier ?? 1)) * 100;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPromotion]);

  const handleCancelPromotion = async () => {
    const data = await cancelUserPromotion();
    if (data.status === ResponseStatusEnum.Ok) {
      toast.success(
        data.message || t('Toast.deposit.cancel_promotion_success'),
      );
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      return;
    }
    toast.error(data.message || t('Common.message.error'));
  };

  return {
    cancelUserPromotion,
    userPromotion,
    isPending,
    expTime,
    currentRound,
    currentBet,
    targetBet,
    depositAmount,
    todayPromotionAmount,
    promotionProgress,
    handleCancelPromotion,
  };
};
