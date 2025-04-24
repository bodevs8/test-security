import { BoxNote } from '@/components/BoxNote';
import TopMenu from './elements/TopMenu';

const DepositContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="bg-primary-light-0 rounded-[8px] w-full p-6 h-full box-border grid grid-rows-[auto_1fr]">
      <TopMenu />
      <div className="w-full flex gap-6 flex-col lg:flex-row mt-6">
        <div className="form-container w-full lg:w-[62%] 2xl:w-[572px]">
          {children}
        </div>
        <div className="flex-1">
          <BoxNote />
        </div>
      </div>
    </div>
  );
};

export { DepositContainer };
