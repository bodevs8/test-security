'use client';
import { REFRESH_INTERVAL } from '@/constant/deposit';
import { QueryKeyEnum } from '@/enums';
import { useUserStore } from '@/hooks/stores';
import { getDepositTransactionInfo } from '@/services/client';
import { getStorage } from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';

export const useDepositTransaction = (refreshApi: string, key: string) => {
  const userStore = useUserStore((state) => state);

  return useQuery({
    queryKey: [QueryKeyEnum.DepositTransaction, refreshApi],
    queryFn: () => getDepositTransactionInfo(refreshApi),
    refetchInterval: REFRESH_INTERVAL, // Refetch every 5 seconds
    refetchIntervalInBackground: true,
    staleTime: 0, // Always consider data stale to ensure fresh data
    enabled: !!getStorage(key) && userStore.isLoggedIn,
  });
};
