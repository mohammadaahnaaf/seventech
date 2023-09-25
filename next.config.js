/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // hostname: ['seventech-images.s3.ap-southeast-1.amazonaws.com'],
    domains: ['seventech-images.s3.ap-southeast-1.amazonaws.com'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
