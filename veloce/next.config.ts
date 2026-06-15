import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/car-animation" : "",
  assetPrefix: isGitHubPages ? "/car-animation/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
