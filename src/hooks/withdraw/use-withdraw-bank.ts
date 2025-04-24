import { setTimeout } from 'timers';
import { AccountLinkEnum, ResponseStatusEnum } from '@/enums';
import { useRefresh } from '@/hooks/account';
import { useTrackingTransaction } from '@/hooks/tracking';
import { useToast } from '@/hooks/utils';
import { withdrawBank } from '@/services/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export const useWithdrawBank = (reset: () => void) => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();
  const router = useRouter();
  const { success, error } = useToast();
  const { trackWithdrawalRequested } = useTrackingTransaction();
  const { refetchUser } = useRefresh();

  const onSubmitWithdrawBank = async (data: any) => {
    const payload = {
      ...data,
      amount_withdraw: data.amount_withdraw / 1000,
    };
    try {
      startTransition(async () => {
        const { status, message } = await withdrawBank(payload);
        if (
          status === ResponseStatusEnum.ShowMessage ||
          status === ResponseStatusEnum.FailValidate
        ) {
          error(message ?? t('Toast.withdraw.error'));
        } else if (status === ResponseStatusEnum.Ok) {
          success(t('Toast.withdraw.success'));
          trackWithdrawalRequested({
            amount: data.amount_withdraw,
            currency: 'VND',
            method: 'bank',
          });
          refetchUser();
          reset();
          setTimeout(() => {
            router.push(AccountLinkEnum.TransactionHistory);
          }, 3000);
        } else {
          error(t('Toast.common.error'));
        }
      });
    } catch (ex: any) {
      const errMessage = ex?.response?.data?.message || ex?.message;
      error(errMessage);
    }
  };

  return { onSubmitWithdrawBank, isPending };
};
