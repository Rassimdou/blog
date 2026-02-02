/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/blog",
  assetPrefix: "/blog",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
