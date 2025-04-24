import type { VipInfo } from '@/types/account-info';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Props = {
  vipInfo: VipInfo | null;
  className?: string;
};

type LetterVIPProps = {
  ImageSrc: string;
  level?: string;
};

export const VIPStatusCard9 = ({ vipInfo }: Props) => {
  const t = useTranslations('Pages.AccountInfo.VIPStatusCard');

  return (
    <div className="space-y-4 vip-status-card-item-content mt-[12px]">
      <div className="relative w-fit ml-[-11px]">
        <Image
          src="/images/account/overview/vip-9-royal-bg.webp"
          alt="vip-bonus"
          width={220}
          height={35}
        />
        <p className="text-base uppercase font-extrabold italic text-white absolute top-0 left-0 w-full h-full flex items-center justify-start ml-[11px]">{t('royal_title')}</p>
      </div>
      <h2 className="text-base font-normal leading-[140%]  mb-4 vip-title ">
        {t('title')} <span className="font-bold">VIP 9</span>
      </h2>
      <div className="space-y-2 bg-vip-bonus-item mb-[20px]">
        <Image
          src="/images/account/overview/vip-bonus-icon.webp"
          alt="vip-bonus"
          width={36}
          height={36}
        />
        <div>
          <p className="text-sm text-white font-normal">{t('bonus')}</p>
          <p className="text-xs font-bold text-yellow-400">
            {vipInfo?.vipBonus}
          </p>
        </div>
      </div>
      <div className="space-y-2 bg-vip-bonus-item">
        <Image
          src="/images/account/overview/vip-lucky-money-icon.webp"
          alt="vip-lucky-money"
          width={36}
          height={36}
        />
        <div>
          <p className="text-sm text-white font-normal">
            {t('lucky_money')}
          </p>
          <p className="text-xs font-bold text-yellow-400">
            {vipInfo?.vipLuckyMoney}
          </p>
        </div>
      </div>
    </div>
  );
};

const LetterVIP = ({ ImageSrc, level }: LetterVIPProps) => {
  const t = useTranslations('Pages.AccountInfo.VIPStatusCard');

  return (
    <div className="relative">
      <Image
        src={ImageSrc}
        alt="letter-vip"
        width={340}
        height={188}
        className="aspect-[340/188]"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between">
        <p className="letter-vip-title mx-auto font-extrabold italic text-base text-center uppercase max-w-[174px] mt-[42px]">{t('invite_title')}</p>
        <p className='font-normal text-sm leading-[20px] text-white max-w-[243px] text-center mb-[20px] vip-title'>{t('invite')} <span className='font-bold'>VIP {level}</span></p>
      </div>
    </div>
  );
};

export const VIPStatusCard = ({ vipInfo, className }: Props) => {
  const t = useTranslations('Pages.AccountInfo.VIPStatusCard');

  const calculateWidth = (current?: number, required?: number) => {
    if (!current || !required) return 0;
    return Math.min((current / required) * 100, 100);
  };

  const showProgressInfo = ![7, 8, 9].includes(vipInfo?.vipLevel ?? 0);

  return (
    <div
      className={clsx(
        'account-info-vip-container',
        `bg-vip-${vipInfo?.vipLevel}`,
        className,
      )}
    >
      <div className="flex justify-between">
        {showProgressInfo && <div className="space-y-5 vip-status-card-item max-w-[273px] w-[55%]">
          <h2 className="text-base font-normal leading-[140%] mb-[28px] vip-title">
            {t('need_deposit_and_bet')} <span className="font-bold">VIP {vipInfo?.nextVipLevel}</span>
          </h2>
          <div className="space-y-2 w-full">
            <p className="text-sm text-white font-normal mb-1">
              {t('deposit')}
            </p>
            <p className="text-sm font-medium text-yellow-400 mb-1">
              {vipInfo?.vipDepositCurrentTotalFormatted}/
              {vipInfo?.vipDepositRequiredTotalFormatted}
            </p>
            <div className="w-full bg-[#070E1A4D] rounded-full h-2">
              <div
                className="progress-bar-deposit h-2 rounded-full"
                style={{
                  width: `${calculateWidth(vipInfo?.vipDepositCurrentTotal, vipInfo?.vipDepositRequiredTotal)}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="space-y-2 mb-[15px] w-full">
            <p className="text-sm text-white font-normal mb-1">
              {t('turnover')}
            </p>
            <p className="text-sm font-medium text-yellow-400 mb-1">
              {vipInfo?.vipTurnoverCurrentTotalFormatted}/
              {vipInfo?.vipTurnoverRequiredTotalFormatted}
            </p>
            <div className="w-full bg-[#070E1A4D] rounded-full h-2 mb-[49px]">
              <div
                className="progress-bar-turnover h-2 rounded-full"
                style={{
                  width: `${calculateWidth(
                    vipInfo?.vipTurnoverCurrentTotal,
                    vipInfo?.vipTurnoverRequiredTotal,
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>}
        {vipInfo?.vipLevel === 9 && <VIPStatusCard9 vipInfo={vipInfo} />}
        {vipInfo?.vipLevel === 7 && <LetterVIP ImageSrc="/images/account/overview/letter-vip-7.webp" level="8" />}
        {vipInfo?.vipLevel === 8 && <LetterVIP ImageSrc="/images/account/overview/letter-vip-8.webp" level="9" />}
      </div>
    </div>
  );
};
