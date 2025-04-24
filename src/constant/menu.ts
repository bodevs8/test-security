import type { AccountMenuItem } from '@/types/app';
import { AccountLinkEnum, CategoryTypeEnum } from '@/enums';

import BankActiveIcon from '@/public/images/account/menu/bank-active.webp';
import BankIcon from '@/public/images/account/menu/bank.webp';
import BetActiveIcon from '@/public/images/account/menu/bet-history-active.webp';
import BetIcon from '@/public/images/account/menu/bet-history.webp';
import DepositActiveIcon from '@/public/images/account/menu/deposit-active.webp';
import DepositIcon from '@/public/images/account/menu/deposit.webp';
import OverviewActiveIcon from '@/public/images/account/menu/overview-active.webp';
import OverviewIcon from '@/public/images/account/menu/overview.webp';
import P2PActiveIcon from '@/public/images/account/menu/p2p-active.webp';

import P2PIcon from '@/public/images/account/menu/p2p.webp';
import PasswordActiveIcon from '@/public/images/account/menu/password-active.webp';
import PasswordIcon from '@/public/images/account/menu/password.webp';
import ProfileActiveIcon from '@/public/images/account/menu/profile-active.webp';
import ProfileIcon from '@/public/images/account/menu/profile.webp';
import PromotionActiveIcon from '@/public/images/account/menu/promotion-active.webp';
import PromotionIcon from '@/public/images/account/menu/promotion.webp';
import TransactionActiveIcon from '@/public/images/account/menu/transaction-history-active.webp';
import TransactionIcon from '@/public/images/account/menu/transaction-history.webp';
import WithdrawActiveIcon from '@/public/images/account/menu/withdraw-active.webp';

import WithdrawIcon from '@/public/images/account/menu/withdraw.webp';

export const ACCOUNT_SIDE_MENU: AccountMenuItem[] = [
  {
    id: AccountLinkEnum.Overview,
    label: 'Pages.Account.menu.overview',
    url: AccountLinkEnum.Overview,
    icon: OverviewIcon,
    iconActive: OverviewActiveIcon,
  },
  {
    id: AccountLinkEnum.P2P,
    label: 'Pages.Account.menu.p2p',
    url: AccountLinkEnum.P2P,
    icon: P2PIcon,
    iconActive: P2PActiveIcon,
    tag: CategoryTypeEnum.New,
  },
  {
    id: AccountLinkEnum.Deposit,
    label: 'Pages.Account.menu.deposit',
    url: AccountLinkEnum.Deposit,
    icon: DepositIcon,
    iconActive: DepositActiveIcon,
    tag: CategoryTypeEnum.Hot,
  },
  {
    id: AccountLinkEnum.Withdraw,
    label: 'Pages.Account.menu.withdraw',
    url: AccountLinkEnum.Withdraw,
    icon: WithdrawIcon,
    iconActive: WithdrawActiveIcon,
  },
  {
    id: AccountLinkEnum.TransactionHistory,
    label: 'Pages.Account.menu.transaction_history',
    url: AccountLinkEnum.TransactionHistory,
    icon: TransactionIcon,
    iconActive: TransactionActiveIcon,
  },
  {
    id: AccountLinkEnum.BetHistory,
    label: 'Pages.Account.menu.bet_history',
    url: AccountLinkEnum.BetHistory,
    icon: BetIcon,
    iconActive: BetActiveIcon,
  },
  {
    id: AccountLinkEnum.BankInfo,
    label: 'Pages.Account.menu.bank_info',
    url: AccountLinkEnum.BankInfo,
    icon: BankIcon,
    iconActive: BankActiveIcon,
  },
  {
    id: AccountLinkEnum.MyProfile,
    label: 'Pages.Account.menu.my_profile',
    url: AccountLinkEnum.MyProfile,
    icon: ProfileIcon,
    iconActive: ProfileActiveIcon,
  },
  {
    id: AccountLinkEnum.Password,
    label: 'Pages.Account.menu.password',
    url: AccountLinkEnum.Password,
    icon: PasswordIcon,
    iconActive: PasswordActiveIcon,
  },
  {
    id: AccountLinkEnum.PromotionApplied,
    label: 'Pages.Account.menu.promotion_applied',
    url: AccountLinkEnum.PromotionApplied,
    icon: PromotionIcon,
    iconActive: PromotionActiveIcon,
  },
];
