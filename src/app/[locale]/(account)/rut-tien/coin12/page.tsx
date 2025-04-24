import { Crypto } from '@/containers/desktop/withdraw/crypto';
import { getDeviceInfo } from '@/utils/device';
import { getUser } from '@/utils/user';

const WithdrawCoin12 = async () => {
  const user = await getUser();
  const deviceInfo = await getDeviceInfo();

  return <Crypto user={user} isMobile={deviceInfo.isMobile} />;
};

export default WithdrawCoin12;
