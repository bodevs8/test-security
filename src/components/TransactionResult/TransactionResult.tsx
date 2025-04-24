import type { TransactionInfoType } from '@/types/deposit';
import type { KeyboardEventHandler } from 'react';
import { ClipboardCopy } from '@/components/ClipboardCopy';
import { CancelDepositModal } from '@/components/Modals/CancelDepositModal';
import { Button } from '@/components/ui/button';
import { DEFAULT_CURRENCY_UNIT } from '@/constant/app';
import { MINUTE_FORMAT } from '@/constant/constants';
import {
  EXPIRED_TIMER,
  FIELD_MAPPING,
  REDIRECT_TIMER,
  RENEW_TIMER,
} from '@/constant/deposit';
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  DepositMethodEnum,
  ModalIdEnum,
  StepDepositEnum,
} from '@/enums';
import { useDepositContext } from '@/hooks/contexts';
import { useModalStore } from '@/hooks/stores';
import { getBankImage } from '@/utils/bank';
import { downloadQRCode } from '@/utils/deposit';
import { formatNumberWithCommas } from '@/utils/format-currency';
import clsx from 'clsx';
import { formatDate } from 'date-fns';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMemo } from 'react';

type TransactionResultProps = {
  data: TransactionInfoType | null;
  expiredTime: number;
  timeRenew: number;
  timeRedirect: number;
  renewTransactionInfo: () => void;
  setStep: (step: StepDepositEnum) => void;
  setTransactionInfo: (info: TransactionInfoType | null) => void;
  method: DepositMethodEnum;
  setTimeRenew: (time: number) => void;
  setTimeRedirect: (time: number) => void;
  setExpiredTime: (time: number) => void;
};

