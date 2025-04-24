import { Button } from '@/components/ui/button';
import { AccountLinkEnum, ButtonVariantsEnum } from '@/enums';
import Link from 'next/link';

export const MobileDepositButton = () => (
  <Link
    href={AccountLinkEnum.Deposit}
    prefetch={false}
    className="flex lg:hidden h-[20px] w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-secondary-200 hover:bg-secondary-300"
  >
    <span className="icon icon-close rotate-45 text-xs lg:text-lg text-white" />
  </Link>
);

export const DesktopDepositButton = () => (
  <div className="hidden lg:block">
    <Link
      href={AccountLinkEnum.Deposit}
      prefetch={false}
      className="flex lg:w-[114px] lg:h-[40px] flex-shrink-0 items-center justify-center rounded-lg bg-secondary-200 hover:bg-secondary-300"
    >
      <Button
        id="deposit-button"
        name="deposit-button"
        className="flex flex-shrink-0 items-center lg:w-[114px] lg:h-[40px] justify-center rounded-lg bg-secondary-200 hover:bg-secondary-300"
        variant={ButtonVariantsEnum.Secondary}
      >
        Nạp tiền
      </Button>
    </Link>
  </div>
);
