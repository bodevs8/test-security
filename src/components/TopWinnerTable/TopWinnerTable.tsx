import type { TopWinnerItem } from '@/types/game';
import { formatNumberWithCommas } from '@/utils/format-currency';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { memo } from 'react';

type TopWinnerTableProps = {
  data: TopWinnerItem[];
};

export const TopWinnerTable = memo(({ data }: TopWinnerTableProps) => {
  const t = useTranslations();

  return (
    <table className="top-winner-table">
      <thead>
        <tr>
          <th>
            <div className="w-[24px] flex justify-center items-center">
              {t('Pages.HomePage.top_winner.table.id')}
            </div>
          </th>
          <th>{t('Pages.HomePage.top_winner.table.username')}</th>
          <th>{t('Pages.HomePage.top_winner.table.name')}</th>
          <th className="whitespace-nowrap">
            {t('Pages.HomePage.top_winner.table.winlost')}
          </th>
        </tr>
      </thead>
      <tbody>
        {(data || []).map((item: TopWinnerItem, index: number) => {
          const rank = index + 1;
          return (
            <tr key={`${item.username}-${item.winlost}`}>
              <td>
                {rank <= 3 && (
                  <Image
                    src={`/images/home/top-winner/ranking/${rank}.webp`}
                    alt="ranking icon"
                    width={24}
                    height={24}
                  />
                )}
                {rank > 3 && <div className="ranking-number">{rank}</div>}
              </td>
              <td>{item.username}</td>
              <td className="whitespace-nowrap text-ellipsis overflow-hidden">
                {item.name}
              </td>
              <td>{formatNumberWithCommas(item.winlost, 'D')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

TopWinnerTable.displayName = 'TopWinnerTable';
