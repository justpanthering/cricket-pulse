import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "scores.iplt20.com",
      "ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