const TransactionResult = ({
  data,
  expiredTime,
  timeRenew,
  timeRedirect,
  renewTransactionInfo,
  setTransactionInfo,
  setStep,
  method,
  setTimeRenew,
  setTimeRedirect,
  setExpiredTime,
}: TransactionResultProps) => {
  const t = useTranslations();
  const modalStore = useModalStore((state) => state);
  const MAIN_CREDIT_UNIT = DEFAULT_CURRENCY_UNIT || '';

  const { setAmount, setNoteDeposit } = useDepositContext();

  const depositInfo = useMemo(() => {
    const isFlexPay =
      method === DepositMethodEnum.FLEXPAY ||
      method === DepositMethodEnum.EWALLET;

    const getValue = (fieldKey: string) => {
      const field = FIELD_MAPPING[fieldKey];
      const key = isFlexPay ? field?.flexpay : field?.codepay;
      return data?.[key as keyof typeof data];
    };

    return {
      invoiceId: getValue('invoice'),
      qrCode: getValue('qr') ?? '',
      bankImage: getBankImage(getValue('bank')?.toString()?.toLowerCase()),
      accountNumber: getValue('account'),
      accountName: getValue('name'),
      note: getValue('note'),
    };
  }, [method, data]);

  // data
  const { invoiceId, qrCode, bankImage, accountNumber, accountName, note } =
    depositInfo;

  const isSuccess = useMemo(() => {
    return data?.deposited;
  }, [data?.deposited]);

  // handle
  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      downloadQRCode(qrCode as string);
    }
  };

  const createNewDeposit = () => {
    renewTransactionInfo();
    setTransactionInfo(null);
    setStep(StepDepositEnum.FORM);
    setAmount(0);
    setNoteDeposit('');
    setTimeRenew(RENEW_TIMER);
    setTimeRedirect(REDIRECT_TIMER);
    setExpiredTime(EXPIRED_TIMER);
  };

  const handleNewDeposit = () => {
    if (expiredTime > 0) {
      modalStore.openModal(ModalIdEnum.CancelDeposit);
    } else {
      createNewDeposit();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:gap-6 w-full">
        {method === DepositMethodEnum.CODEPAY && (
          <div className="flex flex-col gap-1 justify-center items-center w-full">
            <div className="whitespace-pre-wrap md:whitespace-nowrap text-dark-700 text-[18px] text-center font-bold leading-[140%] uppercase">
              {t('Pages.Account.deposit.codepay.form.header.title')}
            </div>
            <div className="whitespace-pre-wrap md:whitespace-nowrap text-dark-700 text-[18px] text-center font-bold leading-[140%] uppercase">
              {t('Pages.Account.deposit.codepay.form.header.content')}
            </div>
          </div>
        )}
        <div
          className={clsx(
            'border border-neutral-400 md:border-0 bg-secondary-light-200 p-3 md:p-0',
            method === DepositMethodEnum.EWALLET && '!bg-transparent',
          )}
        >
          <div className="flex flex-col bg-primary-light-50 p-6 rounded-[8px]">
            <div
              className={clsx(
                'flex md:items-center gap-2 md:gap-4 xl:gap-6',
                method !== DepositMethodEnum.CODEPAY && 'md:border-0',
              )}
            >
              <Image
                src={qrCode as string}
                alt="codepay-result"
                width={160}
                height={160}
                className={clsx(
                  '!w-[120px] !h-[120px] aspect-[120/120] md:!w-[160px] md:!h-[160px] md:aspect-[160/160] border border-secondary-light-400',
                  method !== DepositMethodEnum.CODEPAY &&
                    'border-r border-secondary-light-400',
                )}
              />
              <div
                className={clsx(
                  'flex flex-col gap-1 md:gap-2 justify-between md:py-[15px] !h-[120px] md:!h-[160px]',
                  method === DepositMethodEnum.EWALLET && '!justify-center',
                )}
              >
                {bankImage && (
                  <Image
                    src={bankImage ?? ''}
                    alt="codepay-result"
                    width={32}
                    height={100}
                    className="!h-[32px] !w-auto !object-contain !object-left"
                    priority
                    loading="eager"
                    unoptimized
                  />
                )}
                <ClipboardCopy
                  label=""
                  value={formatNumberWithCommas(
                    data?.amount ?? '',
                    MAIN_CREDIT_UNIT,
                  )}
                  className="!bg-transparent !p-0"
                  wrapperClassName="!gap-1"
                  valueClassName="!text-highlight max-[389px]:text-[18px] text-[20px] leading-[140%] font-bold"
                  containerClassName="!bg-transparent border-0 !px-0"
                  iconClassName="leading-[140%] !text-dark-100"
                />
                {!(
                  method === DepositMethodEnum.FLEXPAY ||
                  method === DepositMethodEnum.EWALLET
                ) && (
                  <div className="!text-dark-700 text-xs leading-[140%]">
                    <span>
                      {t('Pages.Account.deposit.codepay.result.code')}
                    </span>
                    &nbsp;
                    <span className="font-medium">#{invoiceId}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <i
                    className="icon-dowload text-[20px] text-dark-700 cursor-pointer"
                    onClick={() => downloadQRCode(qrCode as string)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    tabIndex={0}
                    role="button"
                  />
                  <span
                    className="text-dark-700 font-medium text-[14px] cursor-pointer"
                    onClick={() => downloadQRCode(qrCode as string)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    tabIndex={0}
                    role="button"
                  >
                    {t('Common.button.download')}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 h-[1px] w-full bg-neutral-300 md:hidden"></div>
            <div className="flex flex-col mt-4 md:mt-6">
              <div className="w-full flex justify-between items-center py-1">
                <span className="text-dark-700 text-[14px] leading-5 font-medium">
                  {t('Pages.Account.deposit.codepay.result.expired')}
                </span>
                {isSuccess && (
                  <span className="text-green-500 text-[14px] leading-[140%] font-medium">
                    {t('Common.button.deposit_success')}
                    <span>({timeRedirect}s)</span>
                  </span>
                )}
                {expiredTime > 0 && !isSuccess && (
                  <span className="text-green-500 text-[14px] leading-[140%] font-medium">
                    {formatDate(expiredTime * 1000, MINUTE_FORMAT)}
                  </span>
                )}
                {expiredTime <= 0 && !isSuccess && (
                  <span className="text-red-500 text-[14px] leading-[140%] font-medium">
                    {t('Pages.Account.deposit.codepay.result.expired_note')}
                  </span>
                )}
              </div>
              <div className="h-[1px] w-full bg-primary-light-400"></div>

              <div className="w-full flex justify-between items-center py-1">
                <span className="text-dark-700 text-[14px] leading-5 font-medium">
                  {t('Pages.Account.deposit.codepay.result.account_name')}
                </span>
                <ClipboardCopy
                  label=""
                  value={accountName?.toString() ?? ''}
                  className="!bg-transparent !p-0"
                  wrapperClassName="!gap-1"
                  valueClassName="!text-dark-700 text-[14px] leading-5 font-medium"
                  iconClassName="!text-dark-100"
                  containerClassName="!border-0 !px-0 md:px-0"
                />
              </div>
              <div className="h-[0.1px] w-full bg-primary-light-400"></div>

              <div className="w-full flex justify-between items-center py-1">
                <span className="text-dark-700 text-[14px] leading-5 font-medium">
                  {t('Pages.Account.deposit.codepay.result.account_number')}
                </span>
                <ClipboardCopy
                  label=""
                  value={accountNumber?.toString() ?? ''}
                  className="!bg-transparent !p-0"
                  wrapperClassName="!gap-1"
                  valueClassName="!text-dark-700 text-[14px] leading-5 font-medium"
                  iconClassName="!text-dark-100"
                  containerClassName="!border-0 md:px-0"
                />
              </div>
              <div className="h-[0.1px] w-full bg-primary-light-400" />

              <div className="w-full flex justify-between items-center py-1">
                <span className="text-dark-700 text-[14px] leading-5 font-medium">
                  {t('Pages.Account.deposit.codepay.result.note')}
                </span>
                <ClipboardCopy
                  label=""
                  value={note?.toString() ?? ''}
                  className="!bg-transparent !p-0"
                  wrapperClassName="!gap-1"
                  valueClassName={clsx(
                    'text-[14px] leading-5 font-medium !text-green-500',
                  )}
                  iconClassName="!text-dark-100"
                  containerClassName="!border-0 md:px-0"
                />
              </div>
            </div>
            <Button
              id="deposit-button"
              name="deposit-button"
              className="w-full !box-border max-w-[358px] mx-auto mt-6 deposit-form-btn !text-white !capitalize font-medium"
              size={ButtonSizeEnum.LG}
              variant={ButtonVariantsEnum.Default}
              type="submit"
              disabled={!isSuccess && timeRenew > 0}
              onClick={() => handleNewDeposit()}
            >
              {isSuccess && <>{t('Common.button.new_deposit')}</>}
              {!isSuccess && timeRenew > 0 && (
                <>
                  {t('Common.button.new_deposit')}
                  <span>({timeRenew}s)</span>
                </>
              )}
              {!isSuccess && timeRenew <= 0 && (
                <>{t('Common.button.new_deposit')}</>
              )}
            </Button>
          </div>
        </div>
      </div>
      <CancelDepositModal
        onCancel={createNewDeposit}
        ticket={invoiceId?.toString() ?? ''}
        method={method}
      />
    </>
  );
};

export { TransactionResult };
