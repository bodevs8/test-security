'use client';

import type { ApiResponseError } from '@/types/service';
import type { AddBankSchemaType } from '@/validations/AddBankSchema';
import { ModalIdEnum, ResponseStatusEnum } from '@/enums';
import { useDepositContext } from '@/hooks/contexts';
import { useModalStore, useUserStore } from '@/hooks/stores';
import { useTrackingProfile } from '@/hooks/tracking';
import { useToast } from '@/hooks/utils';
import { createUserBank } from '@/services/client';
import { addBankSchema } from '@/validations/AddBankSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useUserBanks } from './use-user-bank';

export const useAddBankForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const { indexDeposit } = useDepositContext();

  const modalStore = useModalStore((state) => state);
  const { error, success } = useToast();
  const { trackProfileCompletion } = useTrackingProfile();
  const currentUser = useUserStore((state) => state.user);
  const { refetch: refetchUserBanks, userBanks } = useUserBanks();

  const prevUserBanksLength = useRef(userBanks?.length ?? 0);

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(addBankSchema(t, userBanks?.length > 0)),
    defaultValues: {
      bankCode: '',
      bankAccountName: userBanks?.[0]?.bank_account_name ?? '',
      bankAccountNumber: '',
    },
  });

  const { field: bankAccountNameField } = useController({
    name: 'bankAccountName',
    control: form.control,
  });

  useEffect(() => {
    if (userBanks?.length > 0) {
      bankAccountNameField?.onChange(userBanks?.[0]?.bank_account_name ?? '');
    }
  }, [userBanks, bankAccountNameField]);

  const accountBankName = useMemo(() => {
    return userBanks?.[0]?.bank_account_name ?? '';
  }, [userBanks]);

  const mappedBanks = useMemo(
    () =>
      indexDeposit?.withdrawBanks
        ?.filter(
          (bank) =>
            !userBanks?.some(
              (userBank) => userBank.bank_code === bank.bank_code,
            ),
        )
        ?.map((bank) => ({
          value: bank.bank_code,
          label: bank.bank_name,
        })),
    [indexDeposit?.withdrawBanks, userBanks],
  );

  const handleCloseModal = useCallback(() => {
    form.reset({
      bankCode: '',
      bankAccountName: userBanks?.[0]?.bank_account_name ?? '',
      bankAccountNumber: '',
    });
    modalStore.closeModal(ModalIdEnum.AddBank);
  }, [form, userBanks, modalStore]);

  useEffect(() => {
    if (userBanks?.length > prevUserBanksLength.current) {
      handleCloseModal();
      prevUserBanksLength.current = userBanks.length;
    }
  }, [userBanks, modalStore, handleCloseModal]);

  const handleRefreshPage = async () => {
    await refetchUserBanks();
    router.refresh();
    handleCloseModal();
  };

  const handleSubmit = async (data: AddBankSchemaType) => {
    try {
      const response = await createUserBank({
        bank_account_no: data.bankAccountNumber,
        bank_code: data.bankCode,
        bank_account_name: data.bankAccountName,
      });

      if (response.status === ResponseStatusEnum.Ok) {
        success(t('Modals.AddBankModal.success'));
        trackProfileCompletion({
          hasUserBanks: true,
          hasEmail: !!currentUser?.is_verify_email,
        });
        handleRefreshPage();
      } else {
        error(response.message || t('Modals.AddBankModal.error'));
        refetchUserBanks();
      }
    } catch (ex: any) {
      error(
        (ex as ApiResponseError)?.message || t('Modals.AddBankModal.error'),
      );
      handleRefreshPage();
    }
  };

  return {
    form,
    mappedBanks,
    accountBankName,
    handleSubmit,
    handleCloseModal,
  };
};
