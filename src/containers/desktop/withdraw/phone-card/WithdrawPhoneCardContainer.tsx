'use client';

import type { FormattedDataItem } from '@/types/deposit';
import type { ApiResponseError } from '@/types/service';
import type {
  WithdrawPhoneCardContainerProps,
  WithdrawPhoneCardFormRequest,
  WithdrawPhoneCardFormValues,
} from '@/types/withdraw';
import { setTimeout } from 'timers';
import { NumberInput } from '@/components/BaseInput';
import { AmountSelection, ProviderCard } from '@/components/PhoneCard';
import { Button } from '@/components/ui/button';
import {
  DEFAULT_CURRENCY_UNIT,
  DEFAULT_INPUT_MAX_LENGTH,
} from '@/constant/app';
import {
  AccountLinkEnum,
  ButtonSizeEnum,
  ButtonVariantsEnum,
  ResponseStatusEnum,
} from '@/enums';
import { useRefresh } from '@/hooks/account';
import { useUserStore } from '@/hooks/stores';
import { useTrackingTransaction } from '@/hooks/tracking';
import { useToast } from '@/hooks/utils';
import { phoneCardWithdrawRequest } from '@/services/client/withdraw/phone-card';
import { WithdrawPhoneCardSchema } from '@/validations/withdraw';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

const defaultPhoneCards: FormattedDataItem[] = [];

const WithdrawPhoneCardContainer = ({
  providerCardList = defaultPhoneCards,
  isMobile = false,
}: WithdrawPhoneCardContainerProps) => {
  const t = useTranslations();
  const router = useRouter();
  const { success, error } = useToast();
  const userStore = useUserStore((state) => state.getUser());
  const { trackWithdrawalRequested } = useTrackingTransaction();
  const [isPending, startTransition] = useTransition();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // init state amount
  const [selectedAmount, setSelectedAmount] = useState<number | null>(
    providerCardList[0]?.value[0]?.number ?? null,
  );
  const { refetchUser, userData } = useRefresh();

  const user = useMemo(() => userData || userStore, [userData, userStore]);

  // init state card list
  const [selectedProvider, setSelectedProvider] = useState<string | null>(
    providerCardList[0]?.key ?? null,
  );

  // init state card code
  const [numberCard, setNumberCard] = useState<number | null>(null);

  const hasLoggedValidError = useRef(false);

  const {
    handleSubmit,
    control,
    register,
    trigger,
    reset,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = useForm<WithdrawPhoneCardFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(WithdrawPhoneCardSchema(t, user, selectedAmount)),
  });

  useEffect(() => {
    if (numberCard) {
      trigger();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAmount, numberCard]);

  useEffect(() => {
    if (errors.number_card && !hasLoggedValidError.current) {
      hasLoggedValidError.current = true;
      trigger();
    }

    if (!errors.number_card) {
      hasLoggedValidError.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.number_card]);

  const handleChangeNumberCard = (value: number) => {
    if (value > 0) {
      setNumberCard(value);
      trigger();
    }
  };

  // init state card serial
  const onSubmit = async (data: WithdrawPhoneCardFormValues) => {
    const payload = {
      card_number: data.number_card,
      card_amount_unit: Number(selectedAmount),
      to_telcom_code: selectedProvider,
    };
    startTransition(async () => {
      if (submitSuccess) return;
      try {
        const res = await phoneCardWithdrawRequest(
          payload as WithdrawPhoneCardFormRequest,
        );
        const { status, message } = res;
        if (
          status === ResponseStatusEnum.ShowMessage ||
          status === ResponseStatusEnum.FailValidate ||
          status === ResponseStatusEnum.FailedValidate
        ) {
          error(message || t('Pages.Account.deposit.phone_card.error'));
          await refetchUser();
          trigger();
          reset();
        } else if (status === ResponseStatusEnum.Ok) {
          success(t('Pages.Account.withdraw.phone_card.success'));
          setSubmitSuccess(true);
          trackWithdrawalRequested({
            amount: Number(selectedAmount),
            currency: DEFAULT_CURRENCY_UNIT,
            method: 'phoneCard',
          });
          reset();
          refetchUser();
          setTimeout(() => {
            router.push(AccountLinkEnum.TransactionHistory);
          }, 1000);
        }
      } catch (ex) {
        error((ex as ApiResponseError)?.message);
      }
    });
  };

  const amounts = useMemo(() => {
    const selectedProviderData = providerCardList.find(
      (provider) => provider.key === selectedProvider,
    );

    if (selectedProviderData) {
      return (
        selectedProviderData.value?.map((v) => ({
          number: v.number,
          display: v.display,
        })) ?? []
      );
    }
    return [];
  }, [selectedProvider, providerCardList]);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleActionQuantity = (numberCard: number) => {
    setNumberCard(numberCard || null);
  };

  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider);
    const providerValue = providerCardList.find(
      (item) => item.key === provider,
    );
    setSelectedAmount(providerValue?.value[0]?.number ?? null);
    if (providerValue?.value[0]?.number && numberCard) {
      trigger();
    }
  };

  return (
    <div
      className={clsx(
        'p-6 bg-primary-light-0',
        !isMobile && 'deposit-form-container',
        isMobile && '!p-0',
      )}
    >
      <form id="depositCard" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-2 text-secondary-blue-400">
            <span className="text-[14px] leading-[140%] capitalize text-dark-700 font-medium">
              {t('Pages.Account.deposit.phone_card.title')}
            </span>
          </div>
          <div className="flex gap-2">
            {providerCardList.map((provider) => (
              <ProviderCard
                key={provider.key}
                provider={provider}
                selectedProvider={selectedProvider}
                handleProviderSelect={handleProviderSelect}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        <AmountSelection
          amounts={amounts}
          selectedAmount={Number(selectedAmount)}
          handleAmountSelect={handleAmountSelect}
          className="mt-6"
        />
        <div className="relative">
          <NumberInput
            type="tel"
            {...register('number_card')}
            label={t('Pages.Account.withdraw.phone_card.card_number_text')}
            name="number_card"
            value={numberCard ?? ''}
            control={control}
            onChange={(e) => handleChangeNumberCard(Number(e.target.value))}
            isOperator
            onActionQuantity={handleActionQuantity}
            maxLength={DEFAULT_INPUT_MAX_LENGTH}
            className={clsx('py-6', {
              '!pb-0': isMobile,
            })}
            placeholder={t('Pages.Account.withdraw.phone_card.placeholder')}
            inputClassName="!pr-[85px] !text-ellipsis !overflow-hidden placeholder:text-dark-700 placeholder:font-normal !bg-primary-light-50"
          />
        </div>
        <div className="flex items-center justify-center action-btn">
          <Button
            id="card-deposit-phonecard-button"
            name="deposit-phonecard-button"
            className="w-full max-w-[358px] !box-border mx-auto deposit-form-btn"
            size={ButtonSizeEnum.LG}
            variant={ButtonVariantsEnum.Default}
            type="submit"
            disabled={!isDirty || !isValid || isPending || submitSuccess}
            isLoading={isSubmitting || isPending}
          >
            {t('Common.button.withdraw')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export { WithdrawPhoneCardContainer };
