import { useUserStore } from '@/hooks/stores';
import { getUserInfo } from '@/services/client';
import { useQuery } from '@tanstack/react-query';

export const useUserPromotion = () => {
  const { isLoggedIn } = useUserStore((state) => state);

  return useQuery({
    queryKey: ['userPromotion'],
    enabled: isLoggedIn,
    queryFn: () => getUserInfo(),
  });
};
