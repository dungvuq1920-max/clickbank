import type { MetadataRoute } from 'next';
import { getRuntimeSite } from '@/lib/sites';

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getRuntimeSite();
  const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : 'http://localhost:3010';
  const siteUrl = `${baseUrl}/sites/${site.slug}`;
  const staticPaths = ['', '/about', '/blog', '/review', '/best-products', '/quiz', '/contact', '/privacy-policy', '/terms', '/affiliate-disclosure'];

  return [
    ...staticPaths.map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : 0.7 })),
    ...site.catalogs.map((catalog) => ({ url: `${siteUrl}/category/${catalog.slug}`, changeFrequency: 'weekly' as const, priority: 0.8 })),
  ];
}
