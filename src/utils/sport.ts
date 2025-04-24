import type { ModalStoreWithActions } from '@/stores/modal';
import type { UserData } from '@/types/auth';
import type { SportItem } from '@/types/sport';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { IframeLinkEnum, ModalIdEnum, PromotionPackageEnum } from '@/enums';

export const isDenyPlayPragmatic = (
  user: UserData | null,
  sport: SportItem,
) => {
  const href = sport.href ?? '#';
  return (
    user &&
    user.package_id === PromotionPackageEnum.Welcome &&
    href === IframeLinkEnum.PRAGMATIC_VIRTUAL
  );
};

export const handleClickBannerSport = (
  user: UserData | null,
  sport: SportItem,
  modalStore: ModalStoreWithActions,
  router: AppRouterInstance | null,
  isMobile: boolean,
  openIframeGame?: (href: string) => void,
) => {
  if (isDenyPlayPragmatic(user, sport)) {
    modalStore.openModal(ModalIdEnum.DenyGame);
  } else {
    if (isMobile && openIframeGame) {
      openIframeGame(sport.href || '#');
    } else {
      router?.push(sport.href || '#');
    }
  }
};
