import { getBaseUrl } from '@/utils/helpers';
import { NextResponse } from 'next/server';

const baseUrl = getBaseUrl().replace(/\/$/, '');

export async function GET() {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${baseUrl}/sitemap-general.xml</loc>
      </sitemap>
      <sitemap>
        <loc>${baseUrl}/sitemap-news.xml</loc>
      </sitemap>
      <sitemap>
        <loc>${baseUrl}/sitemap-promotions.xml</loc>
      </sitemap>
    </sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
