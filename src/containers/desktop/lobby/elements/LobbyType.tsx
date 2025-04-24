import type { LobbyCategory, RequestParams } from '@/types/game';
import { CASINO_CATEGORY, LOBBY_CATEGORY } from '@/constant/lobby';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import LobbyTypeItem from './LobbyTypeItem';
import '@/styles/pages/lobby/type.scss';

type LobbyTypePropType = {
  isCasino?: boolean;
  loading: boolean;
  requestParams: RequestParams;
};

export default function LobbyType({
  isCasino,
  requestParams,
  loading,
}: LobbyTypePropType) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const lobbyOption = useMemo(() => {
    return isCasino ? CASINO_CATEGORY : LOBBY_CATEGORY;
  }, [isCasino]);

  useEffect(() => {
    if (containerRef.current) {
      // Find the active item
      const activeItem = containerRef.current.querySelector(
        '.lobby-type__item.active',
      );

      if (activeItem) {
        activeItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [requestParams.type]);

  const handleClick = useCallback(
    (item: LobbyCategory) => {
      window.scrollTo({
        top: item.isLobby ? 0 : 200,
        behavior: 'smooth',
      });

      let url = item.link;
      const queryParams = new URLSearchParams();

      if (isCasino) {
        if (requestParams.partner) {
          queryParams.append('partner', requestParams.partner);
        }
        if (requestParams.keyword) {
          queryParams.append('keyword', requestParams.keyword);
        }

        const queryString = queryParams.toString();
        if (queryString) {
          url = `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
        }
      }

      router.push(url);
    },
    [isCasino, router, requestParams.partner, requestParams.keyword],
  );

  return (
    <section className={clsx('lobby-type mb-4 lg:mb-6', { casino: isCasino })}>
      <div className="x-container">
        <div
          className="lobby-type__container hide-scrollbar"
          ref={containerRef}
        >
          {lobbyOption.map((item, index) => (
            <LobbyTypeItem
              item={item}
              loading={loading}
              isActive={item.type === requestParams.type}
              key={`lobby-type-option-${index}`}
              onClick={() => {
                handleClick(item);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
