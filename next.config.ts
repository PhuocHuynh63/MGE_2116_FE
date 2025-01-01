import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Bỏ qua lỗi TypeScript
  },
  eslint: {
    ignoreDuringBuilds: true, // Bỏ qua lỗi ESLint khi build
  },
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
