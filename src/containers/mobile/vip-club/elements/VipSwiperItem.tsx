import type { VipClubItem } from '@/types/vip-club';
import { CurrencyUnit } from '@/enums';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Props = {
  vipItem: VipClubItem;
};

export const VipSwiperItem = ({ vipItem }: Props) => {
  const t = useTranslations('Pages.VipClub');

  return (
    <div
      className={clsx(
        'relative w-full h-[120px] md:h-[140px] min-w-[262px] rounded-[6px] justify-center flex items-center',
        `swiper-vip-${vipItem.vipLevel}`,
      )}
    >
      <div
        className={clsx(
          'absolute flex top-0 left-0 w-[54px] h-[24px] label-vip items-center justify-center',
          `label-vip-${vipItem.vipLevel}`,
        )}
      >
        <p className="flex text-[14px] leading-[140%] font-bold uppercase text-white ">
          VIP {vipItem.vipLevel}
        </p>
      </div>
      <div className={clsx('w-full', `vip-content-${vipItem.vipLevel}`)}>
        <div className="w-full flex flex-col ml-[15px] justify-center h-[54px]">
          <p className="text-dark-700 text-xs font-normal">
            {t('bonus_receive')}
          </p>
          <p className="text-dark-700 text-sm font-bold">
            {vipItem.bonusRank} {CurrencyUnit.DEFAULT_CURRENCY_VND}
          </p>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-end pb-[24px]">
        <Image
          src={`/images/vip-club/vip-swiper-${vipItem.vipLevel}-mb.webp`}
          alt={`VIP ${vipItem.vipLevel}`}
          width={98}
          height={96}
          className="w-full object-cover max-w-[98px]"
        />
      </div>
    </div>
  );
};
