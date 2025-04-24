'use client';

import type { UserData } from '@/types/auth';
import type { DepositFlexpayFormType } from '@/types/deposit';
import type { ApiResponseError } from '@/types/service';
import { RESPONSE_STATUS } from '@/constant/app';
import {
  MAX_AMOUNT_DEPOSIT,
  MIN_AMOUNT_DEPOSIT,
  RENEW_TIMER,
} from '@/constant/deposit';
import {
  ApiEndpointEnum,
  DepositMethodEnum,
  FlexpayTabEnum,
  FlexpayWalletEnum,
  ModalIdEnum,
  StepDepositEnum,
} from '@/enums';
import { useFlexpayContext } from '@/hooks/contexts';
import { useModalStore } from '@/hooks/stores';
import { useTrackingTransaction } from '@/hooks/tracking';
import { useToast } from '@/hooks/utils';
import { depositFlexpay } from '@/services/client';
import { formatTimeToUTC, getTimeUTC } from '@/utils/date';
import { useTranslations } from 'next-intl';
import { useMemo, useState, useTransition } from 'react';
import { useDeposit } from './use-deposit';

export const useDepositFlexpay = (user: UserData | undefined) => {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const { success, error } = useToast();
  const { trackDepositInitiated } = useTrackingTransaction();
  const modalStore = useModalStore((state) => state);
  const {
    flexpaySonicStatus,
    flexpayTurboStatus,
    flexpaySonic,
    flexpayTurbo,
    limitDepositFlexpay,
    indexDeposit,
  } = useFlexpayContext();

  const tabs = [
    {
      label: FlexpayTabEnum.TURBO,
      value: FlexpayTabEnum.TURBO,
      isMaintain: !flexpayTurboStatus,
    },
    {
      label: FlexpayTabEnum.SONIC,
      value: FlexpayTabEnum.SONIC,
      isMaintain: !flexpaySonicStatus,
    },
  ];
  const [activeTab, setActiveTab] = useState<FlexpayTabEnum>(() => {
    if (flexpayTurboStatus) {
      return FlexpayTabEnum.TURBO;
    }
    return FlexpayTabEnum.SONIC;
  });
  const [selectedBank, setSelectedBank] = useState('');

  // bank
  const turboBanking = useMemo(() => {
    return (flexpayTurbo || []).map((item) => ({
      label: item.name,
      value: item.code,
      provider: item.provider,
      isMaintain: !item.status,
    }));
  }, [flexpayTurbo]);

  const sonicBanking = useMemo(() => {
    return (flexpaySonic || []).map((item) => ({
      label: item.name,
      value: item.code,
      provider: item.provider,
      isMaintain: !item.status,
    }));
  }, [flexpaySonic]);

  const bankList = useMemo(() => {
    return activeTab === FlexpayTabEnum.TURBO ? turboBanking : sonicBanking;
  }, [activeTab, turboBanking, sonicBanking]);

  const limitDeposit = useMemo(() => {
    return (
      limitDepositFlexpay[activeTab] ?? {
        min: MIN_AMOUNT_DEPOSIT,
        max: MAX_AMOUNT_DEPOSIT,
      }
    );
  }, [activeTab, limitDepositFlexpay]);

  const provider = useMemo(() => {
    if (activeTab === FlexpayTabEnum.SONIC) {
      return indexDeposit?.ewallet?.providers?.[0] ?? '';
    }
    return indexDeposit?.ewallet?.providers?.[1] ?? '';
  }, [activeTab, indexDeposit]);

  const refreshFlexpayApi = useMemo(() => {
    return `${ApiEndpointEnum.DepositFlexpay}?wallet=${FlexpayWalletEnum.FASTPAY}&provider=${provider}`;
  }, [provider]);

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
    stopAllCountdown,
    setTimeRenew,
    setTimeRedirect,
    setExpiredTime,
  } = useDeposit({
    method: `${DepositMethodEnum.FLEXPAY}_${activeTab}`,
    refreshApi: refreshFlexpayApi,
    user,
  });

  const getBankFromCode = (bankCode: string) => {
    return bankList.find((item) => item.value === bankCode) ?? undefined;
  };

  const onSubmit = async (data: DepositFlexpayFormType) => {
    try {
      const bankFromCode = getBankFromCode(data.bank_code);

      startTransition(async () => {
        const payload = {
          ...data,
          amount: Number(data.amount),
          provider: bankFromCode?.provider ?? '',
          type: 'banking',
        };

        const response = await depositFlexpay(payload);
        if (response.status !== RESPONSE_STATUS.OK) {
          error(response.message);
          return;
        }

        const cpInfo = response.data?.[0];

        if (cpInfo?.msg) {
          error(cpInfo?.msg ?? t('Toast.deposit.create_error'));
          return;
        }

        if (
          cpInfo?.real_bank_code?.toString()?.toLowerCase() !==
          data.bank_code?.toString()?.toLowerCase()
        ) {
          cpInfo.to_bank_code =
            cpInfo.real_bank_code || cpInfo.real_bank_name || '';
          setSelectedBank(bankFromCode?.label ?? '');
          modalStore.openModal(ModalIdEnum.MaintainBank);
        }

        cpInfo.amount = Number(data.amount);
        cpInfo.created_at_utc = getTimeUTC();
        cpInfo.expired = formatTimeToUTC(Number(cpInfo.expired));
        setTimeRenew(RENEW_TIMER);

        setTransactionInfo(cpInfo);
        setStep(StepDepositEnum.RESULT);
        localStorage.setItem(transactionKey, JSON.stringify(cpInfo));
        success(t('Toast.deposit.create_success'));
        trackDepositInitiated({
          amount: cpInfo?.amount ?? 0,
          currency: 'VND',
          method: 'flexpay',
        });
        startRenewTimer(cpInfo);
        startExpiredTimer(cpInfo);
      });
    } catch (ex) {
      error((ex as ApiResponseError)?.message);
    }
  };

  return {
    setStep,
    step,
    onSubmit,
    isPending,
    expiredTime,
    timeRenew,
    timeRedirect,
    transactionInfo,
    renewTransactionInfo,
    tabs,
    activeTab,
    setActiveTab,
    turboBanking,
    sonicBanking,
    limitDeposit,
    bankList,
    setTransactionInfo,
    stopAllCountdown,
    transactionKey,
    selectedBank,
    setTimeRenew,
    setTimeRedirect,
    setExpiredTime,
  };
};
