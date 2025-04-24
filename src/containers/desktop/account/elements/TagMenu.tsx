import type { AccountMenuItem } from '@/types/app';
import { BrandingTag } from '@/components/Tag/BrandingTag';
import { AccountLinkEnum, CategoryTypeEnum } from '@/enums';
import { useDepositContext } from '@/hooks/contexts';

const TagRenderer = (item: AccountMenuItem) => {
  const { isMaintainP2P } = useDepositContext();

  if (item.id === AccountLinkEnum.P2P && isMaintainP2P) {
    return (
      <BrandingTag
        type={CategoryTypeEnum.Maintain}
        className="account-maintain-p2p"
      />
    );
  }

  if (item.tag) {
    return (
      <BrandingTag
        type={item.tag}
        className="!h-[20px]"
        labelClassName="!text-sm"
      />
    );
  }

  return <></>;
};

export default TagRenderer;
