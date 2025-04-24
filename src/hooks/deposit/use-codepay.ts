'use client';

import type { UserData } from '@/types/auth';
import type { DepositCodepayParamsType } from '@/types/deposit';
import type { ApiResponseError } from '@/types/service';
import { RESPONSE_MESSAGE, RESPONSE_STATUS } from '@/constant/app';
import { RENEW_TIMER } from '@/constant/deposit';
import {
  ApiEndpointEnum,
  DepositMethodEnum,
  ModalIdEnum,
  PromotionPackageEnum,
  StepDepositEnum,
} from '@/enums';
import { useCodepayContext, useDepositContext } from '@/hooks/contexts';
import { useModalStore, useUserStore } from '@/hooks/stores';
import { useTrackingTransaction } from '@/hooks/tracking';
import { useToast } from '@/hooks/utils';
import { depositCodepay } from '@/services/client';
import { getTimeUTC } from '@/utils/date';
import { useTranslations } from 'next-intl';
import { useMemo, useTransition } from 'react';
import { useDeposit } from './use-deposit';

export const useDepositCodepay = (user: UserData | undefined) => {
  const [isPending, startTransition] = useTransition();
  const { setAmount, setNoteDeposit } = useDepositContext();
  const { trackDepositInitiated } = useTrackingTransaction();
  const { availablePackage } = useCodepayContext();
  const {
    setStep,
    step,
    expiredTime,
    timeRenew,
    timeRedirect,
    transactionKey,
    setTransactionInfo,
    renewTransactionInfo,
    startRenewTimer,
    startExpiredTimer,
    transactionInfo,
    setTimeRenew,
    setTimeRedirect,
    setExpiredTime,
  } = useDeposit({
    method: DepositMethodEnum.CODEPAY,
    refreshApi: ApiEndpointEnum.DepositNicepayInfo,
    user,
  });

  const { openModal } = useModalStore((state) => state);
  const userStore = useUserStore((state) => state);

  const t = useTranslations();
  const { success, error } = useToast();

  const transformFilterStatus = useMemo(() => {
    return availablePackage
      .map((item) => ({
        value: item.value,
        label: t(item.label),
      }))
      .reverse();
  }, [t, availablePackage]);

  const onSubmit = async (data: DepositCodepayParamsType) => {
    const userData = userStore.getUser();
    if (
      userData?.package_id &&
      userData?.package_id === PromotionPackageEnum.Welcome
    ) {
      openModal(ModalIdEnum.DepositPromotion);
      return;
    }
    try {
      startTransition(async () => {
        const payload = {
          ...data,
          amount: Number(data.amount),
        };

        const response = await depositCodepay(payload);

        if (
          response.status === RESPONSE_STATUS.SHOW_MESSAGE &&
          response.message === RESPONSE_MESSAGE.MANY_UNSUCCESS
        ) {
          openModal(ModalIdEnum.ErrorCodepay);
          return;
        }

        if (response.status !== RESPONSE_STATUS.OK) {
          error(response.message);
          return;
        }

        const cpInfo = response.data?.[0];

        if (cpInfo?.msg) {
          error(cpInfo?.msg ?? t('Toast.deposit.create_error'));
          return;
        }

        setTimeRenew(RENEW_TIMER);
        cpInfo.created_at_utc = getTimeUTC();

        setAmount(cpInfo?.amount ?? 0);
        setNoteDeposit(cpInfo?.code ?? '');
        setTransactionInfo(cpInfo);
        setStep(StepDepositEnum.RESULT);
        localStorage.setItem(transactionKey, JSON.stringify(cpInfo));
        success(t('Toast.deposit.create_success'));
        trackDepositInitiated({
          amount: cpInfo?.amount ?? 0,
          currency: 'VND',
          method: 'codepay',
        });
        startRenewTimer(cpInfo);
        startExpiredTimer(cpInfo);
      });
    } catch (ex) {
      error((ex as ApiResponseError)?.message);
    }
  };

  return {
    availablePackage,
    transformFilterStatus,
    setStep,
    step,
    onSubmit,
    isPending,
    expiredTime,
    timeRenew,
    timeRedirect,
    transactionInfo,
    renewTransactionInfo,
    setTransactionInfo,
    setTimeRenew,
    setTimeRedirect,
    setExpiredTime,
  };
};
