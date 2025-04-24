import TabMenu from './elements/TabMenu';

const AccountContainerMobile = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="w-full overflow-hidden bg-primary-light-50 account-mobile-layout pt-[42px] relative z-50 min-h-[calc(100vh-50px-54px)] flex flex-col">
      <TabMenu />

      {/* main */}
      <div className="account-container flex-1">{children}</div>
    </div>
  );
};

export { AccountContainerMobile };
