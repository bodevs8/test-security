'use client';

import type { LimitDepositType } from '@/contexts/transaction/flexpay-context';
import type { UserData } from '@/types/auth';
import type { AccountOption, DepositEwalletParamsType } from '@/types/deposit';
import type { ApiResponseError } from '@/types/service';
import { RESPONSE_STATUS } from '@/constant/app';
import {
  EWALLET_MAPPING_PROVIDER,
  MAX_AMOUNT_DEPOSIT,
  MIN_AMOUNT_DEPOSIT,
  RENEW_TIMER,
} from '@/constant/deposit';
import {
  ApiEndpointEnum,
  DepositMethodEnum,
  EwalletMethodEnum,
  EwalletTabEnum,
  StepDepositEnum,
} from '@/enums';
import { useEwalletContext } from '@/hooks/contexts';
import { useTrackingTransaction } from '@/hooks/tracking';
import { useToast } from '@/hooks/utils';
import MoMoActive from '@/public/images/ewallet/active/momo.webp';
import ViettelActive from '@/public/images/ewallet/active/viettel.webp';
import ZaloPayActive from '@/public/images/ewallet/active/zalopay.webp';
import MoMoMaintain from '@/public/images/ewallet/maintain/momo.webp';
import ViettelMaintain from '@/public/images/ewallet/maintain/viettel.webp';
import ZaloMaintain from '@/public/images/ewallet/maintain/zalopay.webp';
import MoMoDefault from '@/public/images/ewallet/tab/momo.webp';
import ViettelPayDefault from '@/public/images/ewallet/tab/viettel.webp';
import ZaloPayDefault from '@/public/images/ewallet/tab/zalopay.webp';
import { depositEwallet } from '@/services/client';
import { formatTimeToUTC, getTimeUTC } from '@/utils/date';
import { createDepositEWalletSchema } from '@/validations/deposit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useDeposit } from './use-deposit';

