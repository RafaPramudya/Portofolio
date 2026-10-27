import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  allowedDevOrigins: ["completing-interpreted-framing-cardiac.trycloudflare.com"],
};

export default nextConfig;
