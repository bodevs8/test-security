import type { VipInfo } from '@/types/account-info';
import VipClubDesktopContainer from '@/containers/desktop/vip-club/VipClub';
import VipClubMobileContainer from '@/containers/mobile/vip-club/VipClub';
import { getAccountProfile, getVipInfo } from '@/services';
import { getDeviceInfo } from '@/utils/device';
import { getUser } from '@/utils/user';
import { formatUserVipInfo, formatVipItem } from '@/utils/vip-club';

export const revalidate = 60;
export const dynamic = 'auto';

async function VipClubPage() {
  const [deviceInfo, user, vipInfo] = await Promise.all([
    getDeviceInfo(),
    getUser(),
    getVipInfo(),
  ]);

  let vipAccountProfile: VipInfo | null = null;

  const vipItems = formatVipItem(vipInfo);

  if (user) {
    const accountProfile = await getAccountProfile();
    if (accountProfile) {
      vipAccountProfile = formatUserVipInfo(accountProfile, vipInfo);
    }
  }

  if (deviceInfo.isMobile) {
    return (
      <VipClubMobileContainer
        vipItems={vipItems}
        vipAccountProfile={vipAccountProfile}
        isLoggedIn={!!user}
      />
    );
  }

  return (
    <VipClubDesktopContainer
      vipItems={vipItems}
      vipAccountProfile={vipAccountProfile}
      isLoggedIn={!!user}
    />
  );
}

export default VipClubPage;
