import type { UserBankType } from '@/types/userbank';
import { BankListDesktop } from './BankListDesktop';
import { BankListMobile } from './BankListMobile';

type Props = {
  isHiddenAddBank: boolean;
  showAddBankModal: () => void;
  data: UserBankType[];
  isMobile?: boolean;
};

export const UserBankList = ({
  isHiddenAddBank,
  showAddBankModal,
  data,
  isMobile,
}: Props) => {
  return (
    <>
      {isMobile && (
        <BankListMobile
          isHiddenAddBank={isHiddenAddBank}
          data={data}
          showAddBankModal={showAddBankModal}
        />
      )}
      {!isMobile && (
        <BankListDesktop
          isHiddenAddBank={isHiddenAddBank}
          data={data}
          showAddBankModal={showAddBankModal}
        />
      )}
    </>
  );
};
