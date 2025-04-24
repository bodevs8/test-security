import { ResponsiveView } from '@/components/ResponsiveView';
import { PromotionContainerDesktop } from '@/containers/desktop/promotion';
import { getUser } from '@/utils/user';

export const revalidate = 60;
export const dynamic = 'auto';

async function PromotionPage() {
  const user = await getUser();
  const userPackageId = user?.package_id;

  return (
    <ResponsiveView
      mobile={<div />}
      desktop={<PromotionContainerDesktop userPackageId={userPackageId} />}
    />
  );
}

export default PromotionPage;
