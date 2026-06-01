import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'd2ml1l8vdyfdxz.cloudfront.net',
      'www.sportsnet.ca',
      'media.api-sports.io',
      'kicscore-storage.s3.ap-south-1.amazonaws.com',
      '*'
    ],
  },
};

export default nextConfig;
