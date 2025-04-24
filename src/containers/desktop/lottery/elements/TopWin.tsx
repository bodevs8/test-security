'use client';

import type { ColumnTable } from '@/types/app';
import { BaseTable } from '@/components/BaseTable';
import { Button } from '@/components/ui/button';
import { TOP_WIN_DATA } from '@/constant/lottery';
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  RouterPathEnum,
  TextAlignEnum,
} from '@/enums';
import { useGameContext } from '@/hooks/contexts';
import { useDevice } from '@/hooks/utils';
import lotteryEmptyImage from '@/public/images/lottery/lottery-empty.webp';
import lotteryTopIcon from '@/public/images/lottery/lottery-top-icon.svg';

import rankOtherMb from '@/public/images/lottery/rank/rank-other-mb-2.webp';
import rankOther from '@/public/images/lottery/rank/rank-other.webp';
import { formatNumberWithCommas } from '@/utils/format-currency';
import clsx from 'clsx';
import { sortBy } from 'lodash';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const TopWin = () => {
  const { openIframeGame } = useGameContext();
  const t = useTranslations('Pages.Lottery');
  const router = useRouter();
  const { isMobile, isTablet } = useDevice();

  const handleOpenLink = () => {
    if (isMobile || isTablet) {
      openIframeGame(RouterPathEnum.LoDe3Mien);
      return;
    }
    router.push(RouterPathEnum.LoDe3Mien);
  };

  const renderResultTopWin = () => {
    return (
      <div className="flex flex-col rounded-[6px] overflow-hidden border border-primary-light-400">
        {sortBy(TOP_WIN_DATA, 'drawing')
          .slice(0, 8)
          .map((item, index) => (
            <div
              key={index}
              className="h-[64px] w-full flex items-center border-b border-primary-light-400 overflow-hidden last:border-b-0"
            >
              <div className="relative h-[64px] w-[42px]">
                <Image
                  src={rankOtherMb}
                  alt="rank"
                  width={42}
                  height={64}
                  className="object-cover h-[64px] object-right"
                />
                <p
                  className="absolute top-1/2 left-2.5 text-green-500 text-2xl font-extrabold italic"
                  style={{ transform: 'translateY(-50%)' }}
                >
                  {index + 1}
                </p>
              </div>
              <div className="flex flex-1 justify-between items-center gap-3 px-4">
                <div className="flex-col flex-start gap-1">
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.image}
                      alt="flag"
                      width={24}
                      height={24}
                      className="inline-block size-4"
                    />
                    <div className="flex flex-1 text-dark-700 font-normal text-sm leading-5">
                      {item.name}
                    </div>
                  </div>
                  <span className="text-yellow-400 text-start font-bold text-sm">
                    {formatNumberWithCommas(item.prize)}
                  </span>
                </div>

                <Button
                  id={item.name}
                  name={item.name}
                  variant={ButtonVariantsEnum.Secondary}
                  disabled={item.drawing}
                  size={ButtonSizeEnum.Default}
                  className={clsx('w-[142px] h-[40px] capitalize text-base', {
                    '!bg-primary-light-100 !text-dark-700': item.drawing,
                  })}
                  onClick={handleOpenLink}
                >
                  {item.drawing
                    ? t('table.top_win.running')
                    : t('table.top_win.bet_now')}
                </Button>
              </div>
            </div>
          ))}
      </div>
    );
  };

  const columns: ColumnTable[] = [
    {
      id: 'rank',
      textAlign: TextAlignEnum.LEFT,
      title: '#',
      theadClassName: 'xsm:!pl-6',
      renderHeader: () => {
        return <p className="text-center w-[30px]">#</p>;
      },
      renderCell: (_: any, __: any, rowIndex: number) => {
        return (
          <div
            className={clsx(
              'border border-r-0 border-green-450 h-[42px] bg-primary-light-0 rounded-l-md overflow-hidden text-left font-extrabold text-2xl italic relative',
            )}
          >
            <Image
              src={rankOther}
              alt="rank"
              width={102}
              height={42}
              className="object-cover h-[42px] object-right"
            />
            <p
              className="absolute top-1/2 left-7 text-green-500"
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
      renderCell: (row: any, column: any) => {
        return (
          <div
            className={clsx(
              'border border-x-0 border-green-450 flex items-center h-[42px] bg-primary-light-0 pl-0.5 capitalize text-dark-700',
            )}
          >
            <Image
              src={row.image}
              alt="flag"
              width={24}
              height={24}
              className="inline-block mr-2 size-4 xsm:size-6"
            />
            {row[column.id]}
          </div>
        );
      },
    },
    {
      id: 'name',
      title: t('table.top_win.title'),
      textAlign: TextAlignEnum.LEFT,
      renderCell: (row: any, column: any) => {
        return (
          <div className="border-green-white border border-x-0 flex flex-col justify-center h-[42px] bg-primary-light-0 text-dark-700 pl-4">
            {row[column.id]}
          </div>
        );
      },
    },
    {
      id: 'winlost_txt',
      title: `${t('table.big_win.td.win')} (${process.env.NEXT_PUBLIC_MAIN_CREDIT_UNIT})`,
      textAlign: TextAlignEnum.RIGHT,
      renderCell: (row: any) => {
        return (
          <div className="border border-x-0 border-primary-light-0 rounded-r-md overflow-hidden flex justify-between items-center h-[42px] bg-primary-light-0 px-3 gap-3">
            <span className="w-full text-yellow-400 text-end font-bold text-xs">
              {formatNumberWithCommas(row.prize)}
            </span>

            <Button
              id={row.name}
              name={row.name}
              variant={ButtonVariantsEnum.Secondary}
              size={isMobile ? ButtonSizeEnum.SM : ButtonSizeEnum.Default}
              className={clsx('w-[88px] h-[24px] capitalize', {
                '!bg-primary-light-100 !text-dark-700': row.drawing,
              })}
              disabled={row.drawing}
              onClick={handleOpenLink}
            >
              {row.drawing
                ? t('table.top_win.running')
                : t('table.top_win.bet_now')}
            </Button>
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
          className="inline-block size-[18px] xsm:size-[26px] mb-0.5"
        />
        {t('table.top_win.title')}
      </h3>
      {!isMobile && (
        <BaseTable
          columns={columns}
          data={sortBy(TOP_WIN_DATA, 'drawing').slice(0, 8)}
          iconEmpty={lotteryEmptyImage}
          totalPages={1}
          tdClassName="!h-10 md:!h-[42px]"
          theadClassName="!h-[33px] first:rounded-tl-[6px] last:rounded-tr-[6px] md:first:rounded-l-[6px] md:last:rounded-r-[6px]"
          currentPage={1}
          containerClassName="!border-none !rounded-none md:mt-3"
        />
      )}
      {isMobile && renderResultTopWin()}
    </div>
  );
};

export default TopWin;
