/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async rewrites() {
    return [{ source: '/favicon.ico', destination: '/icon.webp' }]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dc9xmxpvv/**',
      },
    ],
  },
}

export default nextConfig
