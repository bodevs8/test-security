import type { VipConditions, VipInfo } from '@/types/account-info';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ButtonVariantsEnum, RouterPathEnum } from '@/enums';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type VIPBonusItemProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  value: ReactNode;
  valueClassName?: string;
};

export const VIPBonusItem = ({
  imageSrc,
  imageAlt,
  title,
  value,
  valueClassName = 'text-xs font-[700] text-yellow-100',
}: VIPBonusItemProps) => (
  <div className="space-y-2 flex grow gap-[6px] bonus-item">
    <Image src={imageSrc} alt={imageAlt} width={36} height={36} />
    <div>
      <p className="text-sm text-neutral-900 font-normal">{title}</p>
      <p className={valueClassName}>{value}</p>
    </div>
  </div>
);

type CardItemProps = {
  className: string;
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
};

const CardItem = ({ className, children, imageSrc, imageAlt }: CardItemProps) => (
  <div className={`flex items-center gap-3 card-item ${className} p-4`}>
    <div className="flex items-center justify-center">
      <Image src={imageSrc} alt={imageAlt} width={48} height={48} />
    </div>
    <div>{children}</div>
  </div>
);

type Props = {
  vipConditions: VipConditions | null;
  vipInfo: VipInfo | null;
  isHiddenPrivilege: boolean;
};

export const VIPConditionsCard = ({
  vipConditions,
  isHiddenPrivilege = true,
}: Props) => {
  const t = useTranslations('Pages.AccountInfo');

  const router = useRouter();
  const handleLearnMore = () => {
    router.push(RouterPathEnum.VipClub);
  };

  const isHiddenVipCard = [0, 8, 9].includes(vipConditions?.vipLevel ?? 0);
  const isVipNormal = vipConditions?.vipLevel === 0;

  const renderProgressText = (
    current?: string,
    required?: string,
    title?: string,
  ) => (
    <>
      <p className="text-sm font-[400] text-dark-200 mb-2">{title}</p>
      <p className="text-sm font-bold text-orange-50">
        {current || '0'} / {required || '0'}
      </p>
    </>
  );

  return (
    <div
      className={clsx('bg-white rounded-xl px-6 py-4', {
        'hide-privilege': isHiddenPrivilege,
        '!bg-transparent pt-0': isVipNormal,
      })}
    >
      {!isVipNormal && (
        <h2 className="text-base mb-4 uppercase font-bold text-dark-700">
          {t('VIPConditionsCard.title')}
        </h2>
      )}
      <div className="space-y-4">
        {!isHiddenVipCard && (
          <>
            <CardItem
              className="vip-turnover-card-item"
              imageSrc="/images/account/overview/total-bet-icon.svg"
              imageAlt="total-bet"
            >
              {renderProgressText(
                vipConditions?.turnoverCurrentTotalFormatted,
                vipConditions?.turnoverExtendFormatted,
                t('VIPConditionsCard.turnover_required_total'),
              )}
            </CardItem>

            <CardItem
              className="vip-deposit-card-item"
              imageSrc="/images/account/overview/total-deposit-icon.svg"
              imageAlt="total-deposit"
            >
              {renderProgressText(
                vipConditions?.depositCurrentTotalFormatted,
                vipConditions?.depositExtendFormatted,
                t('VIPConditionsCard.deposit_required_total'),
              )}
            </CardItem>
          </>
        )}

        <div className="p-4 privilege-card-item mb-[24px] bg-primary-light-50 rounded-[8px]">
          <div className="text-base font-medium leading-[24px] text-dark-700 mb-3">
            {t('VIPConditionsCard.vip_privileges')}
          </div>
          <div className="text-sm font-normal leading-[20px] text-dark-200 flex flex-col gap-1">
            {vipConditions?.vipPrivileges?.map((privilege) => (
              <p
                key={privilege.name}
                className="flex justify-between items-center"
              >
                <span className="text-sm font-[400] text-dark-200 block whitespace-pre-wrap">
                  {t(`VIPConditionsCard.game_categories.${privilege.name}`)}
                </span>
                <span className="text-sm font-[500]">
                  {privilege.percent}%
                </span>
              </p>
            ))}
          </div>
        </div>
        <div className="flex justify-center mb-2 learn-more-button">
          <Button
            id="vip-conditions-card-button"
            type="button"
            name="vip-conditions-card-button"
            className="flex gap-3 ml-1 items-center w-[180px]"
            variant={ButtonVariantsEnum.Secondary}
            onClick={handleLearnMore}
          >
            <p className="text-sm font-medium text-dark-700 capitalize">
              {t('VIPConditionsCard.learn_more')}
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};
