import type { GuidelineContent } from '@/types/guideline';
import { GUIDELINE_MENUS } from '@/constant/app';
import FAQ_GUIDELINES from '@/constant/guidelines/faq';
import { GUIDELINE_LINKS } from '@/constant/guidelines/guideline';
import LEGAL_GUIDELINES from '@/constant/guidelines/legal';
import MEO_HAY_GUIDELINES from '@/constant/guidelines/meo-hay';
import {
  useActivePromotion as activePromotion,
  useAddBank as addBank,
  useBinance as binance,
  useCoin12 as coin12,
  useDeposit as deposit,
  useHuobi as huobi,
  useP2P as p2p,
  useRegister as register,
  useRemitano as remitano,
  useWithdraw as withdraw,
} from '@/hooks/guideline';

const guideLineTutorial = (isMobile?: boolean) => {
  return {
    [GUIDELINE_LINKS.DEPOSIT_GUIDE]: deposit(isMobile),
    [GUIDELINE_LINKS.WITHDRAWAL_GUIDE]: withdraw(isMobile),
    [GUIDELINE_LINKS.BINANCE_GUIDE]: binance(isMobile),
    [GUIDELINE_LINKS.COIN12_GUIDE]: coin12(isMobile),
    [GUIDELINE_LINKS.REGISTER_GUIDE]: register(isMobile),
    [GUIDELINE_LINKS.PROMOTION_USAGE]: activePromotion(isMobile),
    [GUIDELINE_LINKS.ADD_BANK_GUIDE]: addBank(isMobile),
    [GUIDELINE_LINKS.P2P_GUIDE]: p2p(isMobile),
    [GUIDELINE_LINKS.REMITANO_GUIDE]: remitano(isMobile),
    [GUIDELINE_LINKS.HUOBI_GUIDE]: huobi(isMobile),
  };
};

export const guideline = (isMobile?: boolean) => {
  return {
    ...LEGAL_GUIDELINES,
    ...FAQ_GUIDELINES,
    ...guideLineTutorial(isMobile),
    ...MEO_HAY_GUIDELINES,
  };
};

// Get guideline content by slug
export const getGuidelineBySlug = (
  slug?: string,
  isMobile?: boolean,
): GuidelineContent | null => {
  return (guideline(isMobile) as Record<string, any>)[slug || ''] || null;
};

// Get all available guideline paths
export const getAllGuidelinePaths = (): string[][] => {
  const paths: string[][] = [];

  for (const category of GUIDELINE_MENUS) {
    for (const item of category.items) {
      if (['support-legal', 'faq'].includes(category.id)) {
        // Top-level paths
        paths.push([item.id]);
      } else {
        // Category/slug paths
        paths.push([category.id, item.id]);
      }
    }
  }

  return paths;
};

export const replaceBrandName = (content: string): string => {
  if (!content) return '';
  return content.replace(
    /BRAND_NAME/g,
    process.env.NEXT_PUBLIC_BRAND_NAME || 'BRAND_NAME',
  );
};

export const isGuidelineSlug = (slug: string): boolean => {
  return GUIDELINE_MENUS.some((menu) =>
    menu.items.some((item) => item.id === slug),
  );
};
