import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/assets/social-media-logo/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'afrs-web.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        pathname: '/api/mcp/asset/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.appliedforensicresearchsciences.in',
        pathname: '/static/media/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  async redirects() {
    return [
      { source: '/about-afrs', destination: '/about', permanent: true },
      { source: '/forensic-services', destination: '/services', permanent: true },
      { source: '/forensic-services/:path*', destination: '/services/:path*', permanent: true },
      { source: '/student-corner', destination: '/student-hub', permanent: true },
      { source: '/student-corner/ugc-net-forensic-science', destination: '/student-hub/ugc-net', permanent: true },
      { source: '/student-corner/:path*', destination: '/student-hub/:path*', permanent: true },
      { source: '/programmes', destination: '/courses', permanent: true },
      { source: '/programmes/forensic-science-courses', destination: '/courses/education', permanent: true },
      { source: '/programmes/forensic-science-internship', destination: '/courses/training', permanent: true },
      { source: '/programmes/research-projects', destination: '/courses/training/research-articles', permanent: true },
      { source: '/programmes/:path*', destination: '/courses/:path*', permanent: true },
      { source: '/internship', destination: '/courses/training', permanent: true },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
