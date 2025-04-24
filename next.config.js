import CompressionPlugin from 'compression-webpack-plugin';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const API_BASE_URL = process.env.API_BASE_URL;
const isProduction = process.env.NODE_ENV === 'production';
const LOTTLE_API_URL = process.env.LOTTLE_API_URL;
const isEnableRequestLog = process.env.IS_ENABLE_REQUEST_LOG === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    inlineCss: isProduction,
  },
  logging: {
    fetches: {
      fullUrl: isEnableRequestLog,
      incomingRequests: isEnableRequestLog,
    },
  },
  async rewrites() {
    return [
      {
        source: '/api-main/:path*',
        destination: `${API_BASE_URL}/api-main/:path*`,
      },
      {
        source: '/api-promotion/:path*',
        destination: `${API_BASE_URL}/api-promotion/:path*`,
      },
      {
        source: '/api-lottery/v1/:path*',
        destination: `${LOTTLE_API_URL}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: process.env.NEXT_PUBLIC_IS_UN_OPTIMIZE_IMAGES === 'true',
  },
  webpack: (config) => {
    config.plugins.push(
      new CompressionPlugin({
        algorithm: 'brotliCompress',
      }),
    );
    config.plugins.push(
      new CompressionPlugin({
        algorithm: 'gzip',
      }),
    );
    return config;
  },
};

export default withNextIntl(nextConfig);
