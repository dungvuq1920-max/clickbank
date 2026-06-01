import { notFound } from 'next/navigation';
import { SiteHome } from '@/components/site-home';
import { listPosts } from '@/lib/db';
import { getSiteBySlug } from '@/lib/sites';

export default async function SiteHomePage({ params }: { params: Promise<{ siteSlug: string }> }) {
  const { siteSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) notFound();
  const posts = await listPosts({ siteId: site.id, status: 'published' });
  return <SiteHome site={site} posts={posts} />;
}
