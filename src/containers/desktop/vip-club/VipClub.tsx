import type { VipInfo } from '@/types/account-info';
import type { VipClubItem } from '@/types/vip-club';
import { GuestBanner } from './elements/GuestBanner';
import { MemberBanner } from './elements/MemberBanner';
import { TermAndCondition } from './elements/TermAndCondition';

import { VipInfoTable } from './elements/VipInfoTable';
import '@/styles/pages/vipclub/index.scss';

type VipClubProps = {
  vipItems: VipClubItem[];
  vipAccountProfile: VipInfo | null;
  isLoggedIn: boolean;
};

export default function VipClubDesktopContainer({
  vipItems,
  vipAccountProfile,
  isLoggedIn,
}: VipClubProps) {
  return (
    <div className="vip-club-container mt-[64.8px] bg-white max-w-[1920px] mx-auto">
      {!isLoggedIn && <GuestBanner vips={vipItems} />}
      {isLoggedIn && <MemberBanner vipAccountProfile={vipAccountProfile} />}
      <VipInfoTable vipItems={vipItems} />
      <TermAndCondition />
    </div>
  );
}
