/** @type {import('next').NextConfig} */

// Optional sub-folder hosting, e.g. NEXT_PUBLIC_BASE_PATH=/aion-ux
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,

  // Day 14 ships a web component that needs transpiling.
  transpilePackages: ['@google/model-viewer'],

  // Static site, as in the Digital Learning project (UX-STANDARD 2.2).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
