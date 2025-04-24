import { ResponsiveView } from '@/components/ResponsiveView';
import { FlexPay } from '@/containers/desktop/deposit/flexpay';
import { FlexpayProvider } from '@/providers/transaction';
import { getUser } from '@/utils/user';

const DepositFlexpay = async () => {
  const user = await getUser();

  return (
    <FlexpayProvider>
      <ResponsiveView
        mobile={<FlexPay user={user} />}
        desktop={<FlexPay user={user} />}
      />
    </FlexpayProvider>
  );
};

export default DepositFlexpay;
