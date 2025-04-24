import { PromotionTable } from '@/components/PromotionTable';
import { PromotionTermAndConditions } from '@/components/PromotionTermAndConditions';
import { PromotionSectionItemTypeEnum } from '@/enums';

export const RenderSection = ({
  section,
  isMobile,
}: {
  section: any;
  isMobile?: boolean;
}) => {
  switch (section.type) {
    case PromotionSectionItemTypeEnum.Table:
      return (
        <PromotionTable
          data={section.data}
          title={section.title}
          isMobile={isMobile}
        />
      );
    case PromotionSectionItemTypeEnum.Terms:
      return (
        <PromotionTermAndConditions
          title={section.title}
          items={section.items}
          isMobile={isMobile}
        />
      );
    default:
      return null;
  }
};
