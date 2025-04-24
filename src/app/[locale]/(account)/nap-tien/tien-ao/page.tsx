import type { CryptoDetailDataType } from '@/types/deposit';
import { DepositCryptoContainer } from '@/containers/desktop/deposit/crypto';
import { getCryptoByNetwork, getCryptoList } from '@/services';
import { getDeviceInfo } from '@/utils/device';

const DepositCrypto = async () => {
  const data = await getCryptoList();
  let cryptoByNetwork: CryptoDetailDataType[] = [];
  if (data.length > 0 && data[0]?.network?.[0]) {
    cryptoByNetwork = await getCryptoByNetwork(data[0].network[0]);
  }
  const deviceInfo = await getDeviceInfo();
  return (
    <DepositCryptoContainer
      data={data}
      cryptoByNetwork={cryptoByNetwork}
      isMobile={deviceInfo.isMobile}
    ></DepositCryptoContainer>
  );
};

export default DepositCrypto;
