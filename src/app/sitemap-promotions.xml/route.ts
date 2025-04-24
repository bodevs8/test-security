import { PromotionSlugEnum, RouterPathEnum } from '@/enums';
import { getBaseUrl } from '@/utils/helpers';
import { getKeys } from '@/utils/object';
import { NextResponse } from 'next/server';

const baseUrl = getBaseUrl().replace(/\/$/, '');

const generalRoute = getKeys(RouterPathEnum, ['Promotions']);
const promotionPaths = [
  ...Object.values(generalRoute),
  ...Object.values(PromotionSlugEnum),
];

const excludePaths = [
  PromotionSlugEnum.Vip30Bonus,
  PromotionSlugEnum.Vip50Bonus,
];

const siteMapPaths: Record<string, string> = {};
promotionPaths.forEach((path, index) => {
  if (!excludePaths.includes(path as PromotionSlugEnum)) {
    siteMapPaths[`promotion_${index}`] =
      path === RouterPathEnum.Promotions
        ? path
        : `${RouterPathEnum.Promotions}/${path}`;
  }
});

function generateSitemap() {
  const urls = Object.values(siteMapPaths)
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
