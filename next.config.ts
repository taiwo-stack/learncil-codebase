/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      root: __dirname,
    },
  },
  allowedDevOrigins: [
    'http://10.141.164.13:3000',
    '192.168.1.120'
  ],
}

module.exports = nextConfig