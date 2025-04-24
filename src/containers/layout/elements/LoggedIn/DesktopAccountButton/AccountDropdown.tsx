import { Tag } from '@/components/Tag';
import { Button } from '@/components/ui/button';
import { ACCOUNT_SIDE_MENU } from '@/constant/menu';
import {
  AccountLinkEnum,
  ButtonSizeEnum,
  ButtonVariantsEnum,
  CategoryTypeEnum,
  DepositLinkEnum,
  ModalIdEnum,
  WithdrawLinkEnum,
} from '@/enums';
import { useModalStore } from '@/hooks/stores';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type AccountDropdownProps = {
  onClose: () => void;
};

export const AccountDropdown = ({ onClose }: AccountDropdownProps) => {
  const t = useTranslations();
  let pathname = usePathname();
  const modalStore = useModalStore((state) => state);
  const [hovered, setHovered] = useState<string | null>(null);
  if (
    pathname === DepositLinkEnum.CodePay ||
    pathname === WithdrawLinkEnum.Bank
  ) {
    pathname = `/${pathname.split('/')[1]}`;
  }
  const handleLogout = () => {
    modalStore.openModal(ModalIdEnum.Logout);
  };

  return (
    <div className="absolute top-full right-0 z-50 mt-5 rounded-[4px] p-2 shadow-lg w-[269px] bg-white">
      <div className="flex flex-col">
        {ACCOUNT_SIDE_MENU.map((item, index) => (
          <Link
            key={item.id}
            href={item.url}
            prefetch={false}
            className={clsx(
              'flex items-center gap-2 border-b border-neutral-400 px-4 py-3 transition-colors group',
              index === ACCOUNT_SIDE_MENU.length - 1 && 'border-b-0',
              pathname === item.url && 'bg-cta-primary',
            )}
            onClick={onClose}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <Image
              src={
                pathname === item.id || hovered === item.id
                  ? (item.iconActive ?? item.icon)
                  : item.icon
              }
              alt={t(item.label)}
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span
              className={clsx(
                'h-5 text-sm capitalize leading-tight text-dark-200 group-hover:text-cta-primary',
                pathname === item.url && '!text-white',
              )}
            >
              {t(item.label)}
            </span>
            {item.tag && (
              <Tag
                type={item.tag}
                className={clsx({
                  'p2p-tag': item.id === AccountLinkEnum.P2P,
                })}
              />
            )}
            {item.id === AccountLinkEnum.P2P && (
              <Tag
                type={CategoryTypeEnum.Maintain}
                className="hidden maintain-p2p"
              />
            )}
          </Link>
        ))}

        <Button
          id="logout-button"
          name="logout-button"
          variant={ButtonVariantsEnum.Transparent}
          size={ButtonSizeEnum.LG}
          onClick={handleLogout}
          className="cursor-pointer text-center font-bold uppercase leading-snug text-neutral-900 transition-colors my-[5px] hover:!text-primary-200"
        >
          {t('Modals.LogoutModal.title')}
        </Button>
      </div>
    </div>
  );
};
