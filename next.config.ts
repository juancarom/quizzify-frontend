import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    turbo: {
      resolveAlias: {
        '@': './app',
      },
    },
  },
};

export default nextConfig;
