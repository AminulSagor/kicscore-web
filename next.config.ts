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
      {
        protocol: "https",
        hostname: "media.api-sports.io",
      },
      {
        protocol: "https",
        hostname: "kicscore-storage.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
