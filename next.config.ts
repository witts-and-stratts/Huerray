import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import { dataset, projectId } from './sanity/env';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://backend.huerray.de/api/v1';
const apiHostname = new URL(apiBaseUrl).hostname;

const nextConfig: NextConfig = {
  output: 'standalone',
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: apiHostname,
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: `/images/${projectId}/${dataset}/**`,
      },
    ],
  },
  experimental: {
    // turbopackFileSystemCacheForDev: true,
  },
  allowedDevOrigins: ['dev.huerray.de', 'stellar.huerray.de', 'huerray.de'],
  turbopack: {
    root: process.cwd(),
  },
};

export default withNextIntl(nextConfig);
