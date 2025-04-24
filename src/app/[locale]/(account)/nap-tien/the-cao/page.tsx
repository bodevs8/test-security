import { DepositPhoneCardContainer } from '@/containers/desktop/deposit/phone-card';
import { getPhoneCardList } from '@/services/deposit-service';
import { getDeviceInfo } from '@/utils/device';
import { formatPhoneCardList } from '@/utils/phonecard';

const DepositPhoneCard = async () => {
  const data = await getPhoneCardList();
  const deviceInfo = await getDeviceInfo();
  const formattedCardList = formatPhoneCardList(data);

  return (
    <DepositPhoneCardContainer
      providerCardList={formattedCardList}
      isMobile={deviceInfo.isMobile}
    />
  );
};

export default DepositPhoneCard;
