import { WithdrawBank } from '@/containers/desktop/withdraw/bank';
import { getUserBank } from '@/services';
import { getDeviceInfo } from '@/utils/device';

const BankWithdraw = async () => {
  const userBanks = await getUserBank();
  const deviceInfo = await getDeviceInfo();

  return (
    <WithdrawBank userBanks={userBanks ?? []} isMobile={deviceInfo.isMobile} />
  );
};

export default BankWithdraw;
