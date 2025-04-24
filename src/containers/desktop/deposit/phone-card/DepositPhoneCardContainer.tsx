'use client';

import type {
  DepositPhoneCardContainerProps,
  DepositPhoneCardFormValues,
  FormattedDataItem,
} from '@/types/deposit';
import { NumberInput } from '@/components/BaseInput';
import { AmountSelection, ProviderCard } from '@/components/PhoneCard';
import { Button } from '@/components/ui/button';
import { DEFAULT_CURRENCY_UNIT, RESPONSE_STATUS } from '@/constant/app';
import {
  AccountLinkEnum,
  ButtonSizeEnum,
  DepositPhoneCardSchemaEnum,
  PhoneCardStatusEnum,
} from '@/enums';
import { useTrackingTransaction } from '@/hooks/tracking';
import { useToast } from '@/hooks/utils';
import { phoneCardDepositRequest } from '@/services/client';
import { DepositPhoneCardSchema } from '@/validations/DepositPhoneCardSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

const defaultPhoneCards: FormattedDataItem[] = [];

const DepositPhoneCardContainer = ({
  providerCardList = defaultPhoneCards,
  isMobile = false,
}: DepositPhoneCardContainerProps) => {
  const t = useTranslations();
  const { success, error } = useToast();
  const router = useRouter();
  const { trackDepositInitiated } = useTrackingTransaction();
  const [isPending, startTransition] = useTransition();
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<DepositPhoneCardFormValues>({
    mode: 'onChange',
    resolver: zodResolver(DepositPhoneCardSchema(t)),
    defaultValues: {
      card_code: '',
      card_serial: '',
    },
  });

  // init state card list
  const [selectedProvider, setSelectedProvider] = useState<string | null>(
    providerCardList.find(
      (item) => item.status !== PhoneCardStatusEnum.InActive,
    )?.key ?? null,
  );

  // init state amount
  const [selectedAmount, setSelectedAmount] = useState<number | null>(
    providerCardList[0]?.value[0]?.number ?? null,
  );

  // init state card code
  const [cardCode, setCardCode] = useState('');

  // init state card serial
  const [cardSerial, setCardSerial] = useState('');

  const onSubmit = async (data: DepositPhoneCardFormValues) => {
    console.warn({
      ...data,
      amount: selectedAmount,
      provider: selectedProvider,
    });

    const payload = {
      card_code: data.card_code,
      card_serial: data.card_serial,
      card_amount: selectedAmount,
      to_telcom_code: selectedProvider,
      card_status: 1,
    };

    startTransition(async () => {
      if (submitSuccess) return;
      const res = await phoneCardDepositRequest(payload);
      const { status, message } = res;
      if (status === RESPONSE_STATUS.SHOW_MESSAGE) {
        error(message || t('Pages.Account.deposit.phone_card.error'));
      } else if (status === RESPONSE_STATUS.OK) {
        success(t('Pages.Account.deposit.phone_card.success'));
        setSubmitSuccess(true);
        trackDepositInitiated({
          amount: selectedAmount ?? 0,
          currency: DEFAULT_CURRENCY_UNIT,
          method: 'phoneCard',
        });
        setTimeout(() => {
          router.push(`${AccountLinkEnum.TransactionHistory}`);
        }, 1000);
      } else {
        error(t('Pages.Account.deposit.phone_card.error'));
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

  const handlePasteCardCode = (text: string) => {
    setCardCode(text.replace(/\D/g, ''));
  };

  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider);
    const providerValue = providerCardList.find(
      (item) => item.key === provider,
    );
    setSelectedAmount(providerValue?.value[0]?.number ?? null);
  };

  return (
    <div className="md:pt-6 md:pl-6 md:pr-6 border-b-[1px] border-primary-light-150 md:border md:border-primary-light-200 rounded-[8px]">
      <form
        className="space-y-6 md:space-y-8 form-deposit"
        id="depositCard"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="font-medium">
          <div className="mb-2 text-xs leading-[18px] text-dark-700">
            <span className="font-medium text-[14px] leading-[140%] capitalize">
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
          selectedAmount={selectedAmount}
          handleAmountSelect={handleAmountSelect}
        />
        <div className="text-gray-700 font-medium">
          <NumberInput
            type="tel"
            {...register('card_code')}
            pasteText
            label={t('Pages.Account.deposit.phone_card.label_card_code')}
            labelClassname="font-medium text-[14px] leading-[140%]"
            name="card_code"
            value={cardCode}
            control={control}
            maxLength={DepositPhoneCardSchemaEnum.MaxLengthNumber}
            onChange={(e) => setCardCode(e.target.value)}
            onPasteText={handlePasteCardCode}
            isPhoneInput
            placeholder={t(
              'Pages.Account.deposit.phone_card.placeholder_card_code',
            )}
            className="pb-6 font-medium text-[14px] leading-[140%]"
            inputClassName="pr-[56px] truncate overflow-hidden whitespace-nowrap !bg-primary-light-50 md:!bg-primary-light-100"
          />

          <NumberInput
            {...register('card_serial')}
            label={t('Pages.Account.deposit.phone_card.label_card_serial')}
            labelClassname="font-medium text-[14px] leading-[140%]"
            name="card_serial"
            value={cardSerial}
            control={control}
            type="tel"
            pasteText
            maxLength={DepositPhoneCardSchemaEnum.MaxLengthNumber}
            onChange={(e) => setCardSerial(e.target.value)}
            onPasteText={handlePasteCardCode}
            isPhoneInput
            placeholder={t(
              'Pages.Account.deposit.phone_card.placeholder_card_serial',
            )}
            className={clsx('mb-6', isMobile && '!mb-0')}
            inputClassName="pr-[56px] truncate overflow-hidden whitespace-nowrap !bg-primary-light-50 md:!bg-primary-light-100"
          />
        </div>
        <div className="flex items-center justify-center action-btn md:pb-6 md:-mt-2">
          <Button
            id="card-deposit-phonecard-button"
            name="deposit-phonecard-button"
            className="w-full max-w-[358px] !box-border font-medium leading-[22.4px] mx-auto deposit-form-btn disabled:!opacity-100 !text-white !capitalize"
            size={ButtonSizeEnum.LG}
            type="submit"
            disabled={!isDirty || !isValid || isPending || submitSuccess}
            isLoading={isSubmitting || isPending}
          >
            {t('Common.button.deposit')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export { DepositPhoneCardContainer };
