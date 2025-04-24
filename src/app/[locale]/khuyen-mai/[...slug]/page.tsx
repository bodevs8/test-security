import { ResponsiveView } from '@/components/ResponsiveView';
import { PROMOTION_DETAIL } from '@/constant/promotion-detail';
import { PromotionDetailContainer } from '@/containers/desktop/promotion';
import { RouterPathEnum } from '@/enums';
import { getUser } from '@/utils/user';
import { redirect } from 'next/navigation';

export const revalidate = 60;
export const dynamic = 'auto';

type Props = {
  params: Promise<{
    slug: string | string[];
  }>;
};

const normalizeSlug = (slug: string | string[]): string => {
  return Array.isArray(slug) ? slug[0] || '' : slug || '';
};

const PromotionDetail = async ({ params }: Props) => {
  const { slug } = await params;

  if (Array.isArray(slug) && slug.length > 1) {
    return redirect(RouterPathEnum.NotFound);
  }

  const slugValue = normalizeSlug(slug);

  const promotionDetail = PROMOTION_DETAIL.find(
    (item) => item.slug === slugValue,
  );

  if (!promotionDetail) {
    return redirect(RouterPathEnum.NotFound);
  }

  const user = await getUser();

  return (
    <ResponsiveView
      mobile={<div />}
      desktop={
        <PromotionDetailContainer
          data={promotionDetail}
          slug={slugValue}
          userPackageId={user?.package_id}
        />
      }
    />
  );
};

export default PromotionDetail;
