// next.config.js
/** @type {import('next').NextConfig} */
import defineConfig from 'next';

export default defineConfig({});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeFonts: true
  },
  images: {
    domains: ['tripkolic-beta.s3.amazonaws.com', 'tripkolic-beta.s3.eu-central-1.amazonaws.com'],
  },
}

module.exports = nextConfig