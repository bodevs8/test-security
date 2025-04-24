'use client';

import type { ReactNode } from 'react';
import { STATUS_DEPOSIT_AVAILABLE } from '@/constant/app';
import { MAX_AMOUNT_DEPOSIT, MIN_AMOUNT_DEPOSIT } from '@/constant/deposit';
import { EwalletContext } from '@/contexts/transaction';
import { EwalletMethodEnum } from '@/enums/deposit';
import { useDepositContext } from '@/hooks/contexts';
import { getEwalletCode } from '@/services/client';
import { useEffect, useMemo, useState } from 'react';

export const EwalletProvider = ({ children }: { children: ReactNode }) => {
  const { indexDeposit, ewalletStatus } = useDepositContext();
  const [amount, setAmount] = useState<number>(MIN_AMOUNT_DEPOSIT);
  const [noteDeposit, setNoteDeposit] = useState<string>('');
  const [ewalletCode, setEwalletCode] = useState<string>('');

  const ewalletGateStatus = useMemo(() => {
    const { ewallet, momos, viettelPays } = indexDeposit || {};
    return {
      [EwalletMethodEnum.Momo]: {
        gateTurbo: ewallet?.ewallet2?.MOMO?.status !== STATUS_DEPOSIT_AVAILABLE,
        gateSonic: ewallet?.ewallet?.MOMO?.status !== STATUS_DEPOSIT_AVAILABLE,
        gateLucky: !momos?.length,
      },
      [EwalletMethodEnum.ViettelPay]: {
        gateTurbo:
          ewallet?.ewallet2?.VIETTEL_PAY?.status !== STATUS_DEPOSIT_AVAILABLE,
        gateSonic:
          ewallet?.ewallet?.VIETTEL_PAY?.status !== STATUS_DEPOSIT_AVAILABLE,
        gateLucky: !viettelPays?.length,
      },
      [EwalletMethodEnum.ZaloPay]: {
        gateTurbo:
          ewallet?.ewallet2?.ZALO_PAY?.status !== STATUS_DEPOSIT_AVAILABLE,
        gateSonic:
          ewallet?.ewallet?.ZALO_PAY?.status !== STATUS_DEPOSIT_AVAILABLE,
        gateLucky: true,
      },
    };
  }, [indexDeposit]);

  const momoAccounts = useMemo(() => {
    return indexDeposit?.momos || [];
  }, [indexDeposit]);

  const viettelPayAccounts = useMemo(() => {
    return indexDeposit?.viettelPays || [];
  }, [indexDeposit]);

  useEffect(() => {
    getEwalletCode().then((res) => {
      setEwalletCode(res.data);
    });
  }, []);

  const limitDepositByGate = useMemo(() => {
    const { ewallet } = indexDeposit || {};
    return {
      [EwalletMethodEnum.Momo]: {
        gateTurbo: {
          min: ewallet?.ewallet2?.MOMO?.min || MIN_AMOUNT_DEPOSIT,
          max: ewallet?.ewallet2?.MOMO?.max || MAX_AMOUNT_DEPOSIT,
        },
        gateSonic: {
          min: ewallet?.ewallet?.MOMO?.min || MIN_AMOUNT_DEPOSIT,
          max: ewallet?.ewallet?.MOMO?.max || MAX_AMOUNT_DEPOSIT,
        },
        gateLucky: {
          min: MIN_AMOUNT_DEPOSIT,
          max: MAX_AMOUNT_DEPOSIT,
        },
      },
      [EwalletMethodEnum.ViettelPay]: {
        gateTurbo: {
          min: ewallet?.ewallet2?.VIETTEL_PAY?.min || MIN_AMOUNT_DEPOSIT,
          max: ewallet?.ewallet2?.VIETTEL_PAY?.max || MAX_AMOUNT_DEPOSIT,
        },
        gateSonic: {
          min: ewallet?.ewallet?.VIETTEL_PAY?.min || MIN_AMOUNT_DEPOSIT,
          max: ewallet?.ewallet?.VIETTEL_PAY?.max || MAX_AMOUNT_DEPOSIT,
        },
        gateLucky: {
          min: MIN_AMOUNT_DEPOSIT,
          max: MAX_AMOUNT_DEPOSIT,
        },
      },
      [EwalletMethodEnum.ZaloPay]: {
        gateTurbo: {
          min: ewallet?.ewallet2?.ZALO_PAY?.min || MIN_AMOUNT_DEPOSIT,
          max: ewallet?.ewallet2?.ZALO_PAY?.max || MAX_AMOUNT_DEPOSIT,
        },
        gateSonic: {
          min: ewallet?.ewallet?.ZALO_PAY?.min || MIN_AMOUNT_DEPOSIT,
          max: ewallet?.ewallet?.ZALO_PAY?.max || MAX_AMOUNT_DEPOSIT,
        },
        gateLucky: {
          min: MIN_AMOUNT_DEPOSIT,
          max: MAX_AMOUNT_DEPOSIT,
        },
      },
    };
  }, [indexDeposit]);

  const value = useMemo(
    () => ({
      indexDeposit,
      ewalletStatus,
      ewalletGateStatus,
      amount,
      noteDeposit,
      ewalletCode,
      momoAccounts,
      viettelPayAccounts,
      setNoteDeposit,
      setAmount,
      limitDepositByGate,
    }),
    [
      indexDeposit,
      ewalletStatus,
      ewalletGateStatus,
      amount,
      noteDeposit,
      ewalletCode,
      momoAccounts,
      viettelPayAccounts,
      setNoteDeposit,
      setAmount,
      limitDepositByGate,
    ],
  );

  return <EwalletContext value={value}>{children}</EwalletContext>;
};
