import { Tag } from '@/components/Tag';
import { GATE_GAMES_PLAYER_REWARDS } from '@/constant/gate-games';
import { CategoryTypeEnum } from '@/enums';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

const PlayerReward = () => {
  const t = useTranslations();

  return (
    <>
      <div className="text-[16px] leading-[140%] font-bold text-center text-dark-700 uppercase">
        {t('Common.menu.player_rewards')}
      </div>
      <div className="mt-3 flex items-center justify-between">
        {GATE_GAMES_PLAYER_REWARDS.map((item) => (
          <Fragment key={item.label}>
            {item.isComing && (
              <div
                key={item.label}
                className="w-[82px] h-[69px] flex flex-col items-center justify-between py-[4.5px] relative"
              >
                <Tag
                  className="absolute z-[1] !normal-case top-[-3.5px] left-[-16px] !w-[56.2px] !text-[10px] !h-[14px]"
                  type={CategoryTypeEnum.Coming}
                />
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={24}
                  height={24}
                  className="!size-[24px]"
                />
                <div className="text-[12px] leading-[140%] font-medium text-dark-700 uppercase">
                  {t(item.label)}
                </div>
              </div>
            )}
            {!item.isComing && (
              <Link
                key={item.label}
                href={item.href!}
                className="w-[82px] h-[52px] flex flex-col items-center justify-between py-[4.5px]"
              >
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={24}
                  height={24}
                  className="!size-[24px]"
                />
                <div className="text-[12px] leading-[140%] font-medium text-dark-700 uppercase">
                  {t(item.label)}
                </div>
              </Link>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default PlayerReward;
