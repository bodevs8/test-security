'use client';

import { BaseBreadcrumb } from '@/components/BaseBreadcrumb';
import { Button } from '@/components/ui/button';
import { COCKFIGHT_GAME_LIST } from '@/constant/lobby';
import { ButtonSizeEnum, GameCategoryEnum, RouterPathEnum } from '@/enums';
import { useGameContext } from '@/hooks/contexts';
import { useDevice } from '@/hooks/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LobbyType from '../lobby/elements/LobbyType';

export default function CockFightContainer() {
  const t = useTranslations();
  const gameContext = useGameContext();
  const { isMobile } = useDevice();
  const breadcrumbItems = [
    {
      label: t('Pages.Promotion.breadcrumb.home'),
      href: RouterPathEnum.Home,
    },
    {
      label: t('Common.menu.cockfight'),
      href: RouterPathEnum.Cockfight,
    },
  ];

  return (
    <div className="x-container">
      <div className="lobby-container py-4 md:py-6">
        <BaseBreadcrumb items={breadcrumbItems} className="mb-4 md:mb-6" />
        <LobbyType
          loading={false}
          requestParams={{ type: GameCategoryEnum.CockFight }}
        />
        <div className="flex items-center gap-4 lg:gap-6 flex-col lg:flex-row pt-0">
          {COCKFIGHT_GAME_LIST.map((item, index) => {
            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => gameContext.openGame(item.gameData)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && gameContext.openGame(item.gameData)
                }
                className="relative lg:cursor-pointer transition-all transform hover:shadow-lg hover:scale-[1.005] hover:shadow-primary-300 hover:brightness-110 rounded-lg p-0 bg-transparent border-0"
              >
                <Image
                  src={item.banner}
                  alt={item.title}
                  width={640}
                  height={264}
                />
                <Button
                  id={item.title}
                  name={item.title}
                  size={isMobile ? ButtonSizeEnum.Default : ButtonSizeEnum.LG}
                  className="absolute bottom-5 left-[34px] md:bottom-12 md:left-14 text-[12px] px-0 w-full md:text-[16px] leading-[140%] max-w-21 md:max-w-[206px] font-medium md:px-11"
                >
                  {isMobile
                    ? t('Common.button.play_now')
                    : t('Common.button.join_now')}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
