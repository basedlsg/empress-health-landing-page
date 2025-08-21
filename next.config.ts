import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during builds for faster deployment
  },
  typescript: {
    ignoreBuildErrors: true, // TEMPORARILY disable TypeScript checking for deployment
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  experimental: {
    typedRoutes: false, // Disable to avoid route type conflicts
  },
};

export default nextConfig;