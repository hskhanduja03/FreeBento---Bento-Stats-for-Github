import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      domains: ['assets.aceternity.com', 'imgtransformationstack-s3sampleoriginalimagebucket-fduwfkhbj6hp.s3.us-east-1.amazonaws.com'], // Add the hostname here
    },
};

export default nextConfig;
