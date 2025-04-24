'use client';

import type { WithdrawCryptoType } from '@/types/withdraw';
import type { ReactNode } from 'react';
import { WithdrawContext } from '@/contexts/withdraw-context';
import { WithDrawMethodEnum } from '@/enums/withdraw';
import { useDepositContext } from '@/hooks/contexts';
import { useEffect, useMemo, useState } from 'react';

type WithdrawDataType = {
  cryptoListData: WithdrawCryptoType[];
};

export const WithdrawProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: WithdrawDataType;
}) => {
  const [selectedCrypto, setSelectedCrypto] =
    useState<WithdrawCryptoType | null>(null);
  const [cryptoList, setCryptoList] = useState<WithdrawCryptoType[] | null>(
    null,
  );

  const { indexDeposit, phoneCardList } = useDepositContext();
  const { cryptoListData } = data;
  useEffect(() => {
    setSelectedCrypto(cryptoListData?.[0] || null);
    setCryptoList(cryptoListData);
  }, [cryptoListData]);

  const bankStatus = useMemo(() => {
    return !!indexDeposit?.withdrawBanks?.length;
  }, [indexDeposit]);

  const phoneCardStatus = useMemo(() => {
    if (!phoneCardList) return false;

    return (
      !!Object.keys(phoneCardList).length &&
      !!Object.keys(phoneCardList).find(
        (key) => phoneCardList[key as keyof typeof phoneCardList]?.status,
      )
    );
  }, [phoneCardList]);

  const cryptoStatus = useMemo(
    () => !cryptoList || !!cryptoList?.length,
    [cryptoList],
  );

  const isMaintainWithdraw = useMemo(
    () => ({
      [WithDrawMethodEnum.Index]: !(
        bankStatus ||
        cryptoStatus ||
        phoneCardStatus
      ),
      [WithDrawMethodEnum.Bank]: !bankStatus,
      [WithDrawMethodEnum.Crypto]: !cryptoStatus,
      [WithDrawMethodEnum.PhoneCard]: !phoneCardStatus,
      [WithDrawMethodEnum.Coin12]: !cryptoStatus,
    }),
    [bankStatus, cryptoStatus, phoneCardStatus],
  );

  const value = useMemo(
    () => ({
      indexDeposit,
      cryptoStatus,
      phoneCardStatus,
      cryptoList,
      phoneCardList,
      bankStatus,
      isMaintainWithdraw,
      selectedCrypto,
      setSelectedCrypto,
      setCryptoList,
    }),
    [
      indexDeposit,
      cryptoStatus,
      phoneCardStatus,
      cryptoList,
      phoneCardList,
      bankStatus,
      isMaintainWithdraw,
      selectedCrypto,
    ],
  );

  return <WithdrawContext value={value}>{children}</WithdrawContext>;
};
