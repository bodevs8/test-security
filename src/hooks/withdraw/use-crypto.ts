'use client';

import type { WithdrawCryptoType } from '@/types/withdraw';
import type { WithdrawCryptoParams } from '@/validations/withdraw';

import { AccountLinkEnum, ModalIdEnum, ResponseStatusEnum } from '@/enums';
import { useWithdrawContext } from '@/hooks/contexts';
import { useModalStore } from '@/hooks/stores';
import { useTrackingTransaction } from '@/hooks/tracking';
import { useToast } from '@/hooks/utils';
import { getCryptoList, submitWithdrawCrypto } from '@/services/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';

export const useCrypto = () => {
  const modalStore = useModalStore((state) => state);
  const router = useRouter();
  const t = useTranslations();
  const { success, error } = useToast();
  const { cryptoList, selectedCrypto, setSelectedCrypto, setCryptoList } =
    useWithdrawContext();
  const { trackWithdrawalRequested } = useTrackingTransaction();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSelectedCrypto(cryptoList?.[0] || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptoList]);

  const onSubmit = async (data: WithdrawCryptoParams, reset: () => void) => {
    startTransition(async () => {
      try {
        const response = await submitWithdrawCrypto({
          amount_withdraw: data.withdrawAmount * 1000,
          wallet_address: data.walletAddress,
          phone: data.phoneVerify,
          currency: selectedCrypto?.currency || '',
          ex_rate: selectedCrypto?.price || 0,
          network: selectedCrypto?.network[0] || '',
        });
        if (response.status === ResponseStatusEnum.ChangeExRate) {
          const cryptoList = await getCryptoList();
          setCryptoList(cryptoList);
          const newCrypto = cryptoList.find(
            (el: WithdrawCryptoType) =>
              el.currency === selectedCrypto?.currency,
          );
          setSelectedCrypto(newCrypto || null);
          modalStore.openModal(ModalIdEnum.WithdrawCryptoChangeRate);
          reset()
          return;
        }
        if (
          response.status === ResponseStatusEnum.ShowMessage ||
          response.status === ResponseStatusEnum.FailValidate ||
          response.status === ResponseStatusEnum.FailedValidate
        ) {
          error(response.message);
          return;
        }
        if (response.status === ResponseStatusEnum.Ok) {
          success(t('Pages.Account.withdraw.crypto.create_withdraw_success'));
          trackWithdrawalRequested({
            amount: data.withdrawAmount * 1000,
            currency: selectedCrypto?.currency || '',
            method: 'crypto',
          });
          reset();
          setTimeout(() => {
            router.push(AccountLinkEnum.TransactionHistory);
          }, 3000);
        } else {
          error(response.message || t('Common.message.error'));
        }
      } catch (e) {
        console.error(e);
        error(t('Common.message.error'));
      }
    });
  };

  return {
    onSubmit,
    isPending,
  };
};
