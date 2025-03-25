/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  eslint: {
    // 在生產環境構建時忽略 ESLint 錯誤
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 在生產環境構建時忽略 TypeScript 錯誤
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
