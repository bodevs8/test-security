import type { PropsWithChildren } from 'react';
import { ResponsiveView } from '@/components/ResponsiveView';
import { DepositContainer } from '@/containers/desktop/deposit';
import { DepositContainerMobile } from '@/containers/mobile/deposit';
import '@/styles/pages/deposit/index.scss';

const DepositLayout = async ({ children }: PropsWithChildren) => {
  return (
    <ResponsiveView
      mobile={<DepositContainerMobile>{children}</DepositContainerMobile>}
      desktop={<DepositContainer>{children}</DepositContainer>}
    />
  );
};

export default DepositLayout;
