import { GUIDELINE_URL } from '@/constant/app';
import { GUIDELINE_LINKS } from '@/constant/guidelines/guideline';
import {
  AccountLinkEnum,
  CasinoLinkEnum,
  DepositLinkEnum,
  IframeLinkEnum,
  RouterPathEnum,
  WithdrawLinkEnum,
} from '@/enums';
import { getBaseUrl } from '@/utils/helpers';
import { removeKeys } from '@/utils/object';
import { NextResponse } from 'next/server';

const fullGenreralPaths: Record<string, string> = {
  ...RouterPathEnum,
  ...AccountLinkEnum,
  ...DepositLinkEnum,
  ...WithdrawLinkEnum,
  ...IframeLinkEnum,
  ...CasinoLinkEnum,
};
const staticPathsExternalPrefix = [
  GUIDELINE_LINKS.HELP_CENTER,
  GUIDELINE_LINKS.ABOUT_US,
  GUIDELINE_LINKS.TERMS_AND_CONDITIONS,
  GUIDELINE_LINKS.PRIVACY_POLICY,
  GUIDELINE_LINKS.RESPONSIBLE_GAMING,
  GUIDELINE_LINKS.PROMOTION_TERM,
];
Object.values(GUIDELINE_LINKS).forEach((path, index) => {
  if (!staticPathsExternalPrefix.includes(path)) {
    fullGenreralPaths[`guideline_${index}`] = `/${GUIDELINE_URL}/${path}`;
  } else {
    fullGenreralPaths[`guideline_${index}`] = `/${path}`;
  }
});

const generalRoute = removeKeys(fullGenreralPaths, [
  'News',
  'NotFound',
  'Promotions',
  'MainTain',
  'SportSaba',
  'SportK',
  'SportIM',
  'SportBTI',
  'VirtualSport',
  'ESport',
  'COCKFIGHT_WS168',
  'COCKFIGHT_GA28',
  'OSPORT',
  'IMSport',
  'ESport',
  'VirtualSport',
  'LotteryResult',
  'NoHu',
  'MeoHay',
  'DepositGuide',
  'WithdrawGuide',
  'P2PGuide',
  'Odds',
  'ReferAFriend',
  'LiveChat',
  'Affiliate',
  'Event',
  'Term',
  'Policy',
  'PromotionTerm',
  'SportBettingGuide',
  'CasinoBettingGuide',
  'LotteryGuide',
  'EGameGuide',
  'PromotionGuide',
  'Faq',
  'Help',
  'ResetPassword',
  'MeoHay',
  'DepositGuide',
  'WithdrawGuide',
  'Line',
  'LotteryLode',
  'LiveCasino',
  'InGame',
  'LobbyGame',
  'Turbo',
  'Prefix',
  'NumberGame',
]);

const baseUrl = getBaseUrl().replace(/\/$/, '');

function generateSitemap() {
  const urls = Object.values(generalRoute)
    .map((path) => {
      const loc = path === '/' ? baseUrl : `${baseUrl}${path}`;
      return `<url><loc>${loc}</loc></url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd 
        http://www.google.com/schemas/sitemap-image/1.1 
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
        ${urls}
      </urlset>`;
}

export async function GET() {
  const sitemap = generateSitemap();
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
