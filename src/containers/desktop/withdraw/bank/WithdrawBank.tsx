import type { UserBankType } from '@/types/userbank';
import { getUser } from '@/utils/user';
import AddBankWithdraw from './elements/AddBank';
import FormWithdrawBank from './elements/Form';

type Props = {
  userBanks: UserBankType[];
  isMobile: boolean;
};

const WithdrawBank = async ({ userBanks, isMobile }: Props) => {
  const user = await getUser();

  return (
    <>
      {userBanks?.length <= 0 && <AddBankWithdraw isMobile={isMobile} />}
      {userBanks?.length > 0 && (
        <FormWithdrawBank
          user={user}
          userBanks={userBanks}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export { WithdrawBank };
