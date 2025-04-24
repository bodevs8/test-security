'use client';

import type { DepositDataType, IndexDepositBankingType } from '@/types/deposit';
import type { ReactNode } from 'react';
import { STATUS_DEPOSIT_AVAILABLE } from '@/constant/app';
import { DepositStoreContext } from '@/contexts/deposit-context';
import { DepositMethodEnum } from '@/enums';
import { useMemo, useState } from 'react';

export const DepositStoreProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: DepositDataType;
}) => {
  const { indexDeposit, cryptoList, phoneCardList } = data;
  const [amount, setAmount] = useState<number>(0);
  const [noteDeposit, setNoteDeposit] = useState<string>('');

  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const contextDeposit = useMemo(
    () => ({ ...data, selectedCrypto, setSelectedCrypto }),
    [data, selectedCrypto],
  );

  const isMaintainP2P = useMemo(() => {
    return !indexDeposit?.p2pLink;
  }, [indexDeposit?.p2pLink]);

  const codepayStatus = useMemo(() => {
    return indexDeposit?.nicepayInfo?.status;
  }, [indexDeposit?.nicepayInfo]);

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

  const ewalletStatus = useMemo(() => {
    const { ewallet, momos, viettelPays } = indexDeposit || {};
    const { ewallet: ewalletV1, ewallet2: ewalletV2 } = ewallet || {};

    const hasMomos = momos?.length && momos?.length > 0;
    const hasViettelPays = viettelPays?.length && viettelPays?.length > 0;

    const isAvailableInV1 = [
      ewalletV1?.MOMO?.status,
      ewalletV1?.VIETTEL_PAY?.status,
      ewalletV1?.ZALO_PAY?.status,
    ].some((status) => status === STATUS_DEPOSIT_AVAILABLE);

    const isAvailableInV2 = [
      ewalletV2?.MOMO?.status,
      ewalletV2?.VIETTEL_PAY?.status,
      ewalletV2?.ZALO_PAY?.status,
    ].some((status) => status === STATUS_DEPOSIT_AVAILABLE);

    return hasMomos || hasViettelPays || isAvailableInV1 || isAvailableInV2;
  }, [indexDeposit]);

  const cryptoStatus = useMemo(
    () => cryptoList && cryptoList?.length > 0,
    [cryptoList],
  );
  const phoneCardStatus = useMemo(
    () => Object.values(phoneCardList || {})?.length > 0,
    [phoneCardList],
  );

  const isMaintainDeposit = useMemo(
    () => ({
      [DepositMethodEnum.INDEX]: !(
        codepayStatus ||
        flexpayStatus ||
        cryptoStatus ||
        ewalletStatus ||
        phoneCardStatus
      ),
      [DepositMethodEnum.CODEPAY]: !codepayStatus,
      [DepositMethodEnum.FLEXPAY]: !flexpayStatus,
      [DepositMethodEnum.CRYPTO]: !cryptoStatus,
      [DepositMethodEnum.EWALLET]: !ewalletStatus,
      [DepositMethodEnum.PHONE_CARD]: !phoneCardStatus,
    }),
    [
      codepayStatus,
      flexpayStatus,
      cryptoStatus,
      ewalletStatus,
      phoneCardStatus,
    ],
  );

  const value = useMemo(() => {
    return {
      ...contextDeposit,
      indexDeposit,
      flexpaySonic,
      flexpayTurbo,
      isMaintainP2P,
      codepayStatus,
      flexpaySonicStatus,
      flexpayTurboStatus,
      flexpayStatus,
      ewalletStatus,
      cryptoStatus,
      phoneCardStatus,
      isMaintainDeposit,
      amount,
      cryptoList,
      phoneCardList,
      setAmount,
      noteDeposit,
      setNoteDeposit,
    };
  }, [
    contextDeposit,
    indexDeposit,
    flexpaySonic,
    flexpayTurbo,
    isMaintainP2P,
    codepayStatus,
    flexpaySonicStatus,
    flexpayTurboStatus,
    flexpayStatus,
    ewalletStatus,
    cryptoStatus,
    phoneCardStatus,
    isMaintainDeposit,
    amount,
    cryptoList,
    phoneCardList,
    setAmount,
    noteDeposit,
    setNoteDeposit,
  ]);

  return <DepositStoreContext value={value}>{children}</DepositStoreContext>;
};
