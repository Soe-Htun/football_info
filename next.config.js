/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    API_TOKEN_NEWS: process.env.API_TOKEN_NEWS,
    API_TOKEN: process.env.API_TOKEN
  }
}

module.exports = nextConfig
