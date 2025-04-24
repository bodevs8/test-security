'use client';

import type { UserData } from '@/types/auth';
import { useRefresh } from '@/hooks/account';
import { formatUsername } from '@/utils/format-username';
import clsx from 'clsx';
import { MobileAccountButton } from './AccountButton';
import { BalanceAmount } from './BalanceAmount';
import { DesktopDepositButton } from './DepositButton';
import { DesktopAccountButton } from './DesktopAccountButton';

type LoggedInProps = {
  serverUser?: UserData;
  isMobile?: boolean;
};

export const LoggedIn = ({ serverUser, isMobile }: LoggedInProps) => {
  const { userData } = useRefresh();
  const renderUser = userData || serverUser;

  if (renderUser?.username) {
    renderUser.username = formatUsername(renderUser.username);
  }

  useRefresh();

  return (
    <div className="flex items-center gap-4">
      {/* Balance */}
      <div
        className={clsx(
          'balance-info flex h-8 lg:h-10 items-center justify-between gap-0 md:gap-2 py-2 pr-1.5',
          {
            '!pr-0': isMobile,
          },
        )}
      >
        <div className="flex min-w-0 items-center gap-[11px] border border-neutral-400 rounded-[6px] max-h[32px] md:max-h-[40px]">
          <div className="flex flex-col mx-2 mr-1 md:mr-0">
            <div
              className={clsx(
                'text-dark-200 leading-[150%] font-medium self-end',
                {
                  'text-[8px]': isMobile,
                  'text-[10px]': !isMobile,
                },
              )}
            >
              {renderUser?.username}
            </div>
            <BalanceAmount
              balance={renderUser?.balance ?? 0}
              className="self-end !text-[12px] md:!text-[14px] !font-medium"
            />
          </div>
          {!isMobile && <DesktopAccountButton />}
        </div>
        {isMobile && <MobileAccountButton />}
        {!isMobile && <DesktopDepositButton />}
      </div>
    </div>
  );
};
