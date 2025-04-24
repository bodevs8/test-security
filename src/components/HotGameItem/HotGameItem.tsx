'use client';

import type { HotGame } from '@/types/game';
import { ModalIdEnum } from '@/enums';
import { useRefresh } from '@/hooks/account';
import { useModalStore } from '@/hooks/stores';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type HotGameItemProps = {
  item: HotGame;
  priority?: boolean;
};

const HotGameItem = ({ item, priority = false }: HotGameItemProps) => {
  const { isLoggedIn } = useRefresh();
  const modalStore = useModalStore((state) => state);

  const handleClickGame = (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: HotGame,
  ) => {
    if (item.requireLogin && !isLoggedIn) {
      event.preventDefault();
      modalStore.openModal(ModalIdEnum.Login);
    }
  };

  return (
    <Link
      className={clsx('relative block group rounded-[8px] overflow-hidden', {
        'aspect-[373/255] w-[28.78%]': item.isThumbnail,
        'aspect-[210/255] w-[16.21%]': !item.isThumbnail,
      })}
      href={item.href ?? '#'}
      onClick={(event) => {
        handleClickGame(event, item);
      }}
    >
      <Image
        src={item.img}
        alt={item.title}
        width={item.isThumbnail ? 373 : 210}
        height={255}
        className={clsx(
          'w-full h-auto object-cover',
          'group-hover:scale-105 group-hover:brightness-110 transition-all duration-300',
          {
            'aspect-[373/255]': item.isThumbnail,
            'aspect-[210/255]': !item.isThumbnail,
          },
        )}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
      />
    </Link>
  );
};

export { HotGameItem };
