import type { PropsWithChildren } from 'react';
import { ResponsiveView } from '@/components/ResponsiveView';
import { WithdrawContainer } from '@/containers/desktop/withdraw';
import { WithdrawContainerMobile } from '@/containers/mobile/withdraw';
import { WithdrawProvider } from '@/providers/withdraw-provider';
import { getWithdrawCryptoList } from '@/services';
import '@/styles/pages/deposit/index.scss';

const WithdrawLayout = async ({ children }: PropsWithChildren) => {
  const cryptoList = await getWithdrawCryptoList();

  return (
    <WithdrawProvider data={{ cryptoListData: cryptoList }}>
      <ResponsiveView
        mobile={<WithdrawContainerMobile>{children}</WithdrawContainerMobile>}
        desktop={<WithdrawContainer>{children}</WithdrawContainer>}
      />
    </WithdrawProvider>
  );
};

export default WithdrawLayout;
