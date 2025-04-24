import type {
  DepositHookType,
  TimerRefsType,
  TransactionInfoType,
} from '@/types/deposit';
import { EXPIRED_TIMER, REDIRECT_TIMER, RENEW_TIMER } from '@/constant/deposit';
import {
  AccountLinkEnum,
  DepositMethodEnum,
  ResponseStatusEnum,
  StepDepositEnum,
} from '@/enums';
import { useDepositContext } from '@/hooks/contexts';
import { useDepositTransaction } from '@/hooks/useQueries/use-deposit-transaction';
import { useToast } from '@/hooks/utils';
import {
  diffSecondsUTC,
  formatTimeToUTC,
  getTimeUTC,
  secondsUTC,
} from '@/utils/date';
import { getStorage, removeStorage } from '@/utils/storage';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

export const useDeposit = ({ method, refreshApi, user }: DepositHookType) => {
  const { setAmount, setNoteDeposit } = useDepositContext();
  const router = useRouter();
  const { error } = useToast();
  const t = useTranslations();
  const [step, setStep] = useState<number>(StepDepositEnum.PREPARE);
  const [expiredTime, setExpiredTime] = useState<number>(EXPIRED_TIMER);
  const [timeRenew, setTimeRenew] = useState<number>(RENEW_TIMER);
  const [timeRedirect, setTimeRedirect] = useState<number>(REDIRECT_TIMER);
  const [transactionInfo, setTransactionInfo] =
    useState<TransactionInfoType | null>(null);
  const mounted = useRef(false);

  const isMonitoring = useRef(false);
  const timerRefs: TimerRefsType = {
    refresh: useRef(null),
    expired: useRef(null),
    renew: useRef(null),
    redirect: useRef(null),
  };

  const transactionKey = useMemo(() => {
    return `${method}Info_${user?.id}`;
  }, [user?.id, method]);

  const { data: transactionResponse, isError } = useDepositTransaction(
    refreshApi,
    transactionKey,
  );

  const stopAllCountdown = (deposited?: boolean) => {
    if (timerRefs.refresh.current) {
      clearInterval(timerRefs.refresh.current);
    }
    if (timerRefs.expired.current) {
      clearInterval(timerRefs.expired.current);
    }
    if (timerRefs.renew.current) {
      clearInterval(timerRefs.renew.current);
    }
    if (timerRefs.redirect.current && !deposited) {
      clearInterval(timerRefs.redirect.current);
    }
    isMonitoring.current = false;
  };

  const renewTransactionInfo = (deposited?: boolean) => {
    stopAllCountdown(deposited);
    removeStorage(transactionKey);
    isMonitoring.current = false;
    if (step !== StepDepositEnum.RESULT) {
      setTransactionInfo(null);
      setAmount(0);
      setNoteDeposit('');
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      if (getStorage(transactionKey)) {
        setTransactionInfo(JSON.parse(getStorage(transactionKey) ?? '{}'));
      } else {
        setStep(StepDepositEnum.FORM);
      }
      mounted.current = true;
    }
    return () => {
      stopAllCountdown();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!transactionResponse || !getStorage(transactionKey)) return;

    if (
      transactionResponse.status !== ResponseStatusEnum.Ok ||
      !transactionResponse.data
    ) {
      renewTransactionInfo();
      setStep(StepDepositEnum.FORM);
      return;
    }

    let cpInfo = transactionResponse.data?.[0] ?? {};
    const storedTransactionInfo = JSON.parse(
      getStorage(transactionKey) ?? '{}',
    );
    if (Object.keys(cpInfo).length === 0) {
      cpInfo = storedTransactionInfo;
    }

    if (storedTransactionInfo?.created_at_utc) {
      cpInfo.created_at_utc = storedTransactionInfo.created_at_utc;
    } else if (!cpInfo?.created_at_utc) {
      cpInfo.created_at_utc = getTimeUTC();
    }

    if (method === DepositMethodEnum.FLEXPAY) {
      cpInfo.amount = Number(cpInfo.amount);
      cpInfo.expired = formatTimeToUTC(Number(cpInfo.expired));
    }

    const qr_code =
      storedTransactionInfo?.qrCode ?? storedTransactionInfo?.qr_code ?? '';
    if (!cpInfo.qrCode && !cpInfo.qr_code) {
      cpInfo.qrCode = qr_code;
      cpInfo.qr_code = qr_code;
    }

    if (method === DepositMethodEnum.CODEPAY) {
      setAmount(cpInfo?.amount ?? 0);
      setNoteDeposit(cpInfo?.code ?? '');
    }

    setTransactionInfo((prevState) =>
      cpInfo
        ? {
            ...prevState,
            ...cpInfo,
          }
        : null,
    );

    if (cpInfo?.deposited) {
      renewTransactionInfo(true);
      startRedirectTimer();
      isMonitoring.current = false;
    }

    setStep(StepDepositEnum.RESULT);
    if (!isMonitoring.current) {
      startExpiredTimer(cpInfo);
      startRenewTimer(cpInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionResponse, method, transactionKey]);

  useEffect(() => {
    if (isError) {
      error(transactionResponse?.message ?? t('Common.message.error'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  function startExpiredTimer(transactionInfo: TransactionInfoType) {
    if (!transactionInfo) {
      setExpiredTime(0);
      stopAllCountdown();
      return;
    }

    if (timerRefs.expired.current) {
      clearInterval(timerRefs.expired.current);
    }

    const updateExpiredTime = () => {
      const seconds = diffSecondsUTC(
        transactionInfo?.expired_at_utc ?? transactionInfo?.expired ?? '',
      );

      if (seconds <= 0) {
        setExpiredTime(0);
        stopAllCountdown();
        resetTransaction();
        return;
      }
      setExpiredTime(seconds);
    };

    // Update immediately
    updateExpiredTime();

    // Then update every second
    timerRefs.expired.current = setInterval(updateExpiredTime, 1000);
  }

  function resetTransaction() {
    setTimeout(() => {
      stopAllCountdown();
      removeStorage(transactionKey);
      window?.location?.reload();
    }, 4000);
  }

  function startRenewTimer(transactionInfo: TransactionInfoType) {
    if (timerRefs.renew.current) {
      clearInterval(timerRefs.renew.current);
    }
    if (!transactionInfo) {
      setTimeRenew(0);
      return;
    }

    const updateRenewTime = () => {
      const seconds = secondsUTC(
        transactionInfo?.created_at_utc ?? transactionInfo?.created_at,
      );
      const times = RENEW_TIMER - seconds;

      if (times <= 0) {
        setTimeRenew(0);
        if (timerRefs.renew.current) {
          clearInterval(timerRefs.renew.current);
        }
        return;
      }
      setTimeRenew(times);
    };

    // Update immediately
    updateRenewTime();

    // Then update every second
    timerRefs.renew.current = setInterval(updateRenewTime, 1000);
  }

  function startRedirectTimer() {
    if (timerRefs.redirect.current) {
      clearInterval(timerRefs.redirect.current);
    }

    // Set initial state before starting interval
    setTimeRedirect(REDIRECT_TIMER);

    timerRefs.redirect.current = setInterval(() => {
      setTimeRedirect((prevTime) => {
        if (prevTime <= 1) {
          if (timerRefs.redirect.current) {
            clearInterval(timerRefs.redirect.current);
          }
          stopAllCountdown(true);
          // Use setTimeout to defer the navigation to the next tick
          setTimeout(() => {
            router.push(AccountLinkEnum.TransactionHistory);
          }, 0);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === transactionKey && event.newValue) {
        try {
          const parsedInfo = JSON.parse(event.newValue);
          setTransactionInfo(parsedInfo);
          setStep(StepDepositEnum.RESULT);
          startRenewTimer(parsedInfo);
          startExpiredTimer(parsedInfo);
          setAmount(parsedInfo?.amount ?? 0);
          setNoteDeposit(parsedInfo?.content ?? '');
        } catch (error) {
          console.error('Failed to parse transaction info:', error);
        }
      } else if (
        event.key === transactionKey &&
        event.newValue === null &&
        step === StepDepositEnum.RESULT
      ) {
        renewTransactionInfo();
        setAmount(0);
        setNoteDeposit('');
        setStep(StepDepositEnum.FORM);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    startExpiredTimer,
    startRenewTimer,
    setStep,
    setTransactionInfo,
    transactionKey,
  ]);

  useEffect(() => {
    if (step !== StepDepositEnum.PREPARE) {
      window?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [step]);

  return {
    step,
    setStep,
    mounted,
    expiredTime,
    timeRenew,
    timeRedirect,
    transactionInfo,
    setTransactionInfo,
    transactionKey,
    startExpiredTimer,
    startRenewTimer,
    startRedirectTimer,
    stopAllCountdown,
    renewTransactionInfo,
    setTimeRenew,
    setTimeRedirect,
    setExpiredTime,
  };
};
