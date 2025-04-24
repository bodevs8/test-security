import type { UserData } from '@/types/auth';
import { SideMenu } from './elements/SideMenu';

type Props = {
  children: React.ReactNode;
  user?: UserData;
};

export const AccountContainer = ({ children, user }: Props) => {
  return (
    <div className="bg-primary-light-50 py-10">
      <div className="x-container">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="w-full grid grid-cols-[auto_1fr] gap-3 xl:gap-4 2xl:gap-6">
            {/* side bar */}
            <SideMenu serverUser={user} />

            {/* main */}
            <div className="account-container flex-1 text-dark-200 relative max-w-[984px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
