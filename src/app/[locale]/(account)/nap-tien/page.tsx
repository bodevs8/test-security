import { DepositLinkEnum } from '@/enums';
import { isMobileDevice } from '@/utils/device';
import { redirect } from 'next/navigation';

const Deposit = async () => {
  const isMobile = await isMobileDevice();

  if (isMobile) {
    return <></>;
  }

  return redirect(DepositLinkEnum.CodePay);
};

export default Deposit;
