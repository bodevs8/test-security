import { useUserStore } from '@/hooks/stores';
import { getTodayCommission, getTotalCommission } from '@/services/client';
import {
  getAccountProfile,
  getBetToday,
} from '@/services/client/user-services';
import { useQuery } from '@tanstack/react-query';

export const useCashbackInfo = () => {
  const { isLoggedIn } = useUserStore((state) => state);

  return useQuery({
    queryKey: ['cashbackInfo'],
    enabled: isLoggedIn,
    queryFn: async () => {
      const [
        todayBetData,
        todayCommissionData,
        totalCommissionData,
        vipAccountProfile,
      ] = await Promise.all([
        getBetToday(),
        getTodayCommission(),
        getTotalCommission(),
        getAccountProfile(),
      ]);

      return {
        todayBet: todayBetData,
        todayCommission: todayCommissionData,
        totalCommission: totalCommissionData,
        currentVipLevel: vipAccountProfile.data?.level,
      };
    },
  });
};
