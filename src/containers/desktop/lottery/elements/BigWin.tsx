'use client';

import type { ColumnTable } from '@/types/app';
import { BaseTable } from '@/components/BaseTable';
import { BIG_WIN_DATA } from '@/constant/lottery';
import { TextAlignEnum } from '@/enums';
import { useDevice } from '@/hooks/utils';
import lotteryEmptyImage from '@/public/images/lottery/lottery-empty.webp';
import lotteryTopIcon from '@/public/images/lottery/lottery-top-icon.svg';
import rankOtherMb from '@/public/images/lottery/rank/rank-other-mb.webp';
import rankOther from '@/public/images/lottery/rank/rank-other.webp';
import clsx from 'clsx';
import sortBy from 'lodash/sortBy';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const BigWin = () => {
  const t = useTranslations('Pages.Lottery');
  const { isMobile } = useDevice();
  const columns: ColumnTable[] = [
    {
      id: 'rank',
      textAlign: TextAlignEnum.LEFT,
      title: '#',
      theadClassName: 'md:!pl-6',
      renderHeader: () => {
        return <p className="text-center w-[30px]">#</p>;
      },
      renderCell: (_: any, __: any, rowIndex: number) => {
        return (
          <div
            className={clsx(
              'md:border border-primary-light-0 bg-primary-light-0 max-h-[42px] md:rounded-l-[6px] overflow-hidden text-left font-extrabold text-2xl italic relative',
              {
                'bg-yellow-neon': rowIndex === 0,
              },
            )}
          >
            {rowIndex < 3 && (
              <Image
                src={`/images/lottery/rank/rank-${rowIndex + 1}${isMobile ? '-mb' : ''}.webp`}
                alt="rank"
                width={isMobile ? 42 : 102}
                height={42}
              />
            )}
            {rowIndex >= 3 && (
              <Image
                src={isMobile ? rankOtherMb : rankOther}
                alt="rank"
                width={isMobile ? 42 : 102}
                height={42}
              />
            )}
            <p
              className={clsx(
                'absolute top-1/2 left-3 md:left-7',
                rowIndex < 3 ? 'text-black' : 'text-green-500',
              )}
              style={{
                transform: 'translateY(-50%)',
              }}
            >
              {rowIndex + 1}
            </p>
          </div>
        );
      },
    },
    {
      id: 'username',
      title: t('table.big_win.td.user'),
      textAlign: TextAlignEnum.LEFT,
      renderCell: (row: any, column: any, rowIndex: number) => {
        return (
          <div
            className={clsx(
              'md:border border-primary-light-0 flex justify-between items-center h-[42px] bg-primary-light-0 capitalize text-dark-700',
              {
                'bg-yellow-neon': rowIndex === 0,
              },
            )}
          >
            {row[column.id]}
          </div>
        );
      },
    },
    {
      id: 'region',
      title: t('table.big_win.td.lottery'),
      textAlign: TextAlignEnum.LEFT,
      renderCell: (row: any, column: any, rowIndex: number) => {
        return (
          <div
            className={clsx(
              'md:border border-primary-light-0 flex justify-between items-center h-[42px] bg-primary-light-0 text-dark-700',
              {
                'bg-yellow-neon': rowIndex === 0,
              },
            )}
          >
            {t('table.big_win.lottery')} {t(`${row[column.id]}`)}
          </div>
        );
      },
    },

    {
      id: 'winlost_txt',
      title: `${t('table.big_win.td.win')} (${process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT})`,
      textAlign: isMobile ? TextAlignEnum.CENTER : TextAlignEnum.RIGHT,
      renderCell: (row: any, column: any, rowIndex: number) => {
        return (
          <div
            className={clsx(
              'md:border border-primary-light-0 md:rounded-r-[6px] overflow-hidden flex justify-center md:justify-end items-center h-[42px] bg-primary-light-0',
              {
                'bg-yellow-neon': rowIndex === 0,
              },
            )}
          >
            <span className="text-center text-xs text-yellow-400 font-bold ml-7 md:ml-0 md:mr-7">
              {row[column.id]}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="lottery-table md:p-4 flex-1">
      <h3 className="lottery-table__title py-2">
        <Image
          src={lotteryTopIcon}
          alt="icon"
          width={26}
          height={26}
          className="inline-block size-[18px] md:size-[26px] mb-0.5"
        />
        {t('table.big_win.title')}
      </h3>
      <BaseTable
        columns={columns}
        data={sortBy(BIG_WIN_DATA, 'winlost').reverse().slice(0, 8)}
        iconEmpty={lotteryEmptyImage}
        totalPages={1}
        tdClassName="!h-10 md:!h-[42px]"
        theadClassName="!h-[33px] first:rounded-tl-[6px] last:rounded-tr-[6px] md:first:rounded-l-[6px] md:last:rounded-r-[6px]"
        currentPage={1}
        containerClassName="!border-none !rounded-none md:mt-3"
      />
    </div>
  );
};

export default BigWin;
