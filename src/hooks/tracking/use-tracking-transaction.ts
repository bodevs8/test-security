import type { TrackingTransactionParams } from '@/types/tracking';
import { TrackingEventNameEnum } from '@/enums';
import { useUserStore } from '@/hooks/stores';
import { useTrackingEvent } from './use-tracking-event';

const valueToNumber = (str: string | number, multiplier = 1): number => {
  if (typeof str === 'number') {
    return str * multiplier;
  }

  if (typeof str === 'string' && str.trim() !== '') {
    const numericValue = Number(str.replace(/[^\d.-]/g, ''));
    return Number.isNaN(numericValue) ? 0 : numericValue * multiplier;
  }

  return 0;
};

export const useTrackingTransaction = () => {
  const { trackEvent } = useTrackingEvent();
  const getUserId = useUserStore((state) => state.getUserId);

  const trackDepositInitiated = (values: TrackingTransactionParams) => {
    const userId = getUserId();
    if (userId) {
      const params = {
        user_id: userId,
        ...(values.amount
          ? { deposit_amount: valueToNumber(values.amount, 1) }
          : {}),
        currency: values.currency,
        payment_method: values.method,
      };
      trackEvent(TrackingEventNameEnum.DepositInitiated, params);
    }
  };

  const trackWithdrawalRequested = (values: TrackingTransactionParams) => {
    const userId = getUserId();
    if (userId) {
      const params = {
        user_id: userId,
        ...(values.amount
          ? { withdrawal_amount: valueToNumber(values.amount, 1) }
          : {}),
        currency: values.currency,
        payment_method: values.method,
      };
      trackEvent(TrackingEventNameEnum.WithdrawalRequested, params);
    }
  };

  return {
    trackDepositInitiated,
    trackWithdrawalRequested,
  };
};
