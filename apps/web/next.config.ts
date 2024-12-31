import type { NextConfig } from 'next'

import { withContentlayer } from 'next-contentlayer2'

// import { withContentlayer } from 'next-contentlayer'

// /** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  transpilePackages: ['@workspace/ui'],
  reactStrictMode: true
}

export default withContentlayer(nextConfig)
