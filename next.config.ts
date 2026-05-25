import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import { dataset, projectId } from './sanity/env';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://backend.huerray.de/api/v1';
const apiProxyTarget = process.env.API_PROXY_TARGET ?? 'https://backend.huerray.de/api/v1';

// When the public API base URL is a same-origin path (e.g. `/api/v1`), the
// app expects the Next.js server to proxy it to the real backend. The
// hostname for `next/image` is then derived from the proxy target so remote
// image patterns continue to match.
const isRelativeApi = apiBaseUrl.startsWith('/');
const apiHostname = new URL(isRelativeApi ? apiProxyTarget : apiBaseUrl).hostname;

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
  async rewrites() {
    if (!isRelativeApi) return [];
    return [
      {
        source: `${apiBaseUrl}/:path*`,
        destination: `${apiProxyTarget}/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
