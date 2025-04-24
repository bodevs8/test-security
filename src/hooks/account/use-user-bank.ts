'use client';
import type { UserBankType } from '@/types/userbank';
import { QueryKeyEnum } from '@/enums';
import { getUserBank } from '@/services/client';
import { useQuery } from '@tanstack/react-query';

export const useUserBanks = () => {
  const { data: userBanks = [] as UserBankType[], refetch } = useQuery<
    UserBankType[]
  >({
    queryKey: [QueryKeyEnum.UserBank],
    queryFn: getUserBank,
    retry: 2,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  return { userBanks, refetch };
};
