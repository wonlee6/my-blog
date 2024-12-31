import { withContentlayer } from 'next-contentlayer2'
// import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@workspace/ui'],
  reactStrictMode: true
}

export default withContentlayer(nextConfig)
