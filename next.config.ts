import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [{ hostname: 'image.tmdb.org' }],
  },
};

export default nextConfig;
