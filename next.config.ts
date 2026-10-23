import type { NextConfig } from 'next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  // на exFAT macOS пишет рядом файлы ._*, и дисковый кеш Turbopack ломается
  experimental: { turbopackFileSystemCacheForDev: false, turbopackFileSystemCacheForBuild: false },
  turbopack: {
    rules: {
      '*.css': { loaders: ['@tailwindcss/turbopack'], as: '*.css' },
    },
  },
};

export default nextConfig;
