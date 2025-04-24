import { Crypto } from '@/containers/desktop/withdraw/crypto';
import { getDeviceInfo } from '@/utils/device';
import { getUser } from '@/utils/user';

const WithdrawCrypto = async () => {
  const user = await getUser();
  const deviceInfo = await getDeviceInfo();

  return <Crypto user={user} isMobile={deviceInfo.isMobile} />;
};

export default WithdrawCrypto;
