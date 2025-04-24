import type { ColumnTable } from '@/types/app';
import type { VipClubItem, VipInfoTableCell } from '@/types/vip-club';
import { BaseTable } from '@/components/BaseTable';
import { DEFAULT_CURRENCY_UNIT } from '@/constant/app';
import { VIP_INFO_TABLE_CELLS } from '@/constant/vip-info';
import { TextAlignEnum } from '@/enums';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Props = {
  vipItems: VipClubItem[];
};

export const VipInfoTable = ({ vipItems }: Props) => {
  const t = useTranslations('Pages.VipClub');

  const vipInfoTableCells: VipInfoTableCell[] = VIP_INFO_TABLE_CELLS.map(
    (cell) => ({
      ...cell,
      title: t(cell.title, { currency: DEFAULT_CURRENCY_UNIT }),
    }),
  );

  const getValueColumn = (vipItem: VipClubItem, row: VipInfoTableCell) => {
    if (vipItem[row.id] === '0') {
      return t('table.invite');
    }
    if (row.isPercent) {
      return `${vipItem[row.id]}%`;
    }
    return vipItem[row.id];
  };

  const getColumnInfo = (vipItem: VipClubItem): ColumnTable => {
    return {
      id: vipItem.vipLevel?.toString() || '',
      title: '',
      renderCell: (row: VipInfoTableCell) => (
        <div>
          <span className="text-navy-blue-400 text-[14px] leading-[140%] font-medium">
            {getValueColumn(vipItem, row)}
          </span>
        </div>
      ),
      renderHeader: () => (
        <div className="flex items-center size-full justify-center flex-col gap-1">
          <Image
            src={`/images/vip-club/vip-logo-${vipItem.vipLevel}.webp`}
            alt="vip-logo"
            width={60}
            height={60}
            className={clsx('block', 'aspect-[60/60]')}
          />
          <span className="text-sm leading-[140%] font-medium uppercase">
            VIP {vipItem.vipLevel}
          </span>
        </div>
      ),
    };
  };

  const columns: ColumnTable[] = [
    {
      id: 'vipLevel',
      title: '',
      textAlign: TextAlignEnum.LEFT,
      renderCell: (row: VipInfoTableCell) => (
        <div>
          <span className="text-navy-blue-400 text-[14px] leading-[140%] font-normal">
            {row.title}
          </span>
        </div>
      ),
      renderHeader: () => (
        <div className="flex py-[28px] flex-col">
          <span className="text-base leading-[140%] font-extrabold uppercase italic">
            VIP
          </span>
          <span className="text-sm leading-[140%] text-dark-200 font-normal">
            {t('table.privileges_rank')}
          </span>
        </div>
      ),
    },
    ...vipItems.map((vipItem) => getColumnInfo(vipItem)),
  ];

  return (
    <div className="x-container !mt-[33px]">
      <div className="table-title mb-[40px] flex justify-center items-center">
        <span className="text-[24px] lg:text-[32px] text-highlight leading-[140%] font-bold uppercase">
          {t('table.privileges')}
        </span>
      </div>
      <div className="w-full overflow-auto">
        <BaseTable
          columns={columns}
          data={vipInfoTableCells}
          iconEmpty="/images/lottery/table/empty.png"
          totalPages={1}
          currentPage={1}
          tdClassName="!h-[60px] max-h-[60px] border-r border-neutral-400 !border-b-0 whitespace-pre-wrap min-w-[110px] first:max-w-[203px] first:min-w-[200px]"
          theadClassName="!border-b-0"
          containerClassName="!overflow-auto custom-scrollbar border-none"
        />
      </div>
    </div>
  );
};
