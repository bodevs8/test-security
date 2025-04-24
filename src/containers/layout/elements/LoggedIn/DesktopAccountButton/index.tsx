import { Button } from '@/components/ui/button';
import { ButtonSizeEnum, ButtonVariantsEnum } from '@/enums';
import { useUserStore } from '@/hooks/stores';
import { useClickOutside } from '@/hooks/utils';
import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import { AccountDropdown } from './AccountDropdown';

export const DesktopAccountButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { isLoggedIn } = useUserStore((state) => state);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="hidden lg:block relative" ref={ref}>
      <Button
        id="account-button"
        name="account-button"
        variant={ButtonVariantsEnum.Transparent}
        size={ButtonSizeEnum.None}
        className={clsx(
          'group flex h-10 w-10 items-center justify-center rounded-[6px] p-2.5 bg-cta-primary rounded-l-none',
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="icon icon-account text-2xl text-white" />
      </Button>

      {isOpen && isLoggedIn && (
        <AccountDropdown onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};
