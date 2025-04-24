'use client';
import { QueryKeyEnum } from '@/enums';
import { useUserStore } from '@/hooks/stores';
import { refreshUserInfo } from '@/services/client';
import { useQuery } from '@tanstack/react-query';

export const useRefresh = () => {
  const userStore = useUserStore((state) => state);
  const refreshInterval = Number(
    process.env.NEXT_PUBLIC_REFRESH_INTERVAL || 3000,
  );

  // Set up React Query to handle the periodic refresh
  const { data: userData, refetch } = useQuery({
    queryKey: [
      QueryKeyEnum.UserData,
      QueryKeyEnum.RefreshUserInfo,
      userStore.user?.id,
    ],
    queryFn: refreshUserInfo,
    enabled: userStore.isLoggedIn, // Only run when logged in
    refetchInterval: refreshInterval, // Automatic refetching
    refetchIntervalInBackground: true, // Refetch even when tab is in background
    refetchOnWindowFocus: true, // Refetch when window regains focus
    staleTime: refreshInterval * 0.9, // Consider data stale just before next refresh
  });

  return { userData, refetchUser: refetch, isLoggedIn: userStore.isLoggedIn };
};
