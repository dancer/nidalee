import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: 'https://nidal.ee', lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: 'https://nidal.ee/reviews', lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://nidal.ee/privacy', lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://nidal.ee/tos', lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
