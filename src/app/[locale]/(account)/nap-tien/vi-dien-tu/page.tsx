import { EWallet } from '@/containers/desktop/deposit/ewallet';
import { EwalletProvider } from '@/providers/transaction';
import { getDeviceInfo } from '@/utils/device';
import { getUser } from '@/utils/user';

const DepositEwallet = async () => {
  const user = await getUser();
  const deviceInfo = await getDeviceInfo();

  return (
    <EwalletProvider>
      <EWallet user={user} isMobile={deviceInfo.isMobile} />
    </EwalletProvider>
  );
};

export default DepositEwallet;
