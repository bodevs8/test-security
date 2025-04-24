'use client';
import type { FlexpayTabEnum } from '@/enums';
import type { UserData } from '@/types/auth';
import { Loading } from '@/components/Loading';
import MaintainBankModal from '@/components/Modals/MaintainBankModal';
import { TransactionProviderTab } from '@/components/TransactionProviderTab';
import { TransactionResult } from '@/components/TransactionResult';
import { DepositMethodEnum, EWalletTabEnum, StepDepositEnum } from '@/enums';
import { useDepositFlexpay } from '@/hooks/deposit/use-flexpay';
import { getStorage } from '@/utils/storage';
import FormFlexpay from './elements/Form';

const FlexPay = ({ user }: { user: UserData | undefined }) => {
  const {
    step,
    onSubmit,
    transactionInfo,
    expiredTime,
    timeRenew,
    timeRedirect,
    renewTransactionInfo,
    setStep,
    isPending,
    tabs,
    activeTab,
    setActiveTab,
    limitDeposit,
    bankList,
    setTransactionInfo,
    stopAllCountdown,
    transactionKey,
    selectedBank,
    setTimeRenew,
    setTimeRedirect,
    setExpiredTime,
  } = useDepositFlexpay(user);

  const handleChangeTab = (value: string) => {
    setStep(StepDepositEnum.PREPARE);
    stopAllCountdown();
    if (getStorage(transactionKey)) {
      setTransactionInfo(JSON.parse(getStorage(transactionKey) ?? '{}'));
    } else {
      setStep(StepDepositEnum.FORM);
    }
    setActiveTab(value as FlexpayTabEnum);
  };

  return (
    <div className="py-2 md:p-4 2xl:p-6 deposit-form-container relative h-fit">
      <TransactionProviderTab
        tabs={tabs}
        activeTab={activeTab}
        onChange={handleChangeTab}
        labelClassName="text-[16px] leading-[140%]"
        type={EWalletTabEnum.SECONDARY}
      />
      <div className="mt-6 lg:mt-8 w-full relative min-h-[250px] md:min-h-[325px]">
        {(step === StepDepositEnum.PREPARE || isPending) && <Loading />}
        {step === StepDepositEnum.FORM && (
          <FormFlexpay
            onSubmit={onSubmit}
            bankList={bankList}
            limit={limitDeposit}
            isPending={isPending}
          />
        )}
        {step === StepDepositEnum.RESULT && (
          <TransactionResult
            data={transactionInfo}
            expiredTime={expiredTime}
            timeRenew={timeRenew}
            renewTransactionInfo={renewTransactionInfo}
            setTransactionInfo={setTransactionInfo}
            setStep={setStep}
            timeRedirect={timeRedirect}
            method={DepositMethodEnum.FLEXPAY}
            setTimeRenew={setTimeRenew}
            setTimeRedirect={setTimeRedirect}
            setExpiredTime={setExpiredTime}
          />
        )}
      </div>
      <MaintainBankModal
        oldBank={selectedBank}
        newBank={
          transactionInfo?.real_bank_name ||
          transactionInfo?.real_bank_code ||
          ''
        }
      />
      <div className="border-b border-primary-light-200 md:border-none mt-6 md:hidden"></div>
    </div>
  );
};

export { FlexPay };
