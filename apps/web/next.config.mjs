// const withContentlayer = require("next-contentlayer2").withContentlayer;
import {withContentlayer} from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@workspace/ui'],
  reactStrictMode: true
}

export default withContentlayer(nextConfig)
