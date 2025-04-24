'use client';
import type { UserData } from '@/types/auth';
import { Loading } from '@/components/Loading';
import { TransactionResult } from '@/components/TransactionResult';
import { DepositMethodEnum, StepDepositEnum } from '@/enums';
import { useDepositCodepay } from '@/hooks/deposit/use-codepay';
import clsx from 'clsx';
import FormCodepay from './elements/Form';

const CodePay = ({
  user,
  isMobile,
}: {
  user: UserData | undefined;
  isMobile: boolean;
}) => {
  const {
    transformFilterStatus,
    step,
    onSubmit,
    transactionInfo,
    expiredTime,
    timeRenew,
    timeRedirect,
    renewTransactionInfo,
    setStep,
    isPending,
    setTransactionInfo,
    setTimeRenew,
    setTimeRedirect,
    setExpiredTime,
  } = useDepositCodepay(user);

  return (
    <>
      <div
        className={clsx(
          'max-md:pb-0 md:p-4 2xl:p-6 deposit-form-container relative h-fit min-h-[320px] md:min-h-[460px]',
          {
            'bg-neutral': !isMobile,
          },
        )}
      >
        {(step === StepDepositEnum.PREPARE || isPending) && <Loading />}
        {step === StepDepositEnum.FORM && (
          <FormCodepay
            packages={transformFilterStatus}
            onSubmit={onSubmit}
            isPending={isPending}
          />
        )}
        {step === StepDepositEnum.RESULT && (
          <TransactionResult
            data={transactionInfo}
            expiredTime={expiredTime}
            timeRenew={timeRenew}
            renewTransactionInfo={renewTransactionInfo}
            setStep={setStep}
            timeRedirect={timeRedirect}
            method={DepositMethodEnum.CODEPAY}
            setTransactionInfo={setTransactionInfo}
            setTimeRenew={setTimeRenew}
            setTimeRedirect={setTimeRedirect}
            setExpiredTime={setExpiredTime}
          />
        )}
      </div>
    </>
  );
};

export { CodePay };
