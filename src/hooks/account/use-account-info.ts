'use client';

import type {
  AccountProfileResponse,
  ReferralCardType,
  VipConditions,
  VipInfo,
  VipInfoResponse,
} from '@/types/account-info';
import {
  VIP_BONUS_BY_LEVEL,
  VIP_PRIVILEGES_BY_LEVEL,
} from '@/constant/vip-info';
import { CurrencyUnit, ModalIdEnum, PromotionPackageEnum } from '@/enums';
import { useUserStore } from '@/hooks/stores';
import {
  getAccountProfile,
  getReferralCode,
  getReferralFriends,
  getVipInfo,
} from '@/services/client';
import { formatNumberWithCommas } from '@/utils/format-currency';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';

export const useAccountInfo = () => {
  const [isPending, startTransition] = useTransition();
  const [referralCard, setReferralCard] = useState<ReferralCardType | null>(
    null,
  );
  const [vipConditions, setVipConditions] = useState<VipConditions | null>(
    null,
  );
  const [vipInfo, setVipInfo] = useState<VipInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const user = useUserStore((state) => state.user);

  const DEFAULT_CURRENCY_UNIT = CurrencyUnit.DEFAULT_CURRENCY_VND;

  const userInfoFormatted = useMemo(() => {
    return {
      username: user?.username ?? '',
      balance: formatNumberWithCommas(
        user?.balance ?? 0,
        DEFAULT_CURRENCY_UNIT,
      ),
      package_id: user?.package_id ?? '',
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getReferralLink = useCallback((referralCode: string) => {
    return `${window.location.origin}?openModal=${ModalIdEnum.Register}&ref=${referralCode}`;
  }, []);

  const isHiddenPrivilege = user?.package_id !== PromotionPackageEnum.Cashback;

  const formatReferralCard = useCallback(
    (
      referralCode: string | null,
      referralFriends: string[],
    ): ReferralCardType => {
      return {
        referralFriends: referralFriends.length,
        referralBonus: 0,
        referralLink: getReferralLink(referralCode ?? ''),
        referralCode: referralCode ?? '',
      };
    },
    [getReferralLink],
  );

  const formatVipConditions = useCallback(
    (
      vipInfoArray: VipInfoResponse[],
      accountProfile: AccountProfileResponse,
    ): VipConditions => {
      const currentLevel =
        vipInfoArray.find((item) => item.level === accountProfile.level) ??
        null;
      return {
        vipLevel: accountProfile.level,
        turnoverCurrentTotal: accountProfile.total_stake,
        depositCurrentTotal: accountProfile.total_deposit,
        turnoverRequiredTotal: currentLevel?.stake_up ?? 0,
        depositRequiredTotal: currentLevel?.deposit_up ?? 0,
        depositCurrentTotalFormatted: formatNumberWithCommas(
          accountProfile.total_deposit,
        ),
        turnoverCurrentTotalFormatted: formatNumberWithCommas(
          accountProfile.total_stake,
        ),
        depositExtendFormatted: formatNumberWithCommas(
          currentLevel?.deposit_extend ?? 0,
          DEFAULT_CURRENCY_UNIT,
        ),
        turnoverExtendFormatted: formatNumberWithCommas(
          currentLevel?.stake_extend ?? 0,
          DEFAULT_CURRENCY_UNIT,
        ),
        vipPrivileges: VIP_PRIVILEGES_BY_LEVEL[accountProfile.level] ?? [],
      };
    },
    [DEFAULT_CURRENCY_UNIT],
  );

  const formatVipInfo = useCallback(
    (
      vipInfoArray: VipInfoResponse[],
      accountProfile: AccountProfileResponse,
    ): VipInfo => {
      const nextLevel =
        vipInfoArray.find((item) => item.level === accountProfile.level + 1) ??
        null;
      return {
        vipLevel: accountProfile.level,
        nextVipLevel: nextLevel?.level ?? accountProfile.level + 1,
        vipDepositCurrentTotal: accountProfile.total_deposit,
        vipDepositRequiredTotal: nextLevel?.deposit_up ?? 0,
        vipTurnoverCurrentTotal: accountProfile.total_stake,
        vipTurnoverRequiredTotal: nextLevel?.stake_up ?? 0,
        vipDepositCurrentTotalFormatted: formatNumberWithCommas(
          accountProfile.total_deposit,
        ),
        vipDepositRequiredTotalFormatted: formatNumberWithCommas(
          nextLevel?.deposit_up ?? 0,
          DEFAULT_CURRENCY_UNIT,
        ),
        vipTurnoverCurrentTotalFormatted: formatNumberWithCommas(
          accountProfile.total_stake,
        ),
        vipTurnoverRequiredTotalFormatted: formatNumberWithCommas(
          nextLevel?.stake_up ?? 0,
          DEFAULT_CURRENCY_UNIT,
        ),
        vipBonus: formatNumberWithCommas(
          VIP_BONUS_BY_LEVEL[accountProfile.level]?.bonus ?? 0,
          DEFAULT_CURRENCY_UNIT,
        ),
        vipLuckyMoney: formatNumberWithCommas(
          VIP_BONUS_BY_LEVEL[accountProfile.level]?.luckyMoney ?? 0,
          DEFAULT_CURRENCY_UNIT,
        ),
      };
    },
    [DEFAULT_CURRENCY_UNIT],
  );

  useEffect(() => {
    const fetchData = async () => {
      startTransition(async () => {
        try {
          const [
            vipResponse,
            profileResponse,
            referralCodeResponse,
            referralFriendsResponse,
          ] = await Promise.all([
            getVipInfo(),
            getAccountProfile(),
            getReferralCode(),
            getReferralFriends(),
          ]);

          if (vipResponse.data && profileResponse.data) {
            setReferralCard(
              formatReferralCard(
                referralCodeResponse.data,
                referralFriendsResponse.data ?? [],
              ),
            );
            setVipConditions(
              formatVipConditions(vipResponse.data, profileResponse.data),
            );
            setVipInfo(formatVipInfo(vipResponse.data, profileResponse.data));
            setError(null);
          } else {
            setError('Failed to load account data');
          }
        } catch (error) {
          console.error('Error fetching account info:', error);
          setError('An error occurred while loading account information');
        }
      });
    };

    fetchData();
  }, [formatReferralCard, formatVipConditions, formatVipInfo]);

  return {
    vipInfo,
    vipConditions,
    isPending,
    referralCard,
    error,
    isHiddenPrivilege,
    userInfoFormatted,
  };
};
