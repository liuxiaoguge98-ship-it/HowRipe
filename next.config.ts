import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fill the 384→640 gap for small fruit artwork on high-DPR phones.
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512],
  },
};

export default nextConfig;
