import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/'
    },
    sitemap: 'https://sangwon1205-blog.vercel.app/sitemap.xml',
    host: 'https://sangwon1205-blog.vercel.app'
  }
}
