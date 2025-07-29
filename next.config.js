// TypeScript-specific syntax removed for JS compatibility

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // config options here
};

module.exports = nextConfig;
