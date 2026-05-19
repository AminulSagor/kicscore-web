import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2ml1l8vdyfdxz.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "www.sportsnet.ca",
      },
    ],
  },
};

export default nextConfig;
