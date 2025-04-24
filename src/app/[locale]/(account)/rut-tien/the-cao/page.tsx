import { WithdrawPhoneCardContainer } from '@/containers/desktop/withdraw/phone-card';
import { getPhoneCardList } from '@/services';
import { getDeviceInfo } from '@/utils/device';
import { formatPhoneCardList } from '@/utils/phonecard';

const WithdrawPhoneCard = async () => {
  const deviceInfo = await getDeviceInfo();
  const data = await getPhoneCardList();
  const formattedCardList = formatPhoneCardList(data);

  return (
    <WithdrawPhoneCardContainer
      providerCardList={formattedCardList}
      isMobile={deviceInfo.isMobile}
    />
  );
};

export default WithdrawPhoneCard;
