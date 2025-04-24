import type { NewsItemType } from '@/types/news';
import { NewsCategoryEnum, RouterPathEnum } from '@/enums';
import { getPosts } from '@/services';
import { getBaseUrl } from '@/utils/helpers';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const newsRoute = RouterPathEnum.News;
const eventRoute = RouterPathEnum.Event;
const priority = 0.8;
const typeDate = 'daily';
const yesterDay = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
const baseUrl = getBaseUrl().replace(/\/$/, '');

async function getNews() {
  const limit = 8;
  let page = 1;
  let aliasList: string[] = [];

  while (true) {
    const response = await getPosts({
      limit,
      page,
      category: NewsCategoryEnum.News,
    });

    if (!response?.posts || response.posts.length === 0) {
      break;
    }

    const alias = response.posts.map((item: NewsItemType) => item.alias);
    aliasList = alias.concat(aliasList);
    page++;
  }

  return aliasList;
}

async function generateSitemap(newsRoute: string, eventRoute: string) {
  const aliasList = await getNews();
  const totalNews = [newsRoute, eventRoute, ...aliasList];
  const postUrls = totalNews
    .map((post, index) => {
      const postUrl =
        index === 0 || index === 1
          ? `${baseUrl}${post}`.replace(/\/$/, '')
          : `${baseUrl}${newsRoute}/${post}`;

      return `
      <url>
        <changefreq>${typeDate}</changefreq>
        <priority>${priority}</priority>
        <lastmodrealtime>yes</lastmodrealtime>
        <loc>${postUrl}</loc>
        <lastmod>${yesterDay}</lastmod>
      </url>`;
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
      ${postUrls}
    </urlset>`;
}

export async function GET() {
  const sitemap = await generateSitemap(newsRoute, eventRoute);

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
