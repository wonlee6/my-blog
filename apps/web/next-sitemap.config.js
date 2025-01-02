import { readFileSync } from 'fs'
import { join } from 'path'

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://sangwon1205-blog.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  additionalPaths: async () => {
    // eslint-disable-next-line no-undef
    const contentLayerPath = join(process.cwd(), '.contentlayer/generated/Post/_index.json')
    const posts = JSON.parse(readFileSync(contentLayerPath, 'utf-8'))

    return posts.map((post) => ({
      loc: `/post/${post._raw.flattenedPath}`,
      lastmod: post.createdAt,
      changefreq: 'daily',
      priority: 0.7
    }))
  }
}

export default config