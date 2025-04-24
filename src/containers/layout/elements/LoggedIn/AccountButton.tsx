import { AccountLinkEnum } from '@/enums';
import Link from 'next/link';

export const MobileAccountButton = () => (
  <Link
    href={AccountLinkEnum.Overview}
    prefetch={false}
    className="flex lg:hidden h-[32px] w-[32px] flex-shrink-0 items-center justify-center !bg-green-500 rounded-tr-[6px] rounded-br-[6px]"
  >
    <span className="icon icon-plus text-2xl text-white" />
  </Link>
);
