import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  basePath: "",
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
