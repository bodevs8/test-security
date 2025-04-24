'use client';

import { DepositLinkEnum, WithdrawLinkEnum } from '@/enums';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const BankWithdraw = dynamic(() => import('./elements/withdraw/Bank'));
const CryptoWithdraw = dynamic(() => import('./elements/withdraw/Crypto'));
const PhoneCardWithdraw = dynamic(
  () => import('./elements/withdraw/PhoneCard'),
);
const Coin12Withdraw = dynamic(() => import('./elements/withdraw/Coin12'));

const CodePayComponent = dynamic(() => import('./elements/deposit/Codepay'));
const FlexpayComponent = dynamic(() => import('./elements/deposit/Flexpay'));
const EwalletComponent = dynamic(() => import('./elements/deposit/Ewallet'));
const CryptoComponent = dynamic(() => import('./elements/deposit/Crypto'));
const PhoneCardComponent = dynamic(
  () => import('./elements/deposit/PhoneCard'),
);

export function BoxNote() {
  const pathname = usePathname();

  const renderNote = useMemo(
    () => ({
      [DepositLinkEnum.CodePay]: CodePayComponent,
      [DepositLinkEnum.Flexpay]: FlexpayComponent,
      [DepositLinkEnum.Ewallet]: EwalletComponent,
      [DepositLinkEnum.Crypto]: CryptoComponent,
      [DepositLinkEnum.PhoneCard]: PhoneCardComponent,
      [WithdrawLinkEnum.Bank]: BankWithdraw,
      [WithdrawLinkEnum.Crypto]: CryptoWithdraw,
      [WithdrawLinkEnum.Coin12]: Coin12Withdraw,
      [WithdrawLinkEnum.PhoneCard]: PhoneCardWithdraw,
    }),
    [],
  );

  const ComponentToRender = useMemo(
    () => renderNote[pathname as keyof typeof renderNote] || null,
    [pathname, renderNote],
  );

  return (
    <div className="flex flex-col w-full gap-4">
      {ComponentToRender && <ComponentToRender />}
      {!ComponentToRender && <></>}
    </div>
  );
}
