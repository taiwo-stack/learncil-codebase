/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images configuration
  images: {
    unoptimized: true, // Disable Next.js image optimization
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // Allowed origins for development
  allowedDevOrigins: ['10.229.40.13'],

  // Ignore TypeScript and ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // React strict mode
  reactStrictMode: true,

  // Optional: future-proof Next.js features
  experimental: {
    appDir: true, // Ensure support for /app directory
  },

  // Do NOT use output: "export" if you need dynamic SSR pages
};

module.exports = nextConfig;
