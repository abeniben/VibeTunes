/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  // Remove the experimental.fontLoaders block completely
  // Font loading is now handled automatically by Next.js
}

module.exports = nextConfig