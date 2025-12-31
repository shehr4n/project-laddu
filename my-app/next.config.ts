import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/project-laddu",
  assetPrefix: "/project-laddu/",
};

export default nextConfig;
