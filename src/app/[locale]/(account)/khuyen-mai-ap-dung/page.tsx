import { ResponsiveView } from '@/components/ResponsiveView';
import { PromotionAppliedDesktop } from '@/containers/desktop/account/promotion-applied/PromotionApplied';
import { PromotionAppliedMobile } from '@/containers/mobile/account/promotion-appied/PromotionApplied';
import { RouterPathEnum } from '@/enums';
import { getUser } from '@/utils/user';
import { redirect } from 'next/navigation';

import '@/styles/pages/account/promotion-applied.scss';

const PromotionApplied = async () => {
  const user = await getUser();

  if (!user) {
    redirect(RouterPathEnum.Home);
  }

  return (
    <ResponsiveView
      mobile={<PromotionAppliedMobile user={user} />}
      desktop={<PromotionAppliedDesktop user={user} />}
    />
  );
};

export default PromotionApplied;
