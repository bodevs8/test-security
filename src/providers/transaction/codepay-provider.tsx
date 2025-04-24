'use client';

import type { ReactNode } from 'react';
import { MIN_AMOUNT_DEPOSIT, SELECT_PACKAGE } from '@/constant/deposit';
import { CodepayContext } from '@/contexts/transaction';
import { useDepositContext } from '@/hooks/contexts';
import { useMemo, useState } from 'react';

export const CodepayProvider = ({ children }: { children: ReactNode }) => {
  const { indexDeposit, codepayStatus } = useDepositContext();
  const [amount, setAmount] = useState<number>(MIN_AMOUNT_DEPOSIT);
  const [noteDeposit, setNoteDeposit] = useState<string>('');

  const availablePackage = useMemo(() => {
    return SELECT_PACKAGE.filter((item) =>
      (indexDeposit?.packages || []).some((pkg) => pkg.id === item.value),
    );
  }, [indexDeposit?.packages]);

  const value = useMemo(
    () => ({
      indexDeposit,
      codepayStatus,
      availablePackage,
      amount,
      noteDeposit,
      setAmount,
      setNoteDeposit,
    }),
    [
      indexDeposit,
      codepayStatus,
      availablePackage,
      amount,
      noteDeposit,
      setAmount,
      setNoteDeposit,
    ],
  );

  return <CodepayContext value={value}>{children}</CodepayContext>;
};
