import clsx from 'clsx';
import { BaseTable } from '../BaseTable';

type PromotionTableType = {
  tableHead: string[];
  tableBody: string[][][];
};

type PromotionTableProps = {
  data?: PromotionTableType;
  title?: string;
  isMobile?: boolean;
  tableHeadClassName?: string;
};

export const PromotionTable = ({
  data,
  title,
  isMobile,
  tableHeadClassName,
}: PromotionTableProps) => {
  if (!data) return null;

  const columns = data.tableHead.map((head: string, index: number) => ({
    id: `column-${index}`,
    title: head,
  }));

  const formattedData = [
    Object.fromEntries(
      data.tableHead.map((_: any, i: any) => [
        `column-${i}`,
        data.tableBody[i],
      ]),
    ),
  ];

  return (
    <div className="mb-6">
      {title && (
        <h3 className="text-dark-700 text-base font-bold leading-5 mb-4 capitalize">
          {title}
        </h3>
      )}
      <BaseTable
        columns={columns}
        data={formattedData}
        totalPages={1}
        currentPage={1}
        tdClassName={clsx(
          'relative text-dark-700 text-sm !h-[52px] !p-[6px] lg:!p-4',
          'after:content-[""] after:absolute after:right-0 after:top-1/2 after:custom-translate-y-1/2 after:w-px after:h-1/3 first:after:w-0 after:bg-primary-light-400 last:after:w-0 first:w-[200px] first:after:w-0',
          'first:after:bg-primary-light-50',
          {
            '!text-center !bg-neutral-700 !text-[12px]': isMobile,
          },
        )}
        theadClassName={clsx(
          '!text-dark-700 text-sm normal-case !p-[6px] lg:!p-4 !h-[52px] !bg-primary-light-50 font-medium first:!border-r-0',
          {
            '!text-center !text-[12px]': isMobile,
          },
          tableHeadClassName,
        )}
        className="border border-cta-tertiary rounded-s-md"
        containerClassName={clsx('!overflow-auto', {
          'border-b-0 border-cta-tertiary rounded-[4px]': isMobile,
        })}
        isVertical={isMobile}
      />
    </div>
  );
};
