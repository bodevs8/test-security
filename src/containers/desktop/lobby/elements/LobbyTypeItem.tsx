import type { LobbyCategory } from '@/types/game';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

type LobbyTypeItemProps = {
  loading: boolean;
  isActive: boolean;
  onClick?: () => void;
  item: LobbyCategory;
};

export default function LobbyTypeItem({
  isActive,
  onClick,
  loading,
  item,
}: LobbyTypeItemProps) {
  const t = useTranslations();
  return (
    <button
      type="button"
      name="lobby-change-type"
      className={clsx('lobby-type__item', {
        active: isActive,
        disabled: loading,
      })}
      onClick={onClick}
    >
      <span className="lobby-type__item-content flex flex-col items-center justify-center">
        <Image src={item.iconSvg} alt={item.title} width={24} height={24} />
        <i className={clsx('text-2xl text-green-500', item.icon)}></i>
        {t(item.title).toLowerCase()}
      </span>
    </button>
  );
}
