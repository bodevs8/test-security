'use client';
import type { EwalletMethodEnum } from '@/enums/deposit';
import type { UserData } from '@/types/auth';
import { Loading } from '@/components/Loading';
import { TransactionProviderTab } from '@/components/TransactionProviderTab';
import { TransactionResult } from '@/components/TransactionResult';
import {
  DepositMethodEnum,
  EWalletTabEnum,
  EwalletTabEnum,
  StepDepositEnum,
} from '@/enums/deposit';
import { useDepositEwallet } from '@/hooks/deposit/use-ewallet';
import clsx from 'clsx';
import FormEwallet from './elements/Form';
import { SelectFrom } from './elements/SelectFrom';

type EWalletProps = {
  user: UserData | undefined;
  isMobile: boolean;
};

export const EWallet = ({ user, isMobile }: EWalletProps) => {
  const {
    step,
    onSubmit,
    isPending,
    providerField,
    walletField,
    amountField,
    typeTabs,
    methodsTabs,
    register,
    control,
    handleSubmit,
    isSubmitting,
    isValid,
    transactionInfo,
    expiredTime,
    timeRenew,
    renewTransactionInfo,
    setTransactionInfo,
    setStep,
    timeRedirect,
    ewalletCode,
    accounts,
    limitDeposit,
    setTimeRenew,
    setTimeRedirect,
    setExpiredTime,
  } = useDepositEwallet(user);

  const isLoading = step === StepDepositEnum.PREPARE || isPending;

  return (
    <div
      className={clsx(
        'min-h-[250px] !rounded-[0px] max-md:before:!hidden',
        !isMobile && 'deposit-ewallet',
        isMobile && '!bg-transparent',
      )}
    >
      <div className="w-full h-fit">
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <TransactionProviderTab
              tabs={methodsTabs}
              activeTab={walletField.value}
              onChange={walletField.onChange}
              wrapperClassName="!gap-0"
            />
            <div className="gap-2 px-3 py-6 md:px-6 md:py-4">
              <TransactionProviderTab
                tabs={typeTabs}
                activeTab={providerField.value}
                onChange={providerField.onChange}
                labelClassName="text-[14px] font-bold leading-[140%]"
                isMobile={isMobile}
                type={EWalletTabEnum.SECONDARY}
              />
            </div>
            {step === StepDepositEnum.FORM &&
              providerField.value !== EwalletTabEnum.LUCKY && (
                <FormEwallet
                  onSubmit={onSubmit}
                  provider={providerField.value}
                  wallet={walletField.value as EwalletMethodEnum}
                  onAmountChange={amountField.onChange}
                  register={register}
                  control={control}
                  amountField={amountField}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  limit={limitDeposit}
                  isPending={isPending}
                  isMobile={isMobile}
                />
              )}
            {providerField.value === EwalletTabEnum.LUCKY && (
              <SelectFrom
                ewalletCode={ewalletCode}
                accounts={accounts}
                walletName={walletField.value as EwalletMethodEnum}
                isMobile={isMobile}
              />
            )}
            {step === StepDepositEnum.RESULT && (
              <div className="px-3 md:px-6 pb-6">
                <TransactionResult
                  data={transactionInfo}
                  expiredTime={expiredTime}
                  timeRenew={timeRenew}
                  renewTransactionInfo={renewTransactionInfo}
                  setTransactionInfo={setTransactionInfo}
                  setStep={setStep}
                  timeRedirect={timeRedirect}
                  method={DepositMethodEnum.EWALLET}
                  setTimeRenew={setTimeRenew}
                  setTimeRedirect={setTimeRedirect}
                  setExpiredTime={setExpiredTime}
                />
              </div>
            )}

            <div className="border-b border-primary-light-200 md:border-none mx-3 mt-6 md:hidden"></div>
          </>
        )}
      </div>
    </div>
  );
};
