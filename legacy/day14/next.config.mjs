/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `next build` emits /out, deployable to Netlify/Vercel with zero config.
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  // model-viewer ships modern ESM and must be bundled locally (no CDN at runtime).
  transpilePackages: ['@google/model-viewer'],
};

export default nextConfig;
