import type { BaseTableProps } from '@/types/app';
import { Pagination } from '@/components/Pagination';
import { TextAlignEnum } from '@/enums';
import EmptyIcon from '@/public/images/empty/no-data.webp';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const BaseTable = ({
  columns,
  data,
  totalPages,
  currentPage,
  paginationClassName,
  iconEmpty = EmptyIcon,
  emptyClassName,
  titleEmpty,
  className,
  tableClassName,
  theadClassName,
  tdClassName,
  onPageChange,
  isVertical = false,
  containerClassName,
}: BaseTableProps) => {
  const t = useTranslations('Common.empty');

  const renderHorizontalTable = () => {
    return (
      <table className={clsx('w-full border-collapse', tableClassName)}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  textAlign:
                    index === 0
                      ? TextAlignEnum.LEFT
                      : column.textAlign || TextAlignEnum.CENTER,
                }}
                className={clsx(
                  'text-[14px] font-medium leading-5 h-[44px]',
                  column.theadClassName,
                  theadClassName,
                )}
              >
                {column.renderHeader ? column.renderHeader() : column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    textAlign:
                      colIndex === 0
                        ? TextAlignEnum.LEFT
                        : column.textAlign || TextAlignEnum.CENTER,
                  }}
                  className={clsx('h-[56px]', column.tdClassName, tdClassName)}
                >
                  {column.renderCell
                    ? column.renderCell(row, column, rowIndex)
                    : row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderVerticalTable = () => {
    return (
      <table
        className={clsx(
          'w-full border-collapse table-vertical',
          tableClassName,
        )}
      >
        <tbody>
          {columns.map((column, colIndex) => (
            <tr key={colIndex}>
              <th
                style={{ textAlign: TextAlignEnum.LEFT }}
                className={clsx(
                  'text-[14px] font-medium leading-5 h-[44px] capitalize border-b-[1px] border-neutral-500 last:border-b-0',
                  column.theadClassName,
                  theadClassName,
                  'w-[50%]',
                )}
              >
                {column.renderHeader ? column.renderHeader() : column.title}
              </th>
              {data.map((row, rowIndex) => (
                <td
                  key={rowIndex}
                  style={{ textAlign: column.textAlign || TextAlignEnum.LEFT }}
                  className={clsx('h-[56px]', tdClassName)}
                >
                  {column.renderCell
                    ? column.renderCell(row, column, rowIndex)
                    : row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={clsx('base-table w-full h-full box-border', className)}>
      {data?.length > 0 && (
        <div className={clsx('w-full h-full overflow-hidden')}>
          <div
            className={clsx(
              'w-full h-fit overflow-hidden rounded-[6px] border border-cta-tertiary',
              containerClassName,
            )}
          >
            {isVertical && renderVerticalTable()}
            {!isVertical && renderHorizontalTable()}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 w-full flex justify-center items-center">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
                className={paginationClassName}
              />
            </div>
          )}
        </div>
      )}
      {!data?.length && (
        <div
          className={clsx(
            'flex flex-col justify-center items-center w-full h-full box-border',
            emptyClassName,
          )}
        >
          <Image
            src={iconEmpty ?? ''}
            alt="table empty"
            width={120}
            height={120}
            className="aspect-[120/120]"
          />
          <div className="text-[16px] font-medium leading-[140%] text-dark-200 mt-2">
            {titleEmpty || t('default')}
          </div>
        </div>
      )}
    </div>
  );
};
