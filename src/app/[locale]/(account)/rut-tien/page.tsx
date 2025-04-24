import { WithdrawLinkEnum } from '@/enums';
import { isMobileDevice } from '@/utils/device';
import { redirect } from 'next/navigation';

const Withdraw = async () => {
  const isMobile = await isMobileDevice();

  if (isMobile) {
    return <></>;
  }

  return redirect(WithdrawLinkEnum.Bank);
};

export default Withdraw;
