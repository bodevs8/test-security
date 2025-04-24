'use client';

import { Button } from '@/components/ui/button';
import { GUIDELINE_LINKS } from '@/constant/guidelines/guideline';
import {
  AccountLinkEnum,
  ButtonSizeEnum,
  ButtonVariantsEnum,
  ModalIdEnum,
} from '@/enums';
import { useModalStore } from '@/hooks/stores';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const HeaderSearchMobile = () => {
  const { openModal } = useModalStore((state) => state);
  const pathname = usePathname();

  const isHideHeader = useMemo(() => {
    const hideHeaderPaths = [
      ...Object.values(AccountLinkEnum),
      ...Object.values(GUIDELINE_LINKS),
    ];

    return hideHeaderPaths.some(
      (path) => pathname.includes(path) || path === pathname,
    );
  }, [pathname]);

  return (
    <Button
      id="search-button"
      name="search-button"
      type="button"
      aria-label="Search"
      className={clsx(
        'absolute top-[50px] right-0 w-[50px] h-[50px] lg:!hidden bg-neutral-700 z-10 !hidden',
        {
          '!hidden': isHideHeader,
        },
      )}
      variant={ButtonVariantsEnum.Transparent}
      size={ButtonSizeEnum.None}
      onClick={() => {
        openModal(ModalIdEnum.Search);
      }}
    >
      <span className="text-[20px] text-white icon icon-search" />
    </Button>
  );
};
