import { UserBankContainer } from '@/containers/desktop/account';
import { getUserBank } from '@/services';
import { getDeviceInfo } from '@/utils/device';

const UserBankPage = async () => {
  const userBanks = await getUserBank();
  const deviceInfo = await getDeviceInfo();

  return (
    <UserBankContainer userBanks={userBanks} isMobile={deviceInfo.isMobile} />
  );
};

export default UserBankPage;
