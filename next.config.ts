import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /* @ts-expect-error: React Compiler optimization */
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;