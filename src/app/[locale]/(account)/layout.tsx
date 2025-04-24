import type { DepositDataType } from '@/types/deposit';
import type { PropsWithChildren } from 'react';
import { AddBankModal } from '@/components/Modals/AddBankModal';
import { ResponsiveView } from '@/components/ResponsiveView';
import { AccountContainer } from '@/containers/desktop/account';
import { AccountContainerMobile } from '@/containers/mobile/account';
import { DepositStoreProvider } from '@/providers';
import { getCryptoList, getDepositIndex, getPhoneCardList } from '@/services';
import { getUser } from '@/utils/user';

const AccountLayout = async ({ children }: PropsWithChildren) => {
  const user = await getUser();
  const [indexDeposit, cryptoList, phoneCardList] = await Promise.all([
    getDepositIndex(),
    getCryptoList(),
    getPhoneCardList(),
  ]);

  const data: DepositDataType = {
    indexDeposit,
    cryptoList,
    phoneCardList,
  };

  return (
    <DepositStoreProvider data={data}>
      <ResponsiveView
        mobile={<AccountContainerMobile>{children}</AccountContainerMobile>}
        desktop={<AccountContainer user={user}>{children}</AccountContainer>}
      />
      <AddBankModal />
    </DepositStoreProvider>
  );
};

export default AccountLayout;
