import type { PromotionDetailType } from '@/types/promotion';
import { PromotionDetail } from '@/containers/desktop/promotion/elements/PromotionDetail';

import React from 'react';

type Props = {
  data: PromotionDetailType;
  slug: string;
  userPackageId?: number | boolean;
};

export const PromotionDetailContainer = ({
  data,
  slug,
  userPackageId,
}: Props) => {
  return (
    <PromotionDetail data={data} slug={slug} userPackageId={userPackageId} />
  );
};
