import type { NextConfig } from "next";

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/,
// so every asset needs that repo-name prefix. GITHUB_ACTIONS/GITHUB_REPOSITORY
// are only set while building in CI, so a local `npm run dev`/`build` still
// serves from the root as normal.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = isGithubActions && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
