import { LIMIT_JACKPOT_GAMES } from '@/constant/game';
import { GameTypeEnum, QueryKeyEnum } from '@/enums';
import { useUserStore } from '@/hooks/stores';
import { getGames } from '@/services/client';
import { useQuery } from '@tanstack/react-query';

export const useUseJackpotGames = () => {
  const { isLoggedIn } = useUserStore((state) => state);

  return useQuery({
    queryKey: [QueryKeyEnum.JackpotGames],
    enabled: isLoggedIn,
    queryFn: () =>
      getGames({
        limit: LIMIT_JACKPOT_GAMES,
        type: GameTypeEnum.NoHu,
      }),
  });
};
