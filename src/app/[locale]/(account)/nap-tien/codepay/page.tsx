import { CodePay } from '@/containers/desktop/deposit/codepay';
import { CodepayProvider } from '@/providers/transaction';
import { getDeviceInfo } from '@/utils/device';
import { getUser } from '@/utils/user';

const DepositCodepay = async () => {
  const user = await getUser();
  const deviceInfo = await getDeviceInfo();

  return (
    <CodepayProvider>
      <CodePay user={user} isMobile={deviceInfo.isMobile} />
    </CodepayProvider>
  );
};

export default DepositCodepay;