export const useDepositEwallet = (user: UserData | undefined) => {
  const [isPending, startTransition] = useTransition();
  const [accounts, setAccounts] = useState<AccountOption[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string>();
  const [selectedProvider, setSelectedProvider] = useState<string>();
  const {
    ewalletGateStatus,
    ewalletCode,
    momoAccounts,
    viettelPayAccounts,
    limitDepositByGate,
  } = useEwalletContext();

  const limitDeposit: LimitDepositType = useMemo(() => {
    if (!selectedProvider || !selectedWallet) {
      return {
        min: MIN_AMOUNT_DEPOSIT,
        max: MAX_AMOUNT_DEPOSIT,
      };
    }
    const limitDepositByWallet =
      limitDepositByGate[selectedWallet as keyof typeof limitDepositByGate];
    switch (selectedProvider) {
      case EwalletTabEnum.TURBO:
        return limitDepositByWallet.gateTurbo;
      case EwalletTabEnum.SONIC:
        return limitDepositByWallet.gateSonic;
      case EwalletTabEnum.LUCKY:
        return limitDepositByWallet.gateLucky;
      default:
        return {
          min: MIN_AMOUNT_DEPOSIT,
          max: MAX_AMOUNT_DEPOSIT,
        };
    }
  }, [limitDepositByGate, selectedWallet, selectedProvider]);

  const t = useTranslations();
  const { trackDepositInitiated } = useTrackingTransaction();
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<DepositEwalletParamsType>({
    mode: 'onChange',
    resolver: zodResolver(
      createDepositEWalletSchema(t, limitDeposit.min, limitDeposit.max),
    ),
  });

  const checkMethodIsMaintain = (walletGates: any) => {
    return (
      !walletGates.gateTurbo || !walletGates.gateSonic || !walletGates.gateLucky
    );
  };

  const methodsTabs = [
    {
      label: EwalletMethodEnum.Momo,
      value: EwalletMethodEnum.Momo,
      iconImage: MoMoDefault,
      iconHover: MoMoDefault,
      iconMaintain: MoMoMaintain,
      iconActive: MoMoActive,
      customClass: 'momo !h-[54px]',
      isMaintain: !checkMethodIsMaintain(
        ewalletGateStatus?.[EwalletMethodEnum.Momo],
      ),
    },
    {
      label: EwalletMethodEnum.ZaloPay,
      value: EwalletMethodEnum.ZaloPay,
      iconImage: ZaloPayDefault,
      iconHover: ZaloPayDefault,
      iconMaintain: ZaloMaintain,
      iconActive: ZaloPayActive,
      customClass: 'zalopay !h-[54px]',
      isMaintain: !checkMethodIsMaintain(
        ewalletGateStatus?.[EwalletMethodEnum.ZaloPay],
      ),
    },
    {
      label: EwalletMethodEnum.ViettelPay,
      value: EwalletMethodEnum.ViettelPay,
      iconImage: ViettelPayDefault,
      iconHover: ViettelPayDefault,
      iconMaintain: ViettelMaintain,
      iconActive: ViettelActive,
      customClass: 'viettel !h-[54px]',
      isMaintain: !checkMethodIsMaintain(
        ewalletGateStatus?.[EwalletMethodEnum.ViettelPay],
      ),
    },
  ];

  const { field: walletField } = useController({
    name: 'wallet',
    control,
    defaultValue: methodsTabs.find((tab) => !tab.isMaintain)?.value as
      | 'ZALO_PAY'
      | 'VIETTEL_PAY'
      | 'MOMO',
  });

  const { field: amountField } = useController({
    name: 'amount',
    control,
  });

  const typeTabs = useMemo(() => {
    const method = walletField.value as EwalletMethodEnum;
    const typeTabs = [
      {
        label: EwalletTabEnum.TURBO,
        value: EwalletTabEnum.TURBO,
        isMaintain: ewalletGateStatus?.[method]?.gateTurbo,
      },
      {
        label: EwalletTabEnum.SONIC,
        value: EwalletTabEnum.SONIC,
        isMaintain: ewalletGateStatus?.[method]?.gateSonic,
      },
      {
        label: EwalletTabEnum.LUCKY,
        value: EwalletTabEnum.LUCKY,
        isMaintain: ewalletGateStatus?.[method]?.gateLucky,
      },
    ];
    return typeTabs;
  }, [walletField.value, ewalletGateStatus]);

  const { field: providerField } = useController({
    name: 'provider',
    control,
    defaultValue: typeTabs.find((tab) => !tab.isMaintain)?.value,
  });

  const payloadDepositEwallet = useMemo(() => {
    const refreshEwalletApi = `${ApiEndpointEnum.DepositFlexpay}?wallet=${walletField.value}&provider=${EWALLET_MAPPING_PROVIDER[providerField.value as keyof typeof EWALLET_MAPPING_PROVIDER]}`;
    return {
      method: `${DepositMethodEnum.EWALLET}_${walletField.value}_${providerField.value}`,
      refreshApi: refreshEwalletApi,
    };
  }, [walletField.value, providerField.value]);

  const {
    step,
    expiredTime,
    timeRenew,
    timeRedirect,
    transactionKey,
    transactionInfo,
    setStep,
    setTransactionInfo,
    renewTransactionInfo,
    startRenewTimer,
    startExpiredTimer,
    stopAllCountdown,
    setTimeRenew,
    setTimeRedirect,
    setExpiredTime,
  } = useDeposit({
    ...payloadDepositEwallet,
    user,
  });

  const { success, error } = useToast();

  useEffect(() => {
    if (providerField.value === EwalletTabEnum.LUCKY) {
      if (walletField.value === EwalletMethodEnum.Momo) {
        setAccounts(momoAccounts);
      } else if (walletField.value === EwalletMethodEnum.ViettelPay) {
        setAccounts(viettelPayAccounts);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerField.value, walletField.value]);

  const onSubmit = async (data: DepositEwalletParamsType) => {
    try {
      startTransition(async () => {
        const payload = {
          ...data,
          provider:
            EWALLET_MAPPING_PROVIDER[
              data.provider as keyof typeof EWALLET_MAPPING_PROVIDER
            ],
        };
        const response = await depositEwallet(payload);
        if (response.status !== RESPONSE_STATUS.OK) {
          error(response.message);
          return;
        }

        const cpInfo = response.data?.[0];

        if (cpInfo?.msg) {
          error(cpInfo?.msg ?? t('Toast.deposit.create_error'));
          return;
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
          method: 'ewallet',
        });
        startRenewTimer(cpInfo);
        startExpiredTimer(cpInfo);
        reset({ amount: undefined }, { keepValues: true, keepDirty: true });
        amountField.onChange('');
      });
    } catch (ex) {
      error((ex as ApiResponseError)?.message);
    }
  };

  useEffect(() => {
    setSelectedWallet(walletField.value);
  }, [walletField.value]);

  useEffect(() => {
    setSelectedProvider(providerField.value);
  }, [providerField.value]);

  useEffect(() => {
    reset({ amount: undefined }, { keepValues: true, keepDirty: true });
  }, [limitDeposit, control, reset]);

  useEffect(() => {
    if (step === StepDepositEnum.FORM) {
      reset({ amount: undefined }, { keepValues: true, keepDirty: true });
    }
  }, [step, reset]);

  return {
    typeTabs,
    methodsTabs,
    setStep,
    step,
    onSubmit,
    isPending,
    expiredTime,
    timeRenew,
    timeRedirect,
    transactionInfo,
    renewTransactionInfo,
    startRenewTimer,
    startExpiredTimer,
    setTransactionInfo,
    amountField,
    providerField,
    walletField,
    isSubmitting,
    isValid,
    register,
    control,
    handleSubmit,
    stopAllCountdown,
    transactionKey,
    ewalletCode,
    accounts,
    limitDeposit,
    setTimeRenew,
    setTimeRedirect,
    setExpiredTime,
  };
};
