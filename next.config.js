/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image handling
  images: {
    unoptimized: true, // OK for Firebase/Vercel static images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Ignore build blockers (use carefully in production)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Dev-only setting (safe to keep)
  allowedDevOrigins: ['10.229.40.13'],

 
};

module.exports = nextConfig;
