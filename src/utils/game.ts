import type { OptionType } from '@/types/app';
import type { TypeGameItem } from '@/types/game';
import { PROVIDER_ICON_IMAGE } from '@/constant/lobby';
import { GameProviderEnum, GameProviderNameEnum } from '@/enums';

export function providerImageMapping(provider?: string) {
  if (!provider) {
    return '';
  }
  const _provider = provider.toLowerCase();
  return (
    PROVIDER_ICON_IMAGE[_provider as keyof typeof PROVIDER_ICON_IMAGE] ?? {
      default: '',
      active: '',
    }
  );
}

export function providerIconMapping(provider?: string) {
  if (!provider) {
    return '';
  }
  const _provider = provider.toLowerCase();
  let iconName = '';
  switch (_provider) {
    case GameProviderEnum.Vingame:
      iconName = GameProviderEnum.TechPlay;
      break;
    case GameProviderEnum.InPlay:
      iconName = GameProviderEnum.IM;
      break;
    case GameProviderEnum.Mg:
      iconName = GameProviderEnum.Microgaming;
      break;
    case GameProviderEnum.JDB:
      iconName = GameProviderEnum.JDBGaming;
      break;
    case GameProviderEnum.Go:
      iconName = GameProviderEnum.Go88;
      break;
    case GameProviderEnum.AskMeBet:
    case GameProviderEnum.AskMeLotto:
      iconName = GameProviderEnum.AskMeBet;
      break;
    default:
      iconName = _provider;
  }
  return iconName;
}

export function providerNameMapping(provider?: string): string | undefined {
  if (!provider) {
    return '';
  }
  const _provider = provider.toLowerCase();
  const mapper = {
    pgsoft: GameProviderNameEnum.PGSoft,
    vingame: GameProviderNameEnum.TechPlay,
    in_play: GameProviderNameEnum.IM,
    jdb: GameProviderNameEnum.JDB,
    netent: GameProviderNameEnum.Netent,
    askmelotto: GameProviderNameEnum.AskMeLotto,
    askmebet: GameProviderNameEnum.AskMeBet,
    'go-1': GameProviderNameEnum.Go88,
    go: GameProviderNameEnum.Go88,
    evo: GameProviderNameEnum.Evolution,
    '789game': GameProviderNameEnum.Game789,
    sungame: GameProviderNameEnum.Sungame,
    redtiger: GameProviderNameEnum.RedTiger,
    qtech: GameProviderNameEnum.QTech,
    microgaming: GameProviderNameEnum.Microgaming,
    pragmatic: GameProviderNameEnum.Pragmatic,
  };
  return mapper[_provider as keyof typeof mapper] ?? provider;
}

export const getFavoriteProvider = (games: TypeGameItem[]) => {
  const providers: OptionType[] = [];
  games.forEach((game) => {
    if (!providers.some((item) => item.value === game.partner_provider)) {
      providers.push({
        label: game.partner_txt || '',
        value: game.partner_provider || '',
      });
    }
  });
  return providers;
};
