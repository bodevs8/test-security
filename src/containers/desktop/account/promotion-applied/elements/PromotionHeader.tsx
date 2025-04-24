import { BaseSectionTitle } from '@/components/BaseSectionTitle/BaseSectionTitle';
import AvailableIcon from '@/public/images/promotion/available-icon.webp';

export const PromotionHeader = ({ title }: { title: string }) => (
  <BaseSectionTitle
    iconData={AvailableIcon}
    title={title}
    iconClassName="w-[1.354vw] 3xl:w-[26px]"
    titleClassName="uppercase text-green-500 font-bold text-[1.25vw] leading-[140%] 3xl:text-[24px]"
  />
);
