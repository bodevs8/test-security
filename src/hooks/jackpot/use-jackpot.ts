'use client';
import type { JackpotGameDefinition } from '@/types/game';
import { JACKPOT_GAME } from '@/constant/game';
import { useSocketContext } from '@/hooks/contexts';
import { useMemo } from 'react';

export const useJackpot = () => {
  const { jackpotGb, jackpots } = useSocketContext();

  const jackpotValidGames = useMemo(() => {
    if (
      Object.keys(jackpotGb).length === 0 ||
      Object.keys(jackpots).length === 0
    ) {
      return [];
    }
    const goGameValid: JackpotGameDefinition[] = [];
    for (const el of Object.values(jackpotGb)) {
      for (const [key, value] of Object.entries(el)) {
        if (value.currentValue >= value.configValue) {
          const game = JACKPOT_GAME.find(
            (item) => item.partner_game_id === key,
          );
          if (game) {
            goGameValid.push({
              ...game,
              is_valid: true,
              jackpot_value: value.currentValue,
              is_jackpot_event: true,
            });
          }
        }
      }
    }

    const casinoGameValid = JACKPOT_GAME.filter(
      (item) =>
        item.is_live_stream &&
        !goGameValid.some((game) => game.key === item.key),
    )
      .map((item) => {
        return {
          ...item,
          jackpot_value: jackpots[item.partner_game_id as string] || 0,
        };
      })
      .sort((a, b) => b.jackpot_value - a.jackpot_value);

    const anotherGameValid = JACKPOT_GAME.filter(
      (item) =>
        item.is_jackpot_event &&
        (jackpots[item.partner_game_id as string] || 0) >= item.jackpot_trigger,
    )
      .map((item) => ({
        ...item,
        jackpot_value: jackpots[item.partner_game_id as string] || 0,
      }))
      .sort((a, b) => b.jackpot_value - a.jackpot_value);

    const allValidGames = [
      ...goGameValid.sort((a, b) => b.jackpot_value - a.jackpot_value),
      ...casinoGameValid,
      ...anotherGameValid,
    ];

    return allValidGames;
  }, [jackpotGb, jackpots]);

  const totalJackpot = useMemo(() => {
    if (!jackpots) return 0;
    return Object.values(jackpots).reduce((acc, item) => acc + (item || 0), 0);
  }, [jackpots]);

  return {
    jackpotValidGames,
    totalJackpot,
  };
};
