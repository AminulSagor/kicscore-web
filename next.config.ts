import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow specific hosts to access dev-only next resources (fonts, etc.)
  // Add IPs like '192.168.0.109' when developing across local network devices.
  allowedDevOrigins: ['*', '**'],
  images: {
    unoptimized: true,
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
};

export default nextConfig;
