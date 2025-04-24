import { P2PContainer } from '@/containers/desktop/account/p2p';
import { getDeviceInfo } from '@/utils/device';

const P2P = async () => {
  const deviceInfo = await getDeviceInfo();

  return <P2PContainer isMobile={deviceInfo.isMobile} />;
};

export default P2P;
