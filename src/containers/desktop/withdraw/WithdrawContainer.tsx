import { BoxNote } from '@/components/BoxNote';
import { TopMenuWithdraw } from './elements';

const WithdrawContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="bg-white rounded-[8px] w-full p-6 h-full box-border grid grid-rows-[auto_1fr]">
      <TopMenuWithdraw />
      <div className="w-full flex gap-6 lg:gap-3 xl:gap-6 flex-col lg:flex-row mt-6">
        <div className="form-container w-full lg:w-[62%] xl:w-[572px]">
          {children}
        </div>
        <div className="flex-1">
          <BoxNote />
        </div>
      </div>
    </div>
  );
};

export { WithdrawContainer };
