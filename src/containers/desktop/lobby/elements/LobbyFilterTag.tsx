import { LOBBY_FILTER } from '@/constant/lobby';
import { useUserStore } from '@/hooks/stores';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type LobbyFilterTagProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoading: boolean;
};

export default function LobbyFilterTag({
  activeTab,
  setActiveTab,
  isLoading,
}: LobbyFilterTagProps) {
  const t = useTranslations();
  const { isLoggedIn } = useUserStore((state) => state);

  return (
    <div className="flex lg:items-center gap-2">
      {LOBBY_FILTER.filter((item) => isLoggedIn || !item.requireLogin).map(
        (item) => (
          <button
            type="button"
            className={clsx('lobby-filter__button font-medium', {
              active: item.key === activeTab,
              'cursor-not-allowed pointer-events-none': isLoading,
              [item.key]: item.key,
            })}
            key={item.key}
            onClick={() => {
              if (item.key === activeTab) {
                return;
              }
              setActiveTab(item.key);
            }}
          >
            <Image
              width={20}
              height={20}
              src={`/icons/${item.key}.svg`}
              alt={item.key}
              className="lobby-filter__icon-default"
            />
            <Image
              width={20}
              height={20}
              src={`/icons/${item.key}-active.svg`}
              alt={item.key}
              className="lobby-filter__icon-active hidden"
            />
            <span className="lobby-filter__button-text">{t(item.title)}</span>
          </button>
        ),
      )}
    </div>
  );
}
