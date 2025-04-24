'use client';

import type { IndexDepositBankingType } from '@/types/deposit';
import type { ReactNode } from 'react';
import { STATUS_DEPOSIT_AVAILABLE } from '@/constant/app';
import { MAX_AMOUNT_DEPOSIT, MIN_AMOUNT_DEPOSIT } from '@/constant/deposit';
import { FlexpayContext } from '@/contexts/transaction';
import { FlexpayTabEnum } from '@/enums';
import { useDepositContext } from '@/hooks/contexts';
import { getDepositLimits } from '@/utils/deposit';
import { useMemo, useState } from 'react';

export const FlexpayProvider = ({ children }: { children: ReactNode }) => {
  const { indexDeposit } = useDepositContext();
  const [amount, setAmount] = useState<number>(MIN_AMOUNT_DEPOSIT);
  const [noteDeposit, setNoteDeposit] = useState<string>('');

  const getBankingInfo = (banking: IndexDepositBankingType | undefined) =>
    Object.values(banking || {}).length ? Object.values(banking || {}) : [];

  const flexpaySonic = useMemo(
    () => getBankingInfo(indexDeposit?.ewallet?.banking),
    [indexDeposit?.ewallet],
  );

  const flexpayTurbo = useMemo(
    () => getBankingInfo(indexDeposit?.ewallet?.banking2),
    [indexDeposit?.ewallet],
  );

  const flexpaySonicStatus =
    flexpaySonic.length &&
    flexpaySonic.some((e) => e.status === STATUS_DEPOSIT_AVAILABLE);
  const flexpayTurboStatus =
    flexpayTurbo.length &&
    flexpayTurbo.some((e) => e.status === STATUS_DEPOSIT_AVAILABLE);
  const flexpayStatus = flexpaySonicStatus || flexpayTurboStatus;

  const limitDepositFlexpaySonic = useMemo(
    () =>
      getDepositLimits(flexpaySonic, MIN_AMOUNT_DEPOSIT, MAX_AMOUNT_DEPOSIT),
    [flexpaySonic],
  );

  const limitDepositFlexpayTurbo = useMemo(
    () =>
      getDepositLimits(flexpayTurbo, MIN_AMOUNT_DEPOSIT, MAX_AMOUNT_DEPOSIT),
    [flexpayTurbo],
  );
  const limitDepositFlexpay = useMemo(
    () => ({
      [FlexpayTabEnum.SONIC]: limitDepositFlexpaySonic,
      [FlexpayTabEnum.TURBO]: limitDepositFlexpayTurbo,
    }),
    [limitDepositFlexpaySonic, limitDepositFlexpayTurbo],
  );

  const value = useMemo(
    () => ({
      indexDeposit,
      flexpaySonic,
      flexpayTurbo,
      flexpaySonicStatus,
      flexpayTurboStatus,
      flexpayStatus,
      amount,
      setAmount,
      noteDeposit,
      setNoteDeposit,
      limitDepositFlexpay,
    }),
    [
      indexDeposit,
      flexpaySonic,
      flexpayTurbo,
      flexpaySonicStatus,
      flexpayTurboStatus,
      flexpayStatus,
      amount,
      setAmount,
      noteDeposit,
      setNoteDeposit,
      limitDepositFlexpay,
    ],
  );

  return <FlexpayContext value={value}>{children}</FlexpayContext>;
};
