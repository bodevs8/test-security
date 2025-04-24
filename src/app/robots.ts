import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utils/helpers';

export default function robots(): MetadataRoute.Robots {
  if (process.env.IS_DISABLED_ROBOTS === 'true') {
    return {
      rules: {
        disallow: '*',
        userAgent: '*',
      },
    };
  }

  return {
    rules: {
      disallow: '/account/*',
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${getBaseUrl().replace(/\/$/, '')}/sitemap.xml`,
  };
}
