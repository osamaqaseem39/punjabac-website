// TypeScript-specific syntax removed for JS compatibility

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  // config options here
};

module.exports = nextConfig;
