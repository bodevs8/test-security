import { PromotionTagEnum } from "@/enums/promotion";
import CashbackCommonPackage from '@/public/images/account/overview/cashback-common-banner.webp';
import clsx from "clsx";
import Image from "next/image";
import { PromotionTag } from "../Tag/PromotionTag";

export const CashbackBanner = ({ hideTag }: { hideTag?: boolean }) => {
  return (
    <div
      className='relative w-full transition-all duration-300'
    >
      <Image
        src={CashbackCommonPackage}
        alt='Cashback common package'
        className='w-full h-full rounded-[6px]'
        width={388}
        height={160}
      />
      <div
        className={clsx(
          'absolute top-0 left-0 w-full h-full p-2 lg:px-[11px]',
        )}
      >
        <div className="flex flex-col justify-center items-start h-full gap-[6px]">
          { !hideTag && (
            <div>
              <PromotionTag
                tagKey={PromotionTagEnum.Available}
                className='text-white'
                tagTextClassName='text-dark-700 !text-[10px] font-bold'
              />
            </div>
          )}
          <div className='relative'>
            <Image
              src="/images/account/overview/vip-9-royal-bg.webp"
              alt="vip-bonus"
              width={220}
              height={35}
            />
            <p className='text-white text-xl font-extrabold uppercase absolute top-0 left-0 w-full h-full flex items-center justify-start'>thưởng hoàn trả</p>
          </div>
          <div className='upto flex items-center'>
            <p
              className='font-extrabold text-xl uppercase up-to-text'
            >
              Lên đến 1.4%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}